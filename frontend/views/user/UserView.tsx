import { AutoCrud } from "@hilla/react-crud";
import { CustomUserService, CustomUserDtoCrudService, OrganisationService } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import { Notification } from '@hilla/react-components/Notification.js';
import CustomUserDtoModel from "Frontend/generated/com/example/application/entities/CustomUserDtoModel";
import CustomUser from "Frontend/generated/com/example/application/entities/CustomUser";
import { ComboBox } from "@hilla/react-components/ComboBox.js";
import { PasswordField } from "@hilla/react-components/PasswordField.js";
import NoAuthorizationView from "../NoAuthorizationView";
import { useAuth } from "Frontend/auth";

export default function UserView() {

    const [items, setItems] = useState<String[]>([]);

    const { state, login } = useAuth();

    useEffect(() => {
        OrganisationService.findAll().then((orgs) => setItems(orgs.map((org) => org.name ?? '')));
    }, []);

    return (
        <>
            {state.user?.authorities.includes('ROLE_ADMIN')
                ?
                <div className="p-m">
                    <h1>A/B/M de Usuarios</h1>
                    <h2>Listado de Usuarios</h2>
                    <AutoCrud
                        service={CustomUserDtoCrudService}
                        model={CustomUserDtoModel}
                        gridProps={{
                            noHeaderFilters: true,
                            visibleColumns: ['username', 'orgName', 'name', 'lastname', 'email', 'dni', 'address', 'phone', 'user_type', 'organisation', 'role'],
                            columnOptions: {
                                organisation: {
                                    renderer: ({ item }: { item: CustomUser }) => {
                                        return <span>{item.organisation?.name}</span>
                                    }
                                }
                            },
                        }}
                        formProps={{
                            visibleFields: ['username', 'password', 'name', 'lastname', 'email', 'dni', 'address', 'phone', 'user_type', 'orgName', 'role'],
                            fieldOptions: {
                                username: { label: 'Usuario' },
                                password: {
                                    label: 'Contraseña',
                                    renderer: ({ field }) => <PasswordField {...field} label="Password" />
                                },
                                name: { label: 'Nombre' },
                                lastname: { label: 'Apellido' },
                                email: { label: 'Email' },
                                dni: { label: 'DNI' },
                                address: { label: 'Dirección' },
                                phone: { label: 'Teléfono' },
                                user_type: { label: 'Tipo Usuario' },
                                role: { label: 'Rol' },
                                orgName: {
                                    renderer: ({ field }) => <ComboBox {...field} label="Organismo Perteneciente" items={items} />,
                                }
                            },
                            onSubmitError({ error }) {
                                Notification.show('Ocurrió un error al realizar el alta.', { theme: 'error' });
                            },
                        }} />
                </div>
                :
                <NoAuthorizationView />
            }
        </>
    );
}