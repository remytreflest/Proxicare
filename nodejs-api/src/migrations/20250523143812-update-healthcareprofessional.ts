import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Ajouter la colonne IDN
  await queryInterface.addColumn('HealthcareProfessionals', 'IDN', {
    type: DataTypes.STRING(100),
    allowNull: true,
  });

  // Ajouter la colonne StructureId avec clé étrangère
  await queryInterface.addColumn('HealthcareProfessionals', 'StructureId', {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Structures',
      key: 'Id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn('HealthcareProfessionals', 'StructureId');
  await queryInterface.removeColumn('HealthcareProfessionals', 'IDN');
}