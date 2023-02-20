# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/KosIrina/nodejs2022Q4-service.git
```

## Switching to the correct folder and branch

```
cd nodejs2022Q4-service
git checkout containerization-and-database
```

## Installing NPM modules

```
npm install
```

## Running application

**!!! Local PostgreSQL installation is required.** Please, follow the next steps:
- download, install and run [PostgreSQL](https://www.postgresql.org/download/)
- in PostgreSQL create database with name `app_db`
- make sure that the server and created database are connected
- in `.env` replace `POSTGRES_PASSWORD` with the one you've entered when installing PostgreSQL
- if during installation of PostgreSQL you've changed some default values (for example, `user` (by default - 'postgres') or `port` (by default - '5432')), don't forget to update them in `.env` 

Before running the application you can also change default port to any other in `.env` file in the root directory.

Otherwise, application will be launched on port 4000.

```
npm start
```

After starting the app on port you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

! Note, that if you have changed port in `.env` file, documentation will be available on the corresponding port.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After running the application open new terminal and enter:

To run all tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

## Auto-fix
Applies eslint

```
npm run lint
```

## Format
Applies prettier

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
