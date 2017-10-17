/* eslint-disable valid-jsdoc */
const authService = require('../services/authentication.service');
const ACCESS_TOKEN_EXPIRATION_TIME = require('../config/config').get('ACCESS_TOKEN_LIFETIME_IN_SECS');

/**
 * authenticate
 *
 * POST: /v1/auth
 *
 * formData:
 *   grant_type {string} OAuth 2 grant type.
 *   username {string} authentication username.
 *   password {string} authentication password.
 *
 */
exports.handler = async function authenticate(req, res, next) {
	try {
		const oathRequest = authService.expressToOauthRequest(req);
		const authResult = await authService.token(oathRequest);
		const responseBody =
			{
				'userId': authResult.user.id,
				'access_token': authResult.accessToken,
				'token_type': 'bearer',
				'expires_in': ACCESS_TOKEN_EXPIRATION_TIME,
				'refresh_token': authResult.refreshToken
			};
		res.send(responseBody);
	} catch (err) {
		next(err);
	}
};
