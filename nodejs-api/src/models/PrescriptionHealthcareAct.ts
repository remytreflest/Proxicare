import { Model, DataTypes } from 'sequelize';
import sequelize from '@/config/database';
import { PrescriptionHealthcareactsStatus } from '@/resources/emuns/prescriptionHealthcareactsStatus';
import { Prescription } from './Prescription';
import Appointment from './Appointment';
import HealthcareAct from './HealthcareAct';

export class PrescriptionHealthcareAct extends Model {
  public Id!: number;
  public PrescriptionId!: number;
  public HealthcareActId!: number;
  public OccurrencesPerDay!: number;
  public Status!: PrescriptionHealthcareactsStatus;
  public validateToken!: string | null;
  public validateTokenLimitTime!: Date | null;

  public Prescription?: Prescription;
  public Appointments?: Appointment[];
  public HealthcareAct?: HealthcareAct;
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
  },
  validateToken: {
    type: DataTypes.UUID,
    allowNull: true,
    defaultValue: null,
  },
  validateTokenLimitTime: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
}, {
  sequelize,
  modelName: 'PrescriptionHealthcareAct',
  tableName: 'PrescriptionHealthcareActs',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt',
});