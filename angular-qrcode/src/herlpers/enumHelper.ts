import { RolesEnum } from "../resources/rolesEnum";

export function toRoleEnum(value: string): RolesEnum | null {
  if (Object.values(RolesEnum).includes(value as RolesEnum)) {
    return value as RolesEnum;
  }
  return null;
}

export function enumToArray<T extends object>(enumObj: T): string[] {
  return Object.values(enumObj) as string[];
}
