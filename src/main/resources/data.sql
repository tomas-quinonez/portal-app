INSERT INTO "ORGANISATION" (id, code, name, address, phone, email) VALUES 
    (101, 21, 'Audiencia Nacional', 'Buenos Aires 1000', '2991234567', 'aud.nacional@gmail.com');
INSERT INTO "ORGANISATION" (id, code, name, address, phone, email) VALUES 
    (250, 11, 'Defensoría del Pueblo', 'Alcorta 520', '2997654321', 'def.pueblo@gmail.com');
INSERT INTO "ORGANISATION" (id, code, name, address, phone, email) VALUES 
    (88, 38, 'Jurado Nacional de Elecciones', 'Alberdi 100', '2991237654', 'jud.elecciones@gmail.com');
    

INSERT INTO "CUSTOM_USER" (id, name, username, lastname, dni, address, phone, email, user_type, organisation, password, role, enabled) VALUES 
    (40, 'Tomas', 'admin', 'Q', '41222222', 'Los Alerces 123', '2999999999', 'admin@gmail.com', 'INTERNO', 101, 
    '$2y$11$3oS7lPxr.atYKpiz/.nqfOjbZZWX56WJhFvpcv4QV3DhTROdKYJF.', 'admin', true);
INSERT INTO "CUSTOM_USER" (id, name, username, lastname, dni, address, phone, email, user_type, organisation, password, role, enabled) VALUES 
    (25, 'Usuario', 'user', 'prueba', '38123456', 'Jujuy 500', '2888888888', 'user@gmail.com', 'EXTERNO', 250, 
    '$2y$11$GUeE.QXVWq5Brt7wE8lNju0gKR8Mx272Ure0Q.V6Smo/lQCfo6B8.', 'user', true);
INSERT INTO "CUSTOM_USER" (id, name, username, lastname, dni, address, phone, email, user_type, organisation, password, role, enabled) VALUES 
    (98, 'Pepe', 'pepe', 'Lopez', '24951753', 'Leloir 650', '154444444', 'pepe@gmail.com', 'INTERNO', 250, 
    NULL, 'user', true);


INSERT INTO "APPLICATION" (id, code, name) VALUES (126, 12, 'Compras');
INSERT INTO "APPLICATION" (id, code, name) VALUES (106, 24, 'RRHH');
INSERT INTO "APPLICATION" (id, code, name) VALUES (211, 05, 'Licencias');
INSERT INTO "APPLICATION" (id, code, name) VALUES (55, 9, 'Repositorio');

INSERT INTO "HAS_APP" (APP_ID, USER_ID) VALUES (126, 40);
INSERT INTO "HAS_APP" (APP_ID, USER_ID) VALUES (106, 40);
INSERT INTO "HAS_APP" (APP_ID, USER_ID) VALUES (211, 40);
INSERT INTO "HAS_APP" (APP_ID, USER_ID) VALUES (55, 40);
INSERT INTO "HAS_APP" (APP_ID, USER_ID) VALUES (106, 25);