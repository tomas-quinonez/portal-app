import { Button } from "@hilla/react-components/Button.js";
import { Checkbox } from "@hilla/react-components/Checkbox.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { AutoCrud } from "@hilla/react-crud";
import ApplicationModel from "Frontend/generated/com/example/application/entities/ApplicationModel";
import { ApplicationService } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import { Notification } from '@hilla/react-components/Notification.js';

export default function ApplicationView() {

    return (
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
                        Notification.show('Ocurrió un error al realizar el alta.', { theme: 'error' });
                    },
                }} />
        </div>
    );
}