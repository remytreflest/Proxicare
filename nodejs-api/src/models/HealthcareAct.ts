import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import HealthcareProfessional from './HealthcareProfessional';

class HealthcareAct extends Model {
  public Id!: number;
  public Name!: string;
  public Description?: string;
  public Price!: number;
  public CreatedAt!: Date;
  public UpdatedAt!: Date;

  public readonly HealthcareProfessionals?: HealthcareProfessional[];

  public static associations: {
    healthcareProfessionals: Association<HealthcareAct, HealthcareProfessional>;
  };
}

HealthcareAct.init({
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'HealthcareAct',
  tableName: 'HealthcareActs',
  timestamps: false,
});

export default HealthcareAct;
