/* eslint-disable require-jsdoc,valid-jsdoc */
const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const oauth2Model = require('./oauth2.model');
const tokenRepository = require('../repositories/token.repository');
const ACCESS_TOKEN_LIFETIME_IN_SECS = require('../config/config').get('ACCESS_TOKEN_LIFETIME_IN_SECS');
const REFRESH_TOKEN_LIFETIME_IN_SECS = require('../config/config').get('REFRESH_TOKEN_LIFETIME_IN_SECS');
const SERVICE_CLIENT_ID = require('../config/constants').SERVICE_CLIENT_ID;

const oauth = new OAuth2Server({
	model: oauth2Model,
	accessTokenLifetime: ACCESS_TOKEN_LIFETIME_IN_SECS,
	refreshTokenLifetime: REFRESH_TOKEN_LIFETIME_IN_SECS,
	alwaysIssueNewRefreshToken: false
});

const NEW_TOKEN_OPTIONS = {
	requireClientAuthentication: {
		'password': false,
		'refresh_token': false
	}
};

/**
 * Authenticates a request
 * @param request - oauth2-server request
 */
function authenticate(request) {
	const response = initResponse();
	return oauth.authenticate(request, response);
}

/**
 * Authorizes a token request
 * @param request - oauth2-server request
 */
function authorize(request) {
	const response = initResponse();
	return oauth.authorize(request, response);
}

/**
 * Retrieves a new token - oauth2-server request for an authorized token request.
 * @param request - oauth2-server request
 */
function token(request) {
	// eslint-disable-next-line camelcase
	request.body.client_id = SERVICE_CLIENT_ID;
	const response = initResponse();
	return oauth.token(request, response, NEW_TOKEN_OPTIONS);
}

/**
 *
 * @param {string} [accessToken] access token that should be used to look up a user
 * @returns {Promise.<Object>}
 */
async function resolveUserFromToken(accessToken) {
	if (!accessToken) {
		return null;
	}
	const storedToken = await tokenRepository.getAccessToken(accessToken);

	if (storedToken) {
		return storedToken.user;
	}
	return null;
}

function expressToOauthRequest(req) {
	return new Request(req);
}

function initResponse() {
	return new Response({
		headers: {}
	});
}

module.exports = {authenticate, authorize, expressToOauthRequest, resolveUserFromToken, token};
