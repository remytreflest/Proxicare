import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Appointment extends Model {
  public Id!: number;
  public PatientId!: number;
  public HealthcareProfessionalId!: number;
  public HealthcareActId!: number;
  public Status!: string;
  public AppointmentStartDate!: Date;
  public AppointmentEndDate!: Date;
  public CreatedAt!: Date;
  public UpdatedAt!: Date;
}

Appointment.init({
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  PatientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  HealthcareProfessionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  HealthcareActId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  AppointmentStartDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  AppointmentEndDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Appointment',
  tableName: 'Appointments',
  timestamps: false, // ou `true` si tu veux Sequelize gérer createdAt/updatedAt automatiquement
});

export default Appointment;
