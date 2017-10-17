/* eslint-disable require-jsdoc */
const _ = require('lodash');
const httpStatus = require('http-status');
const OAuthError = require('oauth2-server/lib/errors/oauth-error');

const tokenRepository = require('../repositories/token.repository');
const userRepository = require('../repositories/user.repository');
const cryptoService = require('../services/cryptography.service');
const sequelizeHelper = require('../repositories/sequelize.helper');

const SERVICE_CLIENT_ID = require('../config/constants').SERVICE_CLIENT_ID;

const CLIENT = {
	id: SERVICE_CLIENT_ID,
	grants: ['password', 'refresh_token']
};

/**
 * OAuth 2 model as specified by {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html}
 */
const model = {
	getAccessToken,
	getRefreshToken,
	getClient: () => CLIENT,
	getUser,
	revokeToken,
	saveToken
};

function getAccessToken(accessToken) {
	return tokenRepository.getAccessToken(accessToken);
}

function getRefreshToken(refreshToken) {
	const storedRefreshToken = tokenRepository.getRefreshToken(refreshToken);
	if (storedRefreshToken) {
		return storedRefreshToken;
	}

	//By default oauth2-server will return 503 which means that you should retry later.
	//Since we know that refresh token for some reason doesn't exist anymore, we don't want that.
	throw new OAuthError('unknown_refresh_token', {code: httpStatus.UNAUTHORIZED});
}

async function getUser(username, password) {
	const userEntity = await userRepository.findByLogin(username);
	if (!userEntity) {
		return false;
	}
	const user = sequelizeHelper.convertEntityToDto(userEntity);
	const isPasswordValid = await cryptoService.checkPassword(user.passwordHash, password);
	return isPasswordValid ? _.omit(user, ['passwordHash']) : null;
}

async function saveToken(tokenData, client, user) {
	const accessTokenData = {
		client,
		user,
		token: tokenData.accessToken,
		accessTokenExpiresAt: tokenData.accessTokenExpiresAt
	};
	tokenRepository.saveAccessToken(tokenData.accessToken, accessTokenData);

	if (tokenData.refreshToken) {
		const refreshTokenData = {
			client,
			user,
			token: tokenData.refreshToken,
			refreshTokenExpiresAt: tokenData.refreshTokenExpiresAt
		};
		tokenRepository.saveRefreshToken(tokenData.refreshToken, refreshTokenData);
	}

	const result = {
		client,
		user
	};
	_.assign(result, tokenData);
	return result;
}

function revokeToken(refreshTokenMetadata) {
	return tokenRepository.deleteRefreshToken(refreshTokenMetadata.token);
}

module.exports = model;
