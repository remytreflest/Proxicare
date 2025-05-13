import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class HealthcareProfessionalHealthcareAct extends Model {}

HealthcareProfessionalHealthcareAct.init({
  HealthcareProfessionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  HealthcareActId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'HealthcareProfessionalHealthcareAct',
  tableName: 'HealthcareProfessionalHealthcareActs',
  timestamps: false,
});
