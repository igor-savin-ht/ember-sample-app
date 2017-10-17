const bcrypt = require('bcryptjs');
const validate = require('validation-utils');
const SALT_GENERATION_ROUNDS = 10;

/**
 *
 * @param {String} password - password to hash
 * @returns {Promise.<String>} - composite password hash that includes used algorithm details and salt
 */
async function hashPassword(password) {
	validate.string(password, 'password must be a string');

	const salt = await bcrypt.genSalt(SALT_GENERATION_ROUNDS);
	return bcrypt.hash(password, salt);
}

/**
 *
 * @param {String} expectedHash - previously generated composite hash to compare against
 * @param {String} providedPassword - password that is to be compared against previously generated composite hash
 * @returns {Promise.<boolean>} - true if password is correct, false if not
 */
function checkPassword(expectedHash, providedPassword) {
	validate.string(expectedHash, 'expectedHash must be a string');
	validate.string(providedPassword, 'actualPassword must be a string');

	return bcrypt.compare(providedPassword, expectedHash);
}

module.exports = {checkPassword, hashPassword};
