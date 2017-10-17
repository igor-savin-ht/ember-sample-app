/* eslint-disable require-jsdoc */
const _ = require('lodash');
const repository = require('../../blog.entry.repository');

function stubFindAll(returnedValue) {
	return global.sinon.stub(repository, 'findAll')
		.onFirstCall().returns(Promise.resolve(returnedValue));
}

function stubCreate() {
	return global.sinon.stub(repository, 'create')
		.callsFake((params) => {
			const result = {id: 1};
			_.assign(result, _.omit(params, 'id'));
			return {
				dataValues: result
			};
		});
}

module.exports = {stubCreate, stubFindAll};
