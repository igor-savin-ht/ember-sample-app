const expect = require('chai').expect;

const repository = require('../token.repository');

describe('token.repository', () => {
	it('stores access token succesfully', () => {
		repository.saveAccessToken('abc', {token: 'abc'});
		const storedAccessToken = repository.getAccessToken('abc');
		expect(storedAccessToken).to.be.an('object');
		expect(storedAccessToken.token).to.equal('abc');
	});

	it('stores refresh token successfully', () => {
		repository.saveRefreshToken('abc', {token: 'abc'});
		const storedAccessToken = repository.getRefreshToken('abc');
		expect(storedAccessToken).to.be.an('object');
		expect(storedAccessToken.token).to.equal('abc');
	});

	it('deletes refresh token password succesfully', () => {
		repository.saveRefreshToken('abc', {token: 'abc'});
		repository.deleteRefreshToken('abc');
		const storedAccessToken = repository.getRefreshToken('abc');
		expect(storedAccessToken).to.be.undefined;
	});
});

