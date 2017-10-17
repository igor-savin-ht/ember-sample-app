/* eslint-disable valid-jsdoc */
const Sequelize = require('sequelize');
const _ = require('lodash');

const logger = require('../helpers/logging.helper').mainLogger;
const DB_CONFIG = require('../config/config').get('DB');
let sequelize = initSequelize();

/**
 *
 * @returns {Sequelize} - sequelize instance
 */
function initSequelize() {
	const sequelizeInstance = new Sequelize(
		DB_CONFIG.DATABASE,
		DB_CONFIG.USER,
		DB_CONFIG.PASSWORD,
		{
			host: DB_CONFIG.HOST,
			dialect: DB_CONFIG.DIALECT,

			pool: {
				max: DB_CONFIG.MAX_POOL_SIZE,
				min: DB_CONFIG.MIN_POOL_SIZE,
				idle: DB_CONFIG.IDLE_BEFORE_RELEASED_MSECS
			}
		});

	sequelizeInstance
		.authenticate()
		.then(() => {
			logger.info('Connection has been established successfully.');
		})
		.catch((err) => {
			logger.error('Unable to connect to the database:', err);
		});

	return sequelizeInstance;
}

/**
 *
 * @returns {Sequelize} - sequelize instance
 */
function getSequelizeInstance() {
	if (!sequelize) {
		sequelize = initSequelize();
	}
	return sequelize;
}

/**
 *
 * @returns {Promise.<TResult>|*} - closing promise
 */
function close() {
	return sequelize.connectionManager.close().then(() => {
		sequelize = null;
		logger.info('DB connection was shut down gracefully');
	});
}

/**
 * Converts Sequelize entity into plain DTO object
 */
function convertEntityToDto(entity) {
	return entity ? entity.dataValues : entity;
}

/**
 * Converts array of Sequelize entities into array of plain DTO objects
 */
function mapEntityArrayToDto(entityArray) {
	return _.map(entityArray, convertEntityToDto);
}

module.exports = {getSequelizeInstance, close, convertEntityToDto, mapEntityArrayToDto};
