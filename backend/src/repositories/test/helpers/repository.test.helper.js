/* eslint-disable require-jsdoc */
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const BlogEntry = require('../../../models/blog.entry.model');
const User = require('../../../models/user.model');


async function cleanDbTables() {
	await BlogEntry.destroy({
		where: {},
		truncate: true
	});

	await User.destroy({
		where: {
			name: {
				//workaround to avoid deleting test data,
				//better solution would be to rollback changes after each test
				//or at least use separate DB for tests and launching app
				[Op.notIn]: ['John Doe', 'Jane Doe']
			}
		},
		truncate: false
	});
}

module.exports = {cleanDbTables};
