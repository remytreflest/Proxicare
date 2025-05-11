import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Modification de la table Users
  await queryInterface.changeColumn('Users', 'Id', {
    type: DataTypes.STRING(64),
    allowNull: false,  // Id devient obligatoire
    primaryKey: true,  // Confirmer que Id est la clé primaire
    autoIncrement: false,  // Désactivation de l'auto-incrémentation
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Annulation de la modification : remise en place de l'auto-incrémentation
  await queryInterface.changeColumn('Users', 'Id', {
    type: DataTypes.INTEGER,
    allowNull: false,  // Id reste obligatoire
    primaryKey: true,  // Confirmer que Id est la clé primaire
    autoIncrement: true,  // Réactivation de l'auto-incrémentation
  });
}