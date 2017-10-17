const _ = require('lodash');

/**
 *
 * @param {Object} entity - Sequelize entity to be wrapped into an entity envelope
 * @param {string} entityType - entity type code
 * @returns {Object} entity envelope
 */
function wrapIntoEntityEnvelope (entity, entityType) {
	return {
		id: entity.id,
		attributes: _.omit(entity, ['id']),
		type: entityType
	};
}

/**
 *
 * @param {Object|Object[]} entityEnvelopes - entity envelopes to wrap into data envelope
 * @returns {Object} data envelope
 */
function wrapIntoDataEnvelope (entityEnvelopes) {
	return  {
		data: entityEnvelopes
	};
}

module.exports = {wrapIntoDataEnvelope, wrapIntoEntityEnvelope};
