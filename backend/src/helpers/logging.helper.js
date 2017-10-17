const bunyan = require('bunyan');

const mainLogger = bunyan.createLogger({
	name: 'main',
	level: 'debug'
});

module.exports = {mainLogger};
