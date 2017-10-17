const expect = require('chai').expect;

const cryptoService = require('../cryptography.service');

describe('cryptography.service', () => {
	it('hashes password successfully', async () => {
		const hash = await cryptoService.hashPassword('pass');

		expect(hash.length).to.equal(60);
	});

	it('checks correct password correctly', async () => {
		const hash = await cryptoService.hashPassword('pass');

		const comparisonResult = await cryptoService.checkPassword(hash, 'pass');

		expect(comparisonResult).to.equal(true);
	});

	it('checks wrong password correctly', async () => {
		const hash = await cryptoService.hashPassword('pass');

		const comparisonResult = await cryptoService.checkPassword(hash, 'pass1');

		expect(comparisonResult).to.equal(false);
	});

});

