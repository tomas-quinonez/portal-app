import { Button } from "@hilla/react-components/Button.js";
import { AutoCrud } from "@hilla/react-crud";
import ApplicationModel from "Frontend/generated/com/example/application/entities/ApplicationModel";
import { ApplicationService, CustomUserService } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import { Notification } from '@hilla/react-components/Notification.js';
import Application from "Frontend/generated/com/example/application/entities/Application";
import { ComboBox, ComboBoxChangeEvent } from "@hilla/react-components/ComboBox.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import CustomUser from "Frontend/generated/com/example/application/entities/CustomUser";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { Dialog } from "@hilla/react-components/Dialog.js";
import { useAuth } from "Frontend/auth";
import NoAuthorizationView from "../NoAuthorizationView";

export default function ApplicationView() {

    const [addDialogOpened, setAddDialogOpened] = useState(false);
    const [removeDialogOpened, setRemoveDialogOpened] = useState(false);
    const [apps, setApps] = useState<Application[]>([]);
    const [selectedApp, setSelectedApp] = useState<Application>();
    const [selecterUser, setSelectedUser] = useState<string>('');
    const [users, setUsers] = useState<(CustomUser | undefined)[]>();
    const [allUsers, setAllUsers] = useState<(CustomUser | undefined)[]>();

    const { state, login } = useAuth();

    const getApp = (event: ComboBoxChangeEvent<string>) => {
        const appName = event.target.value;
        ApplicationService.findByName(appName).then((app) => setSelectedApp(app));
    }

    const addUserToApp = () => {
        ApplicationService.addCustomUserToApplication(selectedApp?.name ?? '', selecterUser).
            then((users) => setUsers(users)).
            catch((reason) => Notification.show('Ocurrió un error al agregar un usuario', { theme: 'error' }));
    };

    const removeUserFromApp = () => {
        ApplicationService.removeCustomUserFromApplication(selectedApp?.name ?? '', selecterUser).
            then((users) => setUsers(users)).
            catch((reason) => Notification.show('Ocurrió un error al agregar un usuario', { theme: 'error' }));
    };

    const getAllUsers = () => {
        CustomUserService.findAll().then((users) => { setAllUsers(users) });
    };

    useEffect(() => {
        ApplicationService.findAll().then((apps) => { setApps(apps) });
    }, []);

    useEffect(() => {
        setUsers(selectedApp?.customUsers);
    }, [selectedApp]);

    return (
        <>
            {state.user?.authorities.includes('ROLE_ADMIN')
                ?
                <div className="p-m">
                    <h1>A/B/M de Aplicaciones</h1>
                    <AutoCrud
                        service={ApplicationService}
                        model={ApplicationModel}
                        gridProps={{
                            visibleColumns: ['code', 'name'],
                            columnOptions: {
                                code: { header: 'Código' },
                                name: { header: 'Nombre' },
                            },
                        }}
                        formProps={{
                            visibleFields: ['code', 'name'],
                            fieldOptions: {
                                code: { label: 'Código' },
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
                            },
                            onSubmitError({ error }) {
                                Notification.show('Ocurrió un error al realizar el alta. Posible repetición de valor único.', { theme: 'error' });
                            },
                            onDeleteError({ error }) {
                                Notification.show('Ocurrió un error al realizar la baja.', { theme: 'error' });
                            }
                        }} />
                    <hr />
                    <h2>Usuarios por Aplicación</h2>
                    <ComboBox label="Aplicación" items={apps.map((app) => app.name ?? '')} onChange={(event) => getApp(event)} />
                    <Grid items={users} theme="compact" allRowsVisible>
                        <GridColumn autoWidth path="username" header="Usuario" />
                        <GridColumn path="name" header="Nombre" />
                        <GridColumn path="lastname" header="Apellido" />
                        <GridColumn path="dni" header="DNI" />
                        <GridColumn path="email" />
                    </Grid>
                    <Dialog
                        headerTitle={"Agregar usuario a " + selectedApp?.name}
                        opened={addDialogOpened}
                        onOpenedChanged={({ detail }) => {
                            getAllUsers();
                            setAddDialogOpened(detail.value);
                        }}
                        footerRenderer={() => (
                            <>
                                <Button onClick={() => setAddDialogOpened(false)}>Cancela</Button>
                                <Button theme="primary" onClick={() => { addUserToApp(); setAddDialogOpened(false) }}>
                                    Agregar
                                </Button>
                            </>
                        )}
                    >
                        <ComboBox
                            label="Usuario"
                            item-label-path="username"
                            item-value-path="username"
                            items={allUsers}
                            onChange={(event) => setSelectedUser(event.target.value)} />
                    </Dialog>
                    <Dialog
                        headerTitle={"Remover usuario de " + selectedApp?.name}
                        opened={removeDialogOpened}
                        onOpenedChanged={({ detail }) => {
                            getAllUsers();
                            setRemoveDialogOpened(detail.value);
                        }}
                        footerRenderer={() => (
                            <>
                                <Button onClick={() => setRemoveDialogOpened(false)}>Cancelar</Button>
                                <Button theme="primary" onClick={() => { removeUserFromApp(); setRemoveDialogOpened(false) }}>
                                    Remover
                                </Button>
                            </>
                        )}
                    >
                        <ComboBox
                            label="Usuario"
                            item-label-path="username"
                            item-value-path="username"
                            items={users}
                            onChange={(event) => setSelectedUser(event.target.value)} />
                    </Dialog>
                    <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
                        <Button theme="primary success" onClick={() => setAddDialogOpened(true)}>Agregar Usuario</Button>
                        <Button theme="primary error" onClick={() => setRemoveDialogOpened(true)}>Eliminar Usuario</Button>
                    </HorizontalLayout>
                </div>
                :
                <NoAuthorizationView />
            }
        </>
    );
}