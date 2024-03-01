import { AutoCrud } from "@hilla/react-crud";
import { Notification } from '@hilla/react-components/Notification.js';
import { OrganisationService } from "Frontend/generated/endpoints";
import OrganisationModel from "Frontend/generated/com/example/application/entities/OrganisationModel";
import NoAuthorizationView from "../NoAuthorizationView";
import { useAuth } from "Frontend/auth";

export default function OrganisationView() {

    const { state } = useAuth();

    return (
        <>
            {state.user?.authorities.includes('ROLE_ADMIN')
                ?
                <div className="p-m">
                    <h1>A/B/M de Organismos</h1>
                    <AutoCrud
                        service={OrganisationService}
                        model={OrganisationModel}
                        gridProps={{
                            visibleColumns: ['code', 'name', 'address', 'phone', 'email'],
                            columnOptions: {
                                code: { header: 'Código' },
                                name: { header: 'Nombre' },
                                address: { header: 'Domicilio' },
                                phone: { header: 'Teléfono' },
                                email: { header: 'Email' },
                            },
                        }}
                        formProps={{
                            visibleFields: ['code', 'name', 'address', 'phone', 'email'],
                            fieldOptions: {
                                code: {
                                    label: 'Código', validators: [
                                        {
                                            message: 'Debe ingresar un número mayor a 0',
                                            validate: (value: number) => value > 0,
                                        },
                                        {
                                            message: 'Debe ingresar un número menor a 1000',
                                            validate: (value: number) => value < 1000,
                                        },
                                    ]
                                },
                                name: {
                                    label: 'Nombre', validators: [
                                        {
                                            message: 'El nombre debe ser menor a 30 caracteres',
                                            validate: (value: string) => value.length <= 30,
                                        },
                                        {
                                            message: 'El nombre debe ser mayor a 3 caracteres',
                                            validate: (value: string) => value.length > 3,
                                        },
                                        {
                                            message: 'El nombre debe contener solo caracteres',
                                            validate: (value: string) => /^[a-zñáéíóúA-ZÁÉÍÓÚÑ\s]+$/.test(value),
                                        }
                                    ]
                                },
                                address: { label: 'Domicilio' },
                                phone: {
                                    label: 'Teléfono', validators: [
                                        {
                                            message: 'El nombre debe contener solo caracteres',
                                            validate: (value: string) => /^[0-9]*$/.test(value),
                                        }
                                    ]
                                },
                                email: { label: 'Email' },
                            },
                            onSubmitError({ error }) {
                                Notification.show('' + error.detail, { theme: 'error' });
                                Notification.show('' + error.message, { theme: 'error' });
                                Notification.show('' + error.name, { theme: 'error' });
                                Notification.show('' + error.type, { theme: 'error' });
                            },
                            onDeleteError({ error }) {
                                Notification.show('Ocurrió un error al realizar la baja.', { theme: 'error' });
                            }
                        }}
                    />
                </div>
                :
                <NoAuthorizationView />
            }
        </>
    );
}