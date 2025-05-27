import { Model, DataTypes } from 'sequelize';
import sequelize from '@/config/database';
import { PrescriptionHealthcareactsStatus } from '@/resources/emuns/prescriptionHealthcareactsStatus';

export class PrescriptionHealthcareAct extends Model {
  public Id!: number;
  public PrescriptionId!: number;
  public HealthcareActId!: number;
  public OccurrencesPerDay!: number;
  public Status!: PrescriptionHealthcareactsStatus;
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
  },
  Status: {
    type: DataTypes.STRING(50),
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