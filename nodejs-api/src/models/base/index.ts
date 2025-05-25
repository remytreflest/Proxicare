import Patient from '../Patient';
import { User } from '../User';
import Appointment from '../Appointment';
import HealthcareProfessional from '../HealthcareProfessional';
import HealthcareAct from '../HealthcareAct';
import { Structure } from '../Structure';

// Fonction pour initialiser les associations
export const initModels = () => {
  // Relations
  User.hasOne(Patient, { foreignKey: 'UserId' });
  Patient.belongsTo(User, { foreignKey: 'UserId' });

  User.hasOne(HealthcareProfessional, { foreignKey: 'UserId' });
  HealthcareProfessional.belongsTo(User, { foreignKey: 'UserId' });

  Patient.hasMany(Appointment, { foreignKey: 'PatientId' });
  Patient.belongsTo(Structure, { foreignKey: 'StructureId' });
  
  HealthcareProfessional.hasMany(Appointment, { foreignKey: 'HealthcareProfessionalId' });

  HealthcareAct.hasMany(Appointment, { foreignKey: 'HealthcareActId' });

  // Association en acte de soins et professionnel
  // Chaque professionnel doit pouvoir s'associer à des soins
  HealthcareProfessional.belongsToMany(HealthcareAct, {
    through: 'HealthcareProfessionalHealthcareAct',
    foreignKey: 'HealthcareProfessionalId',
  });
  HealthcareAct.belongsToMany(HealthcareProfessional, {
    through: 'HealthcareProfessionalHealthcareAct',
    foreignKey: 'HealthcareActId',
  });

  HealthcareProfessional.belongsToMany(Structure, {
    through: 'HealthcareProfessionalStructures',
    foreignKey: 'HealthcareProfessionalId'
  });
  Structure.belongsToMany(HealthcareProfessional, {
    through: 'HealthcareProfessionalStructures',
    foreignKey: 'StructureId'
  });

 return {
    User,
    Patient,
    HealthcareProfessional,
    HealthcareAct,
    Appointment,
    Structure
  };
};