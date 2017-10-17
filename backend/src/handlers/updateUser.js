/* eslint-disable valid-jsdoc */
const httpStatus = require('http-status');

const userRepository = require('../repositories/user.repository');
const cryptoService = require('../services/cryptography.service');

/**
 * update user
 *
 * PATCH: /v1/users/{id}
 *
 */
exports.handler = async function updateUser(req, res, next) {
	const userId = req.userId;
	try {
		if (userId !== parseInt(req.params.id)) {
			return res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
		}
		const updatedUserAttributes = req.body.data.attributes;

		//We only support modifying password, for modifying other fields we would probably use a PUT request
		if (updatedUserAttributes.password) {
			const passwordHash = await cryptoService.hashPassword(updatedUserAttributes.password);
			userRepository.updatePassword(userId, passwordHash);
		}
		res.sendStatus(httpStatus.OK);
	} catch (err) {
		next(err);
	}
};
