/* eslint-disable require-jsdoc */
const Umzug = require('umzug');
const sequelize = require('../src/repositories/sequelize.helper').getSequelizeInstance();
const logger = require('../src/helpers/logging.helper').mainLogger;

function initUmzugInstance(path) {
	return new Umzug({
		storage: 'sequelize',
		storageOptions: {
			sequelize: sequelize,
		},

		migrations: {
			params: [
				sequelize.getQueryInterface(),
				sequelize.constructor,
				function () {
					throw new Error(
						'Helper tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
				}
			],
			path: path,
			pattern: /\.js$/
		},

		logging: function () {
			logger.info.apply(arguments);
		},
	});
}

const migrationHelper = initUmzugInstance('./db/migrations');
const seedingHelper = initUmzugInstance('./db/seeders');

module.exports = {migrationHelper, seedingHelper};
