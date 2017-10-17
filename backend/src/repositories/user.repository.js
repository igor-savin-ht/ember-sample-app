const validate = require('validation-utils');

const User = require('../models/').User;

/**
 *
 * @param {Object} user - user to persist
 * @returns {Promise.<Object>} - persisted user
 */
function create(user) {
	validate.notNil(user);

	return User.create(user);
}

/**
 *
 * @param {string} login - user login to search by
 * @returns {Promise.<Object>} - search result
 */
function findByLogin(login) {
	validate.notNil(login);

	return User.findOne({where: {login}});
}

/**
 *
 * @param {number} id - user id to retrieve by
 * @returns {Promise.<Object>} - retrieval result
 */
function findById(id) {
	validate.number(id);

	return User.findById(id);
}

/**
 *
 * @param {number} id - id of a user for whom password should be updated
 * @param {string} passwordHash - passwordHash that should be set for the specified user
 * @returns {string[]} - array of modified entity ids
 */
function updatePassword(id, passwordHash) {
	validate.number(id);
	validate.notNil(passwordHash);

	return User.update(
		{passwordHash},
		{where: {id}}
	);
}

module.exports = {create, findById, findByLogin, updatePassword};
