import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '@/config/database';
import HealthcareAct from '@/models/HealthcareAct';
import { SpecialityEnum } from '@/resources/emuns/speciality';

class HealthcareProfessional extends Model {
  public Id!: number;
  public UserId!: number;
  public Speciality?: SpecialityEnum;

  public readonly HealthcareActs?: HealthcareAct[];

  public static associations: {
    healthcareActs: Association<HealthcareProfessional, HealthcareAct>;
  };
}

HealthcareProfessional.init({
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserId: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  Speciality: {
    type: DataTypes.ENUM(...Object.values(SpecialityEnum)),
    allowNull: true,
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
  modelName: 'HealthcareProfessional',
  tableName: 'HealthcareProfessionals',
  timestamps: false,
});

export default HealthcareProfessional;
