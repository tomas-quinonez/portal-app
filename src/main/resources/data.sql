INSERT INTO "CUSTOM_USER" (id, name, username, password, role, enabled) VALUES 
    (40, 'tomas', 'admin', '{noop}admin', 'ROLE_ADMIN', true);
INSERT INTO "CUSTOM_USER" (id, name, username, password, role, enabled) VALUES 
    (25, 'tomas', 'user', '{noop}user', 'ROLE_USER' ,true);


INSERT INTO "ORGANISATION" (id, code, name, address, phone, email) VALUES 
    (101, 21, 'Audiencia Nacional', 'Buenos Aires 1000', '2991234567', 'aud.nacional@gmail.com');
INSERT INTO "ORGANISATION" (id, code, name, address, phone, email) VALUES 
    (250, 11, 'Defensoría del Pueblo', 'Alcorta 520', '2997654321', 'def.pueblo@gmail.com');
INSERT INTO "ORGANISATION" (id, code, name, address, phone, email) VALUES 
    (88, 38, 'Jurado Nacional de Elecciones', 'Alberdi 100', '2991237654', 'jud.elecciones@gmail.com');


INSERT INTO "APPLICATION" (id, code, name) VALUES (126, 12, 'Compras');
INSERT INTO "APPLICATION" (id, code, name) VALUES (106, 24, 'RRHH');
INSERT INTO "APPLICATION" (id, code, name) VALUES (211, 05, 'Licencias');