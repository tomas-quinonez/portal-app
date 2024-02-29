import { Button } from "@hilla/react-components/Button.js";
import { Checkbox } from "@hilla/react-components/Checkbox.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
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
import { set } from "@polymer/polymer/lib/utils/path";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { DatePicker } from "@hilla/react-components/DatePicker.js";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "Frontend/PDFDocument";

export default function ApplicationView() {

    const [apps, setApps] = useState<Application[]>([]);

    useEffect(() => {
        CustomUserService.getAppsByUsername().then((apps) => setApps(apps));
    }, []);

    return (
        <div className="p-m">
            <h1>Mis Aplicaciones</h1>
            <hr />
            <PDFDownloadLink document={<PDFDocument />} fileName={"resume.pdf"}>
                <Button className="px-4">
                    Download
                </Button>
            </PDFDownloadLink>
            <HorizontalLayout theme="margin spacing padding filled">
                {apps.map((app, idx) => {
                    return (<VerticalLayout style={{ backgroundColor: 'lightskyblue ', alignItems: 'center' }} theme="margin spacing padding" key={app.id}>
                        <header>
                            <h2>Aplicación {app.name}</h2>
                        </header>
                        <section aria-labelledby="personal-title">
                            <span><h2>Código: {app.code}</h2></span>
                        </section>
                        <a href="/abm/applications">
                            <Button theme="primary large">Ingresar <Icon icon="vaadin:paperplane-o" /></Button>
                        </a>
                    </VerticalLayout>)
                })}
            </HorizontalLayout>
        </div>
    );
}