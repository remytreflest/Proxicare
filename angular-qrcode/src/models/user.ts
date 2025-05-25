import { HealthcareProfessional } from "./healthcareProfessional";
import { Patient } from "./patient";

export interface User {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Roles: string;
  HealthcareProfessional: HealthcareProfessional;
  Patient: Patient;
}