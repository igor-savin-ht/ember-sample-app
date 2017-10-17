const request = require('supertest');
const expect = require('chai').expect;
const httpStatus = require('http-status');

const authMockHelper = require('./helpers/auth.mock.helper');
const repositoryMockHelper = require('../../repositories/test/helpers/user.repository.mock.helper');
const cryptoService = require('../../services/cryptography.service');

const PATCH_USER_ENDPOINT = '/v1/users';
const USER_ENTITY_TYPE = require('../../config/constants').USER_ENTITY_TYPE;
require('../../helpers/test/test.bootstrap');

describe('PATCH /users', () => {
	let app;
	beforeEach(() => {
		app = global.app;
	});

	it('updates user password succesfully', () => {
		const modifyPasswordStub = repositoryMockHelper.stubUpdatePassword();
		const resolveUserStub = authMockHelper.stubResolveUserFromToken({id: 1});
		const hashPasswordStub = global.sinon.stub(cryptoService, 'hashPassword')
			.onFirstCall().returns(Promise.resolve('abc'));

		const userEntry = {
			data: {
				id: 1,
				attributes: {
					password: 'newPass'
				},
				type: USER_ENTITY_TYPE
			}
		};

		return request(app)
			.patch(`${PATCH_USER_ENDPOINT}/1`)
			.set('Content-Type', 'application/vnd.api+json')
			.send(userEntry)
			.expect(httpStatus.OK)
			.expect(() => {
				expect(resolveUserStub.called).to.be.true;
				expect(hashPasswordStub.calledWith('newPass')).to.be.true;
				expect(modifyPasswordStub.calledWith(1, 'abc')).to.be.true;
			});
	});
});

