/* eslint-disable camelcase */
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface
		.createTable('BlogEntries', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			subject: Sequelize.STRING,
			body: Sequelize.STRING,
			UserId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
			}
		}),

	down: (queryInterface) => queryInterface
		.dropTable('BlogEntries')
};
