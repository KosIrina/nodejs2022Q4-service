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
git checkout rest-service
```

## Installing NPM modules

```
npm install
```

## Running application

Before running the application you can change default port to any other in `.env` file in the root directory.

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
