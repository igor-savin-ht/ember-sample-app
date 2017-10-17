/* eslint-disable require-jsdoc */
const request = require('supertest');
const expect = require('chai').expect;
const httpStatus = require('http-status');

const authMockHelper = require('./helpers/auth.mock.helper');
const repositoryMockHelper = require('../../repositories/test/helpers/blog.entry.repository.mock.helper');
const GET_BLOG_ENTRIES_ENDPOINT = '/v1/blog-entries';
require('../../helpers/test/test.bootstrap');

describe('GET /blog/entries', () => {
	let app;
	beforeEach(() => {
		app = global.app;
	});

	function expectBlogEntryEquals(actualResponseEntry, storedEntity) {
		expect(actualResponseEntry.attributes.body).to.equal(storedEntity.dataValues.body);
		expect(actualResponseEntry.id).to.equal(storedEntity.dataValues.id);
	}

	it('retrieves single blog entry succesfully', () => {
		const blogEntry = {
			dataValues: {
				id: 1, UserId: 1, body: 'body'
			}
		};
		const findAllSpy = repositoryMockHelper.stubFindAll([blogEntry]);
		const resolveUserSpy = authMockHelper.stubResolveUserFromToken({});

		return request(app)
			.get(GET_BLOG_ENTRIES_ENDPOINT)
			.expect(httpStatus.OK)
			.expect((response) => {
				expect(response.body.data.length).to.equal(1);
				expectBlogEntryEquals(response.body.data[0], blogEntry);
				expect(findAllSpy.called).to.be.true;
				expect(resolveUserSpy.called).to.be.true;
			});
	});

	it('retrieves multiple blog entries successfully', () => {
		const blogEntry1 = {dataValues: {id: 1, UserId: 1, body: 'body'}};
		const blogEntry2 = {dataValues: {id: 2, UserId: 2, body: 'body2'}};
		const findAllSpy = repositoryMockHelper.stubFindAll([blogEntry1, blogEntry2]);
		authMockHelper.stubResolveUserFromToken({});
		return request(app)
			.get(GET_BLOG_ENTRIES_ENDPOINT)
			.expect(httpStatus.OK)
			.expect((response) => {
				expect(response.body.data.length).to.equal(2);
				expectBlogEntryEquals(response.body.data[0], blogEntry1);
				expectBlogEntryEquals(response.body.data[1], blogEntry2);
				expect(findAllSpy.called).to.be.true;
			});
	});
});

