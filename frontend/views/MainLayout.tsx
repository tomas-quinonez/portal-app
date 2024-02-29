import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import { Suspense, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AccordionPanel } from '@hilla/react-components/AccordionPanel.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Button } from '@hilla/react-components/Button.js';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from 'Frontend/PDFDocument';
import { useAuth } from 'Frontend/auth';


const navLinkClasses = ({ isActive }: any) => {
	return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

export default function MainLayout() {

	const { state } = useAuth();

	const currentTitle = useRouteMetadata()?.title ?? 'My App';
	useEffect(() => {
		document.title = currentTitle;
	}, [currentTitle]);


	return (
		<AppLayout primarySection="drawer">
			<div slot="drawer" className="flex flex-col justify-between h-full p-m">
				<header className="flex flex-col gap-m">
					<h1 className="text-l m-0">Portal de Aplicaciones</h1>
					<nav>
						<AccordionPanel summary="Aplicaciones" theme='filled, vaadin-accordion-panel[opened]'>
							<VerticalLayout>
								<NavLink className={navLinkClasses} to="/">
									Mis Aplicaciones
								</NavLink>
							</VerticalLayout>
						</AccordionPanel>
						{state.user?.authorities.includes('ROLE_ADMIN')
							?
							<AccordionPanel summary="Admin" theme='filled, vaadin-accordion-panel[opened]'>
								<VerticalLayout>
									<NavLink className={navLinkClasses} to="/abm/users">
										A/B/M Usuarios
									</NavLink>
									<NavLink className={navLinkClasses} to="/abm/applications">
										A/B/M Aplicaciones
									</NavLink>
									<NavLink className={navLinkClasses} to="/abm/organisations">
										A/B/M Organismos
									</NavLink>
									<AccordionPanel summary="Generación PDFs" theme='filled, vaadin-accordion-panel[opened]'>
										<VerticalLayout>
											<PDFDownloadLink
												document={<PDFDocument />}
												fileName={"usuarios_autorizados_" + new Date().getTime() + ".pdf"}>
												<Button className="px-4">
													Usuarios Autorizados
												</Button>
											</PDFDownloadLink>
										</VerticalLayout>
									</AccordionPanel>
								</VerticalLayout>
							</AccordionPanel>
							:
							<></>
						}
					</nav>
				</header>
			</div>
			<DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
			<h2 slot="navbar" className="text-l m-0">
				{currentTitle}
			</h2>

			<Suspense fallback={<Placeholder />}>
				<Outlet />
			</Suspense>
		</AppLayout>
	);
}
