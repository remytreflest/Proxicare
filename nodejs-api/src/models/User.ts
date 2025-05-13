import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { RoleEnum } from '../resources/emuns/rolesEnum';

export class User extends Model {
  public Id!: number;
  public FirstName!: string;
  public LastName!: string;
  public Email!: string;
  public Role!: RoleEnum;
  public CreatedAt!: Date;
}

User.init({
  Id: {
    type: DataTypes.STRING(64),
    allowNull: false,  // Id devient obligatoire
    primaryKey: true,  // Confirmer que Id est la clé primaire
    autoIncrement: false,  // Désactivation de l'auto-incrémentation
  },
  FirstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  Role: {
    type: DataTypes.ENUM(...Object.values(RoleEnum)),
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
  modelName: 'User',
  tableName: 'Users',
  timestamps: false,
});
