import { STRING, INTEGER, Model } from 'sequelize';
import sequelize from '.';

class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize,
  modelName: 'teams',
  timestamps: false,
});

export default TeamsModel;
