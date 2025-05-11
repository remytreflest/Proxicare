import Patient from './Patient';
import User from './User';
import Appointment from './Appointment';
import HealthcareProfessional from './HealthcareProfessional';
import HealthcareAct from './HealthcareAct';

// Relations
User.hasOne(Patient, { foreignKey: 'UserId' });
Patient.belongsTo(User, { foreignKey: 'UserId' });

User.hasOne(HealthcareProfessional, { foreignKey: 'UserId' });
HealthcareProfessional.belongsTo(User, { foreignKey: 'UserId' });

Patient.hasMany(Appointment, { foreignKey: 'PatientId' });
HealthcareProfessional.hasMany(Appointment, { foreignKey: 'HealthcareProfessionalId' });

HealthcareAct.hasMany(Appointment, { foreignKey: 'HealthcareActId' });

// Association en acte de soins et professionnel
HealthcareProfessional.belongsToMany(HealthcareAct, {
  through: 'HealthcareProfessionalHealthcareAct',
  foreignKey: 'HealthcareProfessionalId',
});

HealthcareAct.belongsToMany(HealthcareProfessional, {
  through: 'HealthcareProfessionalHealthcareAct',
  foreignKey: 'HealthcareActId',
});

export {
  Patient,
  User,
  Appointment,
  HealthcareProfessional,
  HealthcareAct
};