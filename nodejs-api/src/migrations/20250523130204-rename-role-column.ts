import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // 1. Renommer la colonne 'Role' en 'Roles'
  await queryInterface.renameColumn('Users', 'Role', 'Roles');

  // 2. Modifier son type en STRING(255)
  await queryInterface.changeColumn('Users', 'Roles', {
    type: DataTypes.STRING(255),
    allowNull: false
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // 1. Revenir au nom 'Role'
  await queryInterface.renameColumn('Users', 'Roles', 'Role');

  // 2. Revenir à STRING(50)
  await queryInterface.changeColumn('Users', 'Role', {
    type: DataTypes.STRING(50),
    allowNull: false
  });
}
