const expect = require('chai').expect;

const repository = require('../user.repository');
const repositoryHelper = require('./helpers/repository.test.helper');
require('../../helpers/test/test.bootstrap');

describe('user.repository', () => {
	afterEach(async () => {
		await repositoryHelper.cleanDbTables();
	});

	it('creates new user successfully', async () => {
		const user = {name: 'name'};

		const createdUser = await repository.create(user);

		expect(createdUser.id).to.be.an('number');
		expect(createdUser.name).to.equal(user.name);
		expect(createdUser.createdAt).to.be.an('date');
		expect(createdUser.updatedAt).to.be.an('date');
	});

	it('retrieves users by id successfully', async () => {
		const user = {login: 'userLogin', name: 'user name'};
		const createdUser = await repository.create(user);

		const storedUser = await repository.findById(createdUser.id);

		expect(storedUser.id).to.equal(createdUser.id);
		expect(createdUser.name).to.equal(user.name);
	});

	it('retrieves users by login successfully', async () => {
		const user = {login: 'userLogin', name: 'user name'};
		await repository.create(user);

		const storedUser = await repository.findByLogin(user.login);

		expect(storedUser.id).to.be.an('number');
		expect(storedUser.name).to.equal(user.name);
		expect(storedUser.createdAt).to.be.an('date');
		expect(storedUser.updatedAt).to.be.an('date');
	});

	it('updates password successfully', async () => {
		const user = {login: 'userLogin', name: 'user name', password: 'pass'};
		await repository.create(user);
		const storedUser = await repository.findByLogin(user.login);

		await repository.updatePassword(storedUser.id, 'newPass');

		const updatedUser = await repository.findByLogin(user.login);
		expect(updatedUser.name).to.equal(user.name);
		expect(updatedUser.passwordHash).to.equal('newPass');
	});
});

