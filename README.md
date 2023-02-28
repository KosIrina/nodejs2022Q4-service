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
git checkout authentication-and-logging
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
! Authentication and Authorization for Swagger is in process (not implemented yet).

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

To run all tests with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

**!!! If something goes wrong with tests with authorization, try to run them with the following command**

```
npm run test:auth -- --runInBand
```

## Authentication

Most of the routes are protected by JWT. To get a token, you need to register a new user (`/auth/signup`) and then log in (`/auth/login`).  
JWT access token should be passed in the `Authorization` header and correspond the following Bearer scheme:

```
Authorization: Bearer <token>
```

To refresh the token use `/auth/refresh` endpoint.
JWT refresh token should be passed:

- in the `Authorization` header: `Authorization: Bearer <refreshToken>`
- in body: `{ "refreshToken": "<refreshToken>" }`

Secrets used for signing the tokens are stored in `.env` file and can be changed.

## Logging

Logs are being written both to process.stdout and files.
Error logs are being written to separate files in a separate folder.

In `.env` file you can change the logging level (`LOGGING_LEVEL`, default = 1) that affects corresponding logging functionality.  
Logs with configured level are registered as well as other higher priority levels. For example if you set level 2, all messages with levels 0, 1 and 2 will be be logged.

Logging levels:
```
0 - Log
1 - Error
2 - Warn
3 - Debug
4 - Verbose
```

Also in `.env` file you can change max size of files, where logs are being written (`LOGGING_MAX_FILE_SIZE_KB`, default = 25 kilobytes).

## Error handling

To emitate `uncaughtException` you can provide the following code at the end of the `main.ts` file:
```
setTimeout(() => {
  throw new Error('Oops');
}, 2000);
```

To emitate `unhandledRejection` you can provide the following code at the end of the `async function bootstrap() { ... }` in `main.ts` file:
```
throw new Error('Oops');
```

To emitate unexpected error that will be handled by `Exception Filter` you can provide the following code in a controller method (for exapmle, `getHello()` method in `app.controller.ts`) and call this method:
```
throw new Error('Oops');
```
**! Note, that in production mode `uncaughtException` and `unhandledRejection` initiate terminating the application**

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
