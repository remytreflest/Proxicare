/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => 
{
    // Table: Appointments
    pgm.createTable('Appointments', {
        Id: { type: 'serial', primaryKey: true },
        PatientId: { type: 'integer', notNull: true, references: '"Patients"("Id")', onDelete: 'CASCADE' },
        HealthcareProfessionalId: { type: 'integer', notNull: true, references: '"HealthcareProfessionals"("Id")', onDelete: 'CASCADE' },
        HealthcareActId: { type: 'integer', notNull: true, references: '"HealthcareActs"("Id")', onDelete: 'CASCADE' },
        Status: { type: 'varchar(50)', notNull: true },
        AppointmentStartDate: { type: 'timestamp', notNull: true },
        AppointmentEndDate: { type: 'timestamp', notNull: true },
        CreatedAt: { type: 'timestamp', default: pgm.func('now()') },
        UpdatedAt: { type: 'timestamp', default: pgm.func('now()') },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => 
{
    pgm.dropTable('Appointments');
};
