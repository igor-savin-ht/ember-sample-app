const Sequelize = require('sequelize');
const sequelize = require('../repositories/sequelize.helper').getSequelizeInstance();

const User = sequelize.define('Users', {
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	login: Sequelize.STRING,
	passwordHash: Sequelize.STRING,
});

module.exports = User;
