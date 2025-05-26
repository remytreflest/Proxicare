import { Model, DataTypes } from 'sequelize';
import sequelize from '@/config/database';

export class Prescription extends Model {
  public Id!: number;
  public SocialSecurityNumber!: string;
  public StartDate!: Date;
  public EndDate!: Date;
}

Prescription.init({
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  SocialSecurityNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
        model: 'Patients',
        key: 'SocialSecurityNumber'
    },
  },
  StartDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  EndDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Prescription',
  tableName: 'Prescriptions',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt',
});