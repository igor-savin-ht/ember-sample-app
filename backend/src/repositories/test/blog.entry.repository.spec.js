const expect = require('chai').expect;

const User = require('../../models/').User;
const repository = require('../blog.entry.repository');
const repositoryHelper = require('./helpers/repository.test.helper');
require('../../helpers/test/test.bootstrap');

describe('blog.entry.repository', () => {
	afterEach(async () => {
		await repositoryHelper.cleanDbTables();
	});

	it('creates new blog entry succesfully', async () => {
		const blogEntry = {body: 'body'};
		const user = await User.build().save();
		const createdEntry = await repository.create(blogEntry, user);

		expect(createdEntry.id).to.be.an('number');
		expect(createdEntry.body).to.equal(blogEntry.body);
		expect(createdEntry.createdAt).to.be.an('date');
		expect(createdEntry.updatedAt).to.be.an('date');
	});

	it('retrieves blog entries succesfully', async () => {
		const blogEntry1 = {body: 'body'};
		const blogEntry2 = {body: 'body2'};
		const user1 = await User.build().save();
		const user2 = await User.build().save();
		await repository.create(blogEntry1, user1);
		await repository.create(blogEntry2, user2);
		const storedEntries = await repository.findAll(user1.id, 0, 100);

		expect(storedEntries.length).to.equal(1);
		const createdEntry = storedEntries[0];
		expect(createdEntry.id).to.be.an('number');
		expect(createdEntry.body).to.equal(blogEntry1.body);
		expect(createdEntry.createdAt).to.be.an('date');
		expect(createdEntry.updatedAt).to.be.an('date');
	});

	it('retrieves first page correctly', async () => {
		const blogEntry1 = {body: 'body1'};
		const blogEntry2 = {body: 'body2'};
		const user = await User.build().save();
		await repository.create(blogEntry1, user);
		await repository.create(blogEntry2, user);

		const storedEntries = await repository.findAll(user.id, 0, 1);

		expect(storedEntries.length).to.equal(1);
		const createdEntry = storedEntries[0];
		expect(createdEntry.body).to.equal(blogEntry1.body);
	});

	it('retrieves second page correctly', async () => {
		const blogEntry1 = {body: 'body1'};
		const blogEntry2 = {body: 'body2'};
		const user = await User.build().save();
		await repository.create(blogEntry1, user);
		await repository.create(blogEntry2, user);

		const storedEntries = await repository.findAll(user.id, 1, 1);

		expect(storedEntries.length).to.equal(1);
		const createdEntry = storedEntries[0];
		expect(createdEntry.body).to.equal(blogEntry2.body);
	});
});

