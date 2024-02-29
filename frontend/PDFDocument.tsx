import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ApplicationService } from './generated/endpoints';
import Application from './generated/com/example/application/entities/Application';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

// Create Document Component
export default function PDFDocument() {

    const [apps, setApps] = useState<Application[]>([]);

    useEffect(() => {
        ApplicationService.findAll().then(apps => setApps(apps));
    }, [])

    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
        },
        author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 40,
        },
        subtitle: {
            fontSize: 18,
            margin: 12,
        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: 'justify',
            fontFamily: 'Times-Roman'
        },
        image: {
            marginVertical: 15,
            marginHorizontal: 100,
        },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: 'center',
            color: 'grey',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
    });

    return (
        <Document title='Lista de Usuarios Autorizados por Aplicación'>
            <Page size="A4" style={styles.body}>
                <Text style={styles.title}>Lista de Usuarios Autorizados por Aplicación</Text>
                <View style={{ flexDirection: "column", width: 400, marginTop: 20 }}>
                    {
                        apps.map((app, id) => {
                            return (
                                <View key={id} style={{ flexDirection: "column", marginBottom: 4 }}>
                                    <Text style={styles.subtitle}>- {app.name}:</Text>
                                    {(typeof app.customUsers !== 'undefined' && app.customUsers.length > 0) ?
                                        app.customUsers?.map((user, id) => {
                                            return (
                                                <View key={id} style={{ flexDirection: "row", marginBottom: 4 }}>
                                                    <Text style={{ marginHorizontal: 8 }}>•</Text>
                                                    <Text>{user?.username}</Text>
                                                </View>
                                            )
                                        }) :
                                        <View key={id} style={{ flexDirection: "row", marginBottom: 4, marginLeft: 4 }}>
                                            <Text>No hay usuarios autorizados</Text>
                                        </View>
                                    }
                                </View>
                            );
                        })
                    }
                </View>
            </Page>
        </Document>
    );
}