import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RolesEnum } from '../resources/rolesEnum';
import { UserService } from '../services/userService';

export const roleGuard = (requiredRole: RolesEnum): CanActivateFn => () => {
  const userService = inject(UserService);
  return userService.hasRole(requiredRole);
};

export const rolesGuard = (requiredRoles: RolesEnum[]): CanActivateFn => () => {
  let hasRoles = true;
  const userService = inject(UserService);

  requiredRoles.forEach((role: RolesEnum) => {
    if(!userService.hasRole(role)){
      hasRoles = false;
    }
  })
  return hasRoles;
};
