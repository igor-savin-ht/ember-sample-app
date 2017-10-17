/* eslint-disable require-jsdoc */
const repository = require('../../user.repository');

function stubFindById(returnedValue) {
	return global.sinon.stub(repository, 'findById')
		.onFirstCall().returns(Promise.resolve(returnedValue));
}

function stubUpdatePassword(returnedValue) {
	return global.sinon.stub(repository, 'updatePassword')
		.onFirstCall().returns(Promise.resolve(returnedValue));
}

module.exports = {stubFindById, stubUpdatePassword};
