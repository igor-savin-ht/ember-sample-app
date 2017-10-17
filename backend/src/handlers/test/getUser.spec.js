const request = require('supertest');
const expect = require('chai').expect;
const httpStatus = require('http-status');

const authMockHelper = require('./helpers/auth.mock.helper');
const repositoryMockHelper = require('../../repositories/test/helpers/user.repository.mock.helper');
const GET_USER_ENDPOINT = '/v1/users';
require('../../helpers/test/test.bootstrap');

describe('GET /users', () => {
	let app;
	beforeEach(() => {
		app = global.app;
	});

	it('retrieves single user succesfully', () => {
		const findByIdSpy = repositoryMockHelper.stubFindById({dataValues: {id: 1}});
		const resolveUserSpy = authMockHelper.stubResolveUserFromToken({id: 1});

		return request(app)
			.get(`${GET_USER_ENDPOINT}/1`)
			.expect(httpStatus.OK)
			.expect((response) => {
				expect(response.body.data.id).to.equal(1);
				expect(findByIdSpy.called).to.be.true;
				expect(resolveUserSpy.called).to.be.true;
			});
	});
});

