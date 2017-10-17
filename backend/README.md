# Blog Service

### Software dependencies

* Node.JS 8.x.y (tested with 8.6.0);
* gulp-cli 1.2.2+
* PostgreSQL DB (tested with 9.6.5)

### Getting started (for developers)

1) Install dependencies:
```shell
$ npm install
```

2) Create DB schema (assuming you have PostgreSQL DB running that can be accessed using default configuration, otherwise modify config/blog-service.default.conf.json or prepare override configuration):
```shell
$ gulp migrate
```

3) Seed DB with test data:
```shell
$ gulp seed
```

4) Run application:
```shell
$ npm start
```

This will start application in development mode with default configuration taken from config/blog-service.default.conf.json file

You can access Swagger UI while application is running via
http://localhost:4000/api-docs/

### Getting started (for production environment deployment)

1) Install dependencies:
```shell
$ npm install
```

2) Build deployment package:
```shell
$ gulp build
```

3) Extract deployment package into production environment.

4) Prepare configuration override files (non-encrypted public - for non-sensitive data and encrypted restricted - for
 sensitive data like DB passwords; for encryption you can use plain nconf or https://github.com/kibertoad/nconf-config-encryptor ); 

5) Create DB schema:
```shell
$ gulp migrate
```

6) Launch application using any tool e. g. pm2 and point to configuration override files (note that space in the front is important to make sure entry is not logged into OS logs, and setting decryption key as environment variable as opposed to cmdline parameter is important
to avoid process management tool from displaying it):
```shell
$ " DECRYPTION_KEY=dummyKey pm2 start server.js --name=blog-service -- --SERVICE_CONFIG_FILE=config/overrides/blog-service.profileName.public.conf.json --SERVICE_ENCRYPTED_CONFIG_FILE=config/overrides/blog-service.profileName.restricted.conf.encrypted.json"
```


### Running tests

1) Install dependencies:
```shell
$ npm install
```

2) Prepare DB schema:

```shell
$ gulp migrate
```

3) Run tests (without code coverage calculation):
```shell
$ npm test
```

Or run tests with code coverage calculation (results viewable in build/reports/coverage/index.html):
```shell
$ npm run test-coverage
```

##### NPM Scripts

* Run in development mode:
```shell
$ npm start
```

* Run in pseudo-production mode (using default configuration file but clustered pm2 mode):
```shell
$ npm start-prod
```

* Stop service launched in pseudo-production mode:
```shell
$ npm stop-prod
```

* Run linter on source code:
```shell
$ npm run lint
```


##### Gulp Scripts

* Make development build (without node_modules dependencies):
```shell
$ gulp build
```

* Update DB structure:
```shell
gulp migrate
```

* Import test data to DB:
```shell
gulp seed
```

