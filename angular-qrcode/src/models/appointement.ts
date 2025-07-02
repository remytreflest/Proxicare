import { HealthcareAct } from "./healthcareAct";
import { HealthcareProfessional } from "./healthcareProfessional";
import { Patient } from "./patient";

export interface Appointment {
  Id: number;
  patient : Patient;
  HealthcareProfessionnal : HealthcareProfessional;
  Status: string;
  AppointementStartDate: Date;
  AppointementEndDate: Date;
  ValidateToken: string;
  ValidateTokenExpiration: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
  PrescriptionHealthcareAct : HealthcareAct;
}