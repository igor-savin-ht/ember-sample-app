const tokenRepository = require('../../../repositories/token.repository');
const userRepository = require('../../../repositories/user.repository');
const authService = require('../../../services/authentication.service');

/**
 *
 * @param {*} [returnedResult] - if not specified, same parameters that are passed to the stubbed method will be
 *     returned.
 * @returns {*} sinon stub for the saveAccessToken method
 */
function stubSaveAccessToken(returnedResult) {
	return global.sinon.stub(tokenRepository, 'saveAccessToken')
		.callsFake((params) => {
			return returnedResult || params;
		});
}

/**
 *
 * @param {*} [returnedResult] - if not specified, same parameters that are passed to the stubbed method will be
 *     returned.
 * @returns {*} sinon stub for the saveRefreshToken method
 */
function stubSaveRefreshToken(returnedResult) {
	return global.sinon.stub(tokenRepository, 'saveRefreshToken')
		.callsFake((params) => {
			return returnedResult || params;
		});
}

/**
 *
 * @param {*} returnedResult - value returned by stub
 * @returns {*} sinon stub for the getRefreshToken method
 */
function stubGetRefreshToken(returnedResult) {
	return global.sinon.stub(tokenRepository, 'getRefreshToken')
		.callsFake(() => {
			return returnedResult;
		});
}

/**
 *
 * @param {*} returnedResult - value returned by stub
 * @returns {*} sinon stub for the resolveUserFromToken method
 */
function stubResolveUserFromToken(returnedResult) {
	return global.sinon.stub(authService, 'resolveUserFromToken')
		.callsFake(() => {
			return returnedResult;
		});
}

/**
 *
 * @param {*} returnedResult - value returned by stub
 * @returns {*} sinon stub for the saveRefreshToken method
 */
function stubFindByLogin(returnedResult) {
	return global.sinon.stub(userRepository, 'findByLogin')
		.onFirstCall().returns(Promise.resolve(returnedResult));
}

module.exports =
	{stubGetRefreshToken, stubFindByLogin, stubSaveAccessToken, stubSaveRefreshToken, stubResolveUserFromToken};
