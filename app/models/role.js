'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.User, { foreignKey: 'roleId' });
		}
	}
	Role.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Role',
		}
	);
	return Role;
};
