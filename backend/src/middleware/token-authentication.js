/* eslint-disable require-jsdoc */
const httpStatus = require('http-status');

const authService = require('../services/authentication.service');

/**
 * Middleware that rejects request with 401 UNAUTHORIZED if no valid access token is provided
 * and fills req.user with ID of a user to whom token was issued if valid access token is provided.
 */

function middleware() {
	return async (req, res, next) => {
		const token = req.token;
		const user = await authService.resolveUserFromToken(token);

		if (!user) {
			return res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
		}

		req.userId = user.id;
		next();
	};
}

module.exports = middleware;
