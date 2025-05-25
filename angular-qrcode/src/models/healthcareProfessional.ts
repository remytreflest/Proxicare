import { SpecialityEnum } from "../resources/specialityEnum";
import { HealthcareAct } from "./healthcareAct";

export interface HealthcareProfessional {
  Id: number;
  UserId: number;
  Speciality: SpecialityEnum;
  StructureId: SpecialityEnum;
  IDN: string;
  HealthcareActs: HealthcareAct[];
}