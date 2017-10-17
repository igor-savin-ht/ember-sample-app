const NodeCache = require('node-cache');
const accessTokenCache = new NodeCache({stdTTL: 0});
const refreshTokenCache = new NodeCache({stdTTL: 0});
const validate = require('validation-utils');

/**
 *
 * @param {String} accessToken - access token to retrieve
 * @returns {Object} accessToken if it exists or undefined otherwise
 */
function getAccessToken(accessToken) {
	validate.string(accessToken, 'Key for access token retrieval must be string');

	return accessTokenCache.get(accessToken);
}

/**
 *
 * @param {String} accessToken - access token to use as a key
 * @param {Object} accessTokenData - access token data to store
 * @returns {String} stored access token
 */
function saveAccessToken(accessToken, accessTokenData) {
	validate.string(accessToken, 'Key for access token storage must be string');
	validate.notNil(accessTokenData);

	accessTokenCache.set(accessToken, accessTokenData);
	return accessToken;
}

/**
 *
 * @param {String} refreshToken - refresh token to retrieve
 * @returns {Object} refreshTokenMetadata if it exists or undefined otherwise
 */
function getRefreshToken(refreshToken) {
	validate.string(refreshToken, 'Key for refresh token retrieval must be string');

	return refreshTokenCache.get(refreshToken);
}

/**
 *
 * @param {String} refreshToken - refresh token to use as a key
 * @param {Object} refreshTokenData - refresh token data to store
 * @returns {String} - stored refresh token
 */
function saveRefreshToken(refreshToken, refreshTokenData) {
	validate.string(refreshToken, 'Key for refresh token storage must be string');
	validate.notNil(refreshTokenData);

	refreshTokenCache.set(refreshToken, refreshTokenData);
	return refreshToken;
}

/**
 *
 * @param {String} refreshToken - refresh token to delete
 * @returns {boolean} true if the deletion was successful or false if the refresh token could not be found.
 */
function deleteRefreshToken(refreshToken) {
	validate.string(refreshToken, 'Key for refresh token deletion must be string');

	const entriesDeleted = refreshTokenCache.del(refreshToken);
	return entriesDeleted > 0;
}

module.exports = {deleteRefreshToken, getAccessToken, saveAccessToken, getRefreshToken, saveRefreshToken};
