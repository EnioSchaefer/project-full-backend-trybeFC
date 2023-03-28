import { STRING, INTEGER, Model } from 'sequelize';
import sequelize from '.';

export default class UsersModel extends Model {
  declare id: number;
  declare username: number;
  declare role: number;
  declare email: number;
  declare password: number;
}

UsersModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize,
  modelName: 'users',
  timestamps: false,
});
