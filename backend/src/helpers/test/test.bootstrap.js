const sequelizeHelper = require('../../repositories/sequelize.helper');
const http = require('http');
const app = require('../../../app');
const sinon = require('sinon');
const logger = require('../logging.helper').mainLogger;

before((done) => {
	const port = 8084;
	const server = http.createServer(app);

	server.listen(port, () => {
		const addr = server.address();
		const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
		logger.info(`Listening on ${bind}`);

		global.app = app;
		global.server = server;
		done();
	});
});

beforeEach(() => {
	global.sinon = sinon.sandbox.create();
});

afterEach(() => {
	global.sinon.restore();
});

after(() => {
	sequelizeHelper.close();
	global.server.close();
});
