/* eslint-disable valid-jsdoc */
const httpStatus = require('http-status');
const _ = require('lodash');

const envelopeHelper = require('../helpers/entity.envelope.helper');
const userRepository = require('../repositories/user.repository');
const sequelizeHelper = require('../repositories/sequelize.helper');

const USER_ENTITY_TYPE = require('../config/constants').USER_ENTITY_TYPE;

/**
 * get user
 *
 * GET: /v1/users/{id}
 *
 * path:
 *   id {integer} id.
 *
 */
exports.handler = async function getUser(req, res, next) {
	const userId = req.userId;

	try {
		if (userId !== parseInt(req.params.id)) {
			return res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
		}

		const userEntity = await userRepository.findById(userId);
		const user = sequelizeHelper.convertEntityToDto(userEntity);
		const sanitizedUser = _.omit(user, 'passwordHash');
		const wrappedUser = envelopeHelper.wrapIntoEntityEnvelope(sanitizedUser, USER_ENTITY_TYPE);
		const result = envelopeHelper.wrapIntoDataEnvelope(wrappedUser);

		res.send(result);
	} catch (err) {
		next(err);
	}
};
