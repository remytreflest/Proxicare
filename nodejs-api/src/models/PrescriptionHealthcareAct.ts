import { Model, DataTypes } from 'sequelize';
import sequelize from '@/config/database';

export class PrescriptionHealthcareAct extends Model {
  public Id!: number;
  public PrescriptionId!: number;
  public HealthcareActId!: number;
  public OccurrencesPerDay!: number;
}

PrescriptionHealthcareAct.init({
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  PrescriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  HealthcareActId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  OccurrencesPerDay: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'PrescriptionHealthcareAct',
  tableName: 'PrescriptionHealthcareActs',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt',
});