'use strict';

import { Op } from 'sequelize';
import { hashSync } from 'bcryptjs';
import { Role } from '../../app/models';

const names = ['Johnny', 'Fikri', 'Brian', 'Ranggawarsita', 'Jayabaya'];

export async function up(queryInterface) {
	const password = '123456';
	const encryptedPassword = hashSync(password, 10);
	const timestamp = new Date();

	const role = await Role.findOne({
		where: {
			name: 'CUSTOMER',
		},
	});

	const users = names.map((name) => ({
		name,
		email: `${name.toLowerCase()}@binar.co.id`,
		encryptedPassword,
		roleId: role.id,
		createdAt: timestamp,
		updatedAt: timestamp,
	}));

	await queryInterface.bulkInsert('Users', users, {});
}
export async function down(queryInterface) {
	await queryInterface.bulkDelete('Users', { name: { [Op.in]: names } }, {});
}
