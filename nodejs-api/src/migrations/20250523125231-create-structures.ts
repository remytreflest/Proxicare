import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Table Structures
  await queryInterface.createTable('Structures', {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  });

  // Table d'association
  await queryInterface.createTable('HealthcareProfessionalStructures', {
    HealthcareProfessionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthcareProfessionals',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    StructureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Structures',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
    }
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('HealthcareProfessionalStructures');
  await queryInterface.dropTable('Structures');
}
