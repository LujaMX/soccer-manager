# Soccer Manager

Aplicación web para la gestión de ligas y equipos de fútbol.

El proyecto implementa un CRUD utilizando **ASP.NET Core Web API**, **Angular** y **SQL Server**.

## Tecnologías utilizadas

* **Backend:** ASP.NET Core Web API
* **Frontend:** Angular
* **Base de datos:** SQL Server Express
* **Lenguaje backend:** C#
* **Lenguaje frontend:** TypeScript
* **Control de versiones:** Git / GitHub

## Funcionalidades

La aplicación permite:

* Registrar, consultar, modificar y eliminar **Ligas**.
* Registrar, consultar, modificar y eliminar **Equipos**.
* Registrar la relación entre **Equipos y Ligas**.
* Consultar los equipos pertenecientes a una liga.
* Validar la cantidad de jugadores permitida para un equipo.
* Activar o desactivar registros.

## Estructura del proyecto

```text
SoccerManager/
│
├── soccer-frontend/    # Aplicación Angular
│
├── SoccerAApi/            # API desarrollada con ASP.NET Core
│
├── SQLQuery1.sql           # Script de la base de datos
│
├── .gitignore
└── README.md
```

## Base de datos

La aplicación utiliza una base de datos llamada `Soccer`.

El script para crear la base de datos y sus datos se encuentra en:

```text
SQLQuery1.sql
```

## Ejecución del proyecto

### Backend

Abrir el proyecto de ASP.NET Core y ejecutar la API desde Visual Studio.

La API estará disponible en la URL indicada por ASP.NET Core al iniciar el proyecto.

### Frontend

Desde la carpeta `soccer-frontend` instalar las dependencias:

```bash
npm install
```

Después iniciar Angular:

```bash
ng serve
```

La aplicación estará disponible normalmente en:

```text
http://localhost:4200
```

## Autor

**Luis Portillo**

Proyecto realizado como práctica de desarrollo Full Stack.

