'use strict';

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('Users', [
			{
				name: 'John Doe',
				email: 'john@mail.com',
				login: 'user',
				passwordHash: '$2a$10$ggXLMoJrxzKt.jQPyOvSUeru.tflaQhL8l0GK6BtKwDklOjpAlaI6', //hash for 'pass'
				createdAt: new Date()
			},
			{
				name: 'Jane Doe',
				email: 'jane@mail.com',
				login: 'user2',
				passwordHash: '$2a$10$ggXLMoJrxzKt.jQPyOvSUeru.tflaQhL8l0GK6BtKwDklOjpAlaI6', //hash for 'pass'
				createdAt: new Date()
			}
		], {});
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
