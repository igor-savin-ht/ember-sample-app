const request = require('supertest');
const expect = require('chai').expect;
const httpStatus = require('http-status');

const repositoryMockHelper = require('../../repositories/test/helpers/blog.entry.repository.mock.helper');
const authMockHelper = require('./helpers/auth.mock.helper');
const CREATE_BLOG_ENTRY_ENDPOINT = '/v1/blog-entries';
const BLOG_ENTRY_ENTITY_TYPE = require('../../config/constants').BLOG_ENTITY_TYPE;
require('../../helpers/test/test.bootstrap');

describe('POST /blog/entries', () => {
	let app;
	beforeEach(() => {
		app = global.app;
	});

	it('creates new blog entry succesfully', () => {
		const resolveUserSpy = authMockHelper.stubResolveUserFromToken({id: 1});
		const createSpy = repositoryMockHelper.stubCreate();
		const blogEntry = {
			data: {
				attributes: {
					body: 'body'
				},
				type: BLOG_ENTRY_ENTITY_TYPE
			}
		};
		return request(app)
			.post(CREATE_BLOG_ENTRY_ENDPOINT)
			.set('Content-Type', 'application/vnd.api+json')
			.send(blogEntry)
			.expect(httpStatus.CREATED)
			.expect((response) => {
				const responseEntry = response.body.data;
				expect(responseEntry.id).to.be.an('number');
				expect(responseEntry.attributes.body).to.equal(blogEntry.data.attributes.body);
				expect(responseEntry.type).to.equal('blog-entry');
				expect(createSpy.called).to.be.true;
				expect(resolveUserSpy.called).to.be.true;
			});
	});

	it('throws an error if mandatory fields are missing', () => {
		authMockHelper.stubResolveUserFromToken({id: 1});
		return request(app)
			.post(CREATE_BLOG_ENTRY_ENDPOINT)
			.expect(httpStatus.BAD_REQUEST)
			.expect((response) => {
				expect(response.text).to.include('body requires property');
			});
	});

	it('throws an error if unsupported fields are present', () => {
		authMockHelper.stubResolveUserFromToken({id: 1});
		const blogEntry = {
			data: {
				attributes: {
					body: 'body'
				},
				type: BLOG_ENTRY_ENTITY_TYPE
			}
		};
		blogEntry.dummy = 'dummy';
		return request(app)
			.post(CREATE_BLOG_ENTRY_ENDPOINT)
			.set('Content-Type', 'application/vnd.api+json')
			.send(blogEntry)
			.expect(httpStatus.BAD_REQUEST)
			.expect((response) => {
				expect(response.text).to.include('body additionalProperty');
			});
	});


	it('throws an error if token is invalid', () => {
		const resolveUserSpy = authMockHelper.stubResolveUserFromToken(null);
		const blogEntry = {ownerId: 1, body: 'body'};
		blogEntry.dummy = 'dummy';
		return request(app)
			.post(CREATE_BLOG_ENTRY_ENDPOINT)
			.send(blogEntry)
			.expect(httpStatus.UNAUTHORIZED)
			.expect(() => {
				expect(resolveUserSpy.called).to.be.true;
			});
	});
});

