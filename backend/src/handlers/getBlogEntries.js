/* eslint-disable valid-jsdoc */
const _ = require('lodash');
const repository = require('../repositories/blog.entry.repository');
const envelopeHelper = require('../helpers/entity.envelope.helper');
const sequelizeHelper = require('../repositories/sequelize.helper');

const BLOG_ENTRY_TYPE = require('../config/constants').BLOG_ENTITY_TYPE;

/**
 * get blog entries
 *
 * GET: /v1/blog-entries
 *
 * query:
 *   pageSize {integer}
 *   pageNum {integer}
 *
 */
exports.handler = async function getBlogEntries(req, res, next) {
	const {pageSize, pageNum} = req.query;
	const ownerId = req.userId;
	try {
		const blogEntryEntities = await repository.findAll(ownerId, pageNum, pageSize);
		const blogEntries = sequelizeHelper.mapEntityArrayToDto(blogEntryEntities);

		const transformedEntries = _.map(blogEntries, (blogEntry) =>
			envelopeHelper.wrapIntoEntityEnvelope(blogEntry, BLOG_ENTRY_TYPE)
		);
		const result = envelopeHelper.wrapIntoDataEnvelope(transformedEntries);
		res.send(result);
	} catch (err) {
		next(err);
	}
};
