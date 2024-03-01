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
import { Button } from "@hilla/react-components/Button.js";
import { Dialog } from "@hilla/react-components/Dialog.js";

export default function UserView() {

    const [items, setItems] = useState<String[]>([]);
    const [dialogOpened, setDialogOpened] = useState<boolean>(false);
    const [user, setUser] = useState<CustomUser>();
    const [isButtonEnabled, setButtonEnabled] = useState<boolean>(false);
    const [validPassword, setValidPassword] = useState<string>('');

    const { state, login } = useAuth();

    useEffect(() => {
        OrganisationService.findAll().then((orgs) => setItems(orgs.map((org) => org.name ?? '')));
    }, []);

    const PasswordState = ({ customUser }: { customUser: CustomUser }) => {
        if (customUser.password == null) {
            useEffect(() => {
                setUser(customUser);
            }, [])

            return <Button onClick={() => setDialogOpened(true)}>Agregar contraseña</Button>
        }
        return '*******'
    }

    const savePassword = () => {
        setDialogOpened(false);
        if (isButtonEnabled) {
            CustomUserService.setPasswordById(user?.username ?? '', validPassword).
                then(response => Notification.show('Contraseña añadida exitosamente', { theme: 'success' }));
        }
    };

    return (
        <>
            {state.user?.authorities.includes('ROLE_ADMIN')
                ?
                <div className="p-m">
                    <h1>A/B/M de Usuarios</h1>
                    <h2>Listado de Usuarios</h2>
                    <Dialog
                        headerTitle={"Asignar contraseña a '" + user?.username + "'"}
                        opened={dialogOpened}
                        onOpenedChanged={({ detail }) => {
                            setDialogOpened(detail.value);
                        }}
                        footerRenderer={() => (
                            <>
                                <Button onClick={() => setDialogOpened(false)}>Cancelar</Button>
                                <Button disabled={!isButtonEnabled} theme="primary" onClick={savePassword}>
                                    Agregar
                                </Button>
                            </>
                        )}
                    >
                        <PasswordField
                            label="Contraseña"
                            pattern="^(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}.*$"
                            helperText={'La contraseña debe contener entre 8 y 20 caracteres, al menos 1' +
                                'dígito, 1 letra en minúscula, 1 letra en mayúscula y no debe contener espacios'}
                            errorMessage="Contraseña Inválida"
                            onValidated={(e) => e.detail.valid ? setButtonEnabled(true) : setButtonEnabled(false)}
                            onValueChanged={e => setValidPassword(e.detail.value)}
                            required
                        />
                    </Dialog>
                    <AutoCrud
                        service={CustomUserDtoCrudService}
                        model={CustomUserDtoModel}
                        gridProps={{
                            noHeaderFilters: true,
                            visibleColumns: ['username', 'password', 'orgName', 'name', 'lastname', 'email', 'dni', 'address', 'phone', 'user_type', 'organisation', 'role'],
                            columnOptions: {
                                organisation: {
                                    renderer: ({ item }: { item: CustomUser }) => {
                                        return <span>{item.organisation?.name}</span>
                                    }
                                },
                                password: {
                                    renderer: ({ item }: { item: CustomUser }) =>
                                        <PasswordState customUser={item} />
                                }
                            },
                        }}
                        formProps={{
                            visibleFields: ['username', 'name', 'lastname', 'email', 'dni', 'address', 'phone', 'user_type', 'orgName', 'role'],
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
                            onDeleteError({ error }) {
                                Notification.show('Ocurrió un error al realizar la baja.', { theme: 'error' });
                            }
                        }} />
                </div>
                :
                <NoAuthorizationView />
            }
        </>
    );
}