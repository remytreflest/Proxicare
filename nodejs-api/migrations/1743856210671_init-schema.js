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
  // Table: Users
  pgm.createTable('Users', {
    Id: { type: 'serial', primaryKey: true },
    FirstName: { type: 'varchar(100)', notNull: true },
    LastName: { type: 'varchar(100)', notNull: true },
    Email: { type: 'varchar(255)', notNull: true, unique: true },
    Role: { type: 'varchar(50)', notNull: true },
    CreatedAt: { type: 'timestamp', default: pgm.func('now()') },
  });

  // Table: HealthcareActs
  pgm.createTable('HealthcareActs', {
    Id: { type: 'serial', primaryKey: true },
    Name: { type: 'varchar(100)', notNull: true },
    Description: { type: 'text', notNull: false },
    Price: { type: 'real', notNull: true },
    CreatedAt: { type: 'timestamp', default: pgm.func('now()') },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('HealthcareActs');
    pgm.dropTable('Users');
  };
