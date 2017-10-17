/* eslint-disable valid-jsdoc */
const httpStatus = require('http-status');
const userRepository = require('../repositories/user.repository');
const repository = require('../repositories/blog.entry.repository');
const envelopeHelper = require('../helpers/entity.envelope.helper');
const sequelizeHelper = require('../repositories/sequelize.helper');

const BLOG_ENTRY_TYPE = require('../config/constants').BLOG_ENTITY_TYPE;

/**
 * create blog entry
 *
 * POST: /v1/blog-entries
 *
 * body:
 *   id {integer}
 *   creationDate {date-time}
 *   subject {string}
 *   body {string}
 *
 */
exports.handler = async function createBlogEntry(req, res, next) {
	const blogEntry = req.body.data.attributes;
	const userId = req.userId;
	try {
		const user = await userRepository.findById(userId);
		const createdBlogEntryEntity = await repository.create(blogEntry, user);
		const createdBlogEntry = sequelizeHelper.convertEntityToDto(createdBlogEntryEntity);

		const wrappedEntry = envelopeHelper.wrapIntoEntityEnvelope(createdBlogEntry, BLOG_ENTRY_TYPE);
		const result = envelopeHelper.wrapIntoDataEnvelope(wrappedEntry);
		res.status(httpStatus.CREATED).send(result);
	} catch (err) {
		next(err);
	}
};
