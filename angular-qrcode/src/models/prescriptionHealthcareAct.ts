import { HealthcareAct } from "./healthcareAct";

export interface PrescriptionHealthcareAct {
  Id: number;
  PrescriptionId: number;
  HealthcareActId: number;
  OccurrencesPerDay: number;
  CreatedAt: string;
  UpdatedAt: string;
  HealthcareAct: HealthcareAct;
}