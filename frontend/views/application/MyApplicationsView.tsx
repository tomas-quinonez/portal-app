import { Button } from "@hilla/react-components/Button.js";
import { ApplicationService, CustomUserService } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import Application from "Frontend/generated/com/example/application/entities/Application";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { useAuth } from "Frontend/auth";

export default function ApplicationView() {

    const [apps, setApps] = useState<Application[]>([]);

    const { state } = useAuth();

    useEffect(() => {
        CustomUserService.getAppsByUsername().then((apps: Application[]) => setApps(apps));
    }, []);

    return (
        <div className="p-m">
            <h1>Mis Aplicaciones</h1>
            <hr />
            {apps.length > 0 ?
                <HorizontalLayout theme="margin spacing padding filled">
                    {apps.map((app, idx) => {
                        return (<VerticalLayout style={{ backgroundColor: 'lightskyblue ', alignItems: 'center' }} theme="margin spacing padding" key={app.id}>
                            <header>
                                <h2>Aplicación {app.name}</h2>
                            </header>
                            <section aria-labelledby="personal-title">
                                <span><h2>Código: {app.code}</h2></span>
                            </section>
                            <a href="/">
                                <Button theme="primary large">Ingresar <Icon icon="vaadin:paperplane-o" /></Button>
                            </a>
                        </VerticalLayout>)
                    })}
                </HorizontalLayout>
                :
                <h2>Usted no tiene aplicaciones autorizadas</h2>
            }
        </div>
    );
}