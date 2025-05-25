import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn('Patients', 'StructureId', {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn('Patients', 'StructureId');
}
