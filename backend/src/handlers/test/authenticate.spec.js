const request = require('supertest');
const expect = require('chai').expect;
const httpStatus = require('http-status');
const moment = require('moment');

const AUTHENTICATE_ENDPOINT = '/v1/auth';
const authMockHelper = require('./helpers/auth.mock.helper');

require('../../helpers/test/test.bootstrap');

const TEST_REFRESH_TOKEN = {
	client: {
		id: '1',
		grants: [
			'password',
			'refresh_token'
		]
	},
	user: {
		id: 1
	},
	token: 'abc',
	refreshTokenExpiresAt: moment().add(1, 'years').toDate()
};

describe('POST /auth', () => {
	let app;
	beforeEach(() => {
		app = global.app;
	});

	it('authenticates succesfully', () => {
		const saveAccessTokenSpy = authMockHelper.stubSaveAccessToken();
		const saveRefreshTokenSpy = authMockHelper.stubSaveRefreshToken();
		const getUserSpy = authMockHelper.stubFindByLogin({
			dataValues: {
				id: 1,
				passwordHash: '$2a$10$ggXLMoJrxzKt.jQPyOvSUeru.tflaQhL8l0GK6BtKwDklOjpAlaI6'
			}
		});
		return request(app)
			.post(AUTHENTICATE_ENDPOINT)
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send({'grant_type': 'password', 'username': 'user', 'password': 'pass'})
			.expect(httpStatus.OK)
			.expect((response) => {
				expect(response.body.access_token).to.be.an('string');
				expect(saveAccessTokenSpy.called).to.be.true;
				expect(saveRefreshTokenSpy.called).to.be.true;
				expect(getUserSpy.called).to.be.true;
			});
	});

	it('receives new access token for existing refresh token', () => {
		const saveAccessTokenSpy = authMockHelper.stubSaveAccessToken();
		const getRefreshTokenSpy = authMockHelper.stubGetRefreshToken(TEST_REFRESH_TOKEN);
		const saveRefreshTokenSpy = authMockHelper.stubSaveRefreshToken();
		return request(app)
			.post(AUTHENTICATE_ENDPOINT)
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send({'grant_type': 'refresh_token', 'refresh_token': 'abc'})
			.expect(httpStatus.OK)
			.expect((response) => {
				expect(response.body.access_token).to.be.an('string');
				expect(getRefreshTokenSpy.called).to.be.true;
				expect(saveAccessTokenSpy.called).to.be.true;
				expect(saveRefreshTokenSpy.called).to.be.false;
			});
	});

	it('receives unauthorized response for non-existing refresh token', () => {
		const saveAccessTokenSpy = authMockHelper.stubSaveAccessToken();
		const getRefreshTokenSpy = authMockHelper.stubGetRefreshToken(null);
		return request(app)
			.post(AUTHENTICATE_ENDPOINT)
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send({'grant_type': 'refresh_token', 'refresh_token': 'abc'})
			.expect(httpStatus.UNAUTHORIZED)
			.expect(() => {
				expect(saveAccessTokenSpy.called).to.be.false;
				expect(getRefreshTokenSpy.called).to.be.true;
			});
	});

	it('returns error on incorrect credentials', () => {
		const saveAccessTokenSpy = authMockHelper.stubSaveAccessToken();
		const saveRefreshTokenSpy = authMockHelper.stubSaveRefreshToken();
		const getUserSpy = authMockHelper.stubFindByLogin(null);
		return request(app)
			.post(AUTHENTICATE_ENDPOINT)
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send({'grant_type': 'password', 'username': 'user', 'password': 'pass'})
			.expect(httpStatus.BAD_REQUEST)
			.expect((response) => {
				expect(response.body.access_token).to.be.undefined;
				expect(saveAccessTokenSpy.called).to.be.false;
				expect(saveRefreshTokenSpy.called).to.be.false;
				expect(getUserSpy.called).to.be.true;
			});
	});
});

