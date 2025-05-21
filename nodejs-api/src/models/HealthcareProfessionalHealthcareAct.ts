import { Model, DataTypes } from 'sequelize';
import sequelize from '@/config/database';

class HealthcareProfessionalHealthcareAct extends Model {}

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
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'HealthcareProfessionalHealthcareAct',
  tableName: 'HealthcareProfessionalHealthcareActs',
  timestamps: false,
});

export default HealthcareProfessionalHealthcareAct;