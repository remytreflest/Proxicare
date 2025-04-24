/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    // Table: HealthcareProfessionals
    pgm.createTable('HealthcareProfessionals', {
      Id: { type: 'serial', primaryKey: true },
      UserId: { type: 'integer', notNull: true, references: '"Users"("Id")', onDelete: 'CASCADE' },
      Specialty: { type: 'varchar(100)', notNull: false },
    });
  
    // Table: Patients
    pgm.createTable('Patients', {
      Id: { type: 'serial', primaryKey: true },
      UserId: { type: 'integer', notNull: true, references: '"Users"("Id")', onDelete: 'CASCADE' },
      Birthday: { type: 'date', notNull: true },
      Gender: { type: 'varchar(10)', notNull: true },
      Address: { type: 'varchar(255)', notNull: false }, // Correction de "Adress" à "Address"
      SocialSecurityNumber: { type: 'varchar(20)', notNull: true, unique: true },
    });
  };
  
  /**
   * @param pgm {import('node-pg-migrate').MigrationBuilder}
   * @param run {() => void | undefined}
   * @returns {Promise<void> | void}
   */
  exports.down = (pgm) => {
      pgm.dropTable('Patients');
      pgm.dropTable('HealthcareProfessionals');
    };
