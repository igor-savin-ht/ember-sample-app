module.exports = {
	up: (queryInterface, Sequelize) => queryInterface
		.createTable('Users', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			name: Sequelize.STRING,
			email: Sequelize.STRING,
			login: {
				type: Sequelize.STRING,
				unique: true,
			},
			passwordHash: Sequelize.STRING,
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
			}
		}),

	down: (queryInterface) => queryInterface
		.dropTable('Users')
};
