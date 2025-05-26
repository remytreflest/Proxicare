import { PrescriptionHealthcareAct } from "./prescriptionHealthcareAct";

export interface Prescription {
  Id: number;
  SocialSecurityNumber: string;
  StartDate: string;
  EndDate: string;
  CreatedAt: string;
  UpdatedAt: string;
  PrescriptionHealthcareActs: PrescriptionHealthcareAct[];
}