INSERT INTO "ORGANISATION" (id, code, name, address, phone, email) VALUES 
    (101, 21, 'Audiencia Nacional', 'Buenos Aires 1000', '2991234567', 'aud.nacional@gmail.com');
INSERT INTO "ORGANISATION" (id, code, name, address, phone, email) VALUES 
    (250, 11, 'Defensoría del Pueblo', 'Alcorta 520', '2997654321', 'def.pueblo@gmail.com');
INSERT INTO "ORGANISATION" (id, code, name, address, phone, email) VALUES 
    (88, 38, 'Jurado Nacional de Elecciones', 'Alberdi 100', '2991237654', 'jud.elecciones@gmail.com');
    

INSERT INTO "CUSTOM_USER" (id, name, username, lastname, dni, address, phone, email, user_type, organisation, password, role, enabled) VALUES 
    (40, 'tomas', 'admin', 'q', '41222222', 'Las Grutas 123', '2999999999', 'admin@gmail.com', 'INTERNO', 101, '{noop}admin', 'admin', true);
INSERT INTO "CUSTOM_USER" (id, name, username, lastname, dni, address, phone, email, user_type, organisation, password, role, enabled) VALUES 
    (25, 'user1', 'user', 'q', '41222222', 'Las Grutas 123', '2999999999', 'admin@gmail.com', 'INTERNO', 250, '{noop}user', 'user' ,true);


INSERT INTO "APPLICATION" (id, code, name) VALUES (126, 12, 'Compras');
INSERT INTO "APPLICATION" (id, code, name) VALUES (106, 24, 'RRHH');
INSERT INTO "APPLICATION" (id, code, name) VALUES (211, 05, 'Licencias');
INSERT INTO "APPLICATION" (id, code, name) VALUES (55, 9, 'Repositorio');

INSERT INTO "HAS_APP" (APP_ID, USER_ID) VALUES (126, 40);
INSERT INTO "HAS_APP" (APP_ID, USER_ID) VALUES (106, 40);
INSERT INTO "HAS_APP" (APP_ID, USER_ID) VALUES (106, 25);