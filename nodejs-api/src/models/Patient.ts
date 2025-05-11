import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Patient extends Model {
  public Id!: number;
  public UserId!: number;
  public Birthday!: Date;
  public Gender!: string;
  public Address!: string;
  public SocialSecurityNumber!: string;
}

Patient.init({
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserId: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  Birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Gender: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  SocialSecurityNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
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
  modelName: 'Patient',
  tableName: 'Patients',
  timestamps: false,
});

export default Patient;