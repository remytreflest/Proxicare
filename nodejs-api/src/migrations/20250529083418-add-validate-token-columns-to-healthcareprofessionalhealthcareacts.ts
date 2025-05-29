import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn('PrescriptionHealthcareActs', 'validateToken', {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.addColumn('PrescriptionHealthcareActs', 'validateTokenLimitTime', {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn('PrescriptionHealthcareActs', 'validateToken');
  await queryInterface.removeColumn('PrescriptionHealthcareActs', 'validateTokenLimitTime');
}
