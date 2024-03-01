# Descripción
Se necesita desarrollar una aplicación denominada portal del usuario, en donde cada
usuario al iniciar sesión tenga disponible todas las aplicaciones en las que está autorizado a
utilizar.

# Herramientas

Este proyecto fue desarrollado con el framework para Java denominado *Hilla*, utilizando *React* para el frontend.

# Usuarios

Para realizar pruebas sobre el programa, se definieron dos usuarios en la base de datos en memoria:

- Usuario 1 (con rol de administrador):
  - Usuario: admin
  - Contraseña: admin

- Usuario 2 (con rol de usuario):
  - Usuario: user
  - Contraseña: user


# Ejecución

Para la ejecución del aplicativo se dispone de dos métodos a elegir.

## Método 1

Requisitos:
-  Docker

Ejecutar en una termimal los siguientes comandos desde la carpeta raíz de proyecto para ejecutar y desplegar localmente el proyecto con puerto 8080 (http://localhost:8080/):

```
$ docker build -t portal-app .
$ docker run --name portal-app -p 127.0.0.1:8080:8080 portal-app
```

Para detener el contenedor ejecutar el siguiente comando en una terminal: 

```
$ docker stop portal-app
```

## Método 2

Requisitos:
-  Node 18.0 o posterior
-  JDK 17 o posterior

Ejecutar en una termimal los siguientes comandos desde la carpeta raíz de proyecto para ejecutar y desplegar localmente el proyecto con puerto 8080 (http://localhost:8080/):

### Método 2.1:

```
$ mvn package -Pproduction
$ java -jar target/*.jar
```

### Método 2.2:

Ejecutar el siguiente comando en una termial:

- En Windows:
```
$ .\mvnw
```

- En Linux/macOS:
```
$ ./mvnw
```


