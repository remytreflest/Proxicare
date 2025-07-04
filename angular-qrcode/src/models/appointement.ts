import { HealthcareAct } from "./healthcareAct";
import { HealthcareProfessional } from "./healthcareProfessional";
import { Patient } from "./patient";

export interface Appointment {
  Id: number;
  PatientId : number;
  HealthcareProfessionalId : number;
  Status: string;
  AppointmentStartDate: Date;
  AppointmentEndDate: Date;
  ValidateToken: string;
  ValidateTokenExpiration: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
  PrescriptionHealthcareActId : number;
}