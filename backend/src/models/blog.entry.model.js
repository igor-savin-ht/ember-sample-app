const Sequelize = require('sequelize');
const sequelize = require('../repositories/sequelize.helper').getSequelizeInstance();

const BlogEntry = sequelize.define('BlogEntries', {
	subject: Sequelize.STRING,
	body: Sequelize.STRING
});

module.exports = BlogEntry;
