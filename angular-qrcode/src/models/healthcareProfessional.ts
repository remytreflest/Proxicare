import { SpecialityEnum } from "../resources/specialityEnum";
import { HealthcareAct } from "./healthcareAct";
import { Structure } from "./structure";

export interface HealthcareProfessional {
  Id: number;
  UserId: number;
  Speciality: SpecialityEnum;
  Structures?: Structure[];
  IDN: string;
  HealthcareActs: HealthcareAct[];
}