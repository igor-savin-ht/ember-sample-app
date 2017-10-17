const validate = require('validation-utils');

const BlogEntry = require('../models/').BlogEntry;

/**
 *
 * @param {Object} blogEntry - entity to be created
 * @param {Object} user - user who is owner of the blog entry
 * @returns {blogEntry} - promise that will be resolved after entity is created
 */
function create(blogEntry, user) {
	validate.notNil(blogEntry, 'blogEntry cannot be null');
	validate.notNil(user, 'user cannot be null');

	const blogEntryInstance = BlogEntry.build(blogEntry);
	blogEntryInstance.setUser(user, {save: false});

	return blogEntryInstance.save();
}

/**
 *
 * @param {number} userId - id of a user whose blog entries to retrieve
 * @param {number} pageNum - page number
 * @param {number} pageSize - maximum amount of entities per page to return
 * @returns {Promise.<Object>} - search results
 */
async function findAll(userId, pageNum, pageSize) {
	validate.number(userId, 'userId must be a number');
	validate.number(pageNum, 'pageNum must be a number');
	validate.positiveNumber(pageSize, 'pageSize must be a positive number');

	const offset = pageNum * pageSize;
	return BlogEntry.findAll({where: {UserId: userId}, offset, limit: pageSize});
}

module.exports = {create, findAll};
