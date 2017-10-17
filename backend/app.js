const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const swaggerRoutes = require('swagger-routes');
const swaggerUi = require('swagger-ui-express');
const PATH_TO_BUILT_SWAGGER = require('./src/config/constants').PATH_TO_BUILT_SWAGGER;
const swaggerDocument = require(PATH_TO_BUILT_SWAGGER);
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const tokenAuthentication = require('./src/middleware/token-authentication');

const app = express();

app.use(cors()); //in production a whitelist is a better idea
app.use(compression());
app.use(bodyParser.json({limit: '10mb', type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bearerToken());
app.use(/\/((?!auth|api-docs).)*/, tokenAuthentication());

swaggerRoutes(app, {
	api: PATH_TO_BUILT_SWAGGER,
	handlers: './src/handlers',
	authorizers: './src/handlers/security'
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error(`Not Found: ${req.method} ${req.originalUrl}`);
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
