import { Structure } from "./structure";

export interface Patient {
  Id: number;
  UserId: number;
  Birthday: Date;
  Gender: string;
  Address: string;
  SocialSecurityNumber: string;
  Structure?: Structure;
}