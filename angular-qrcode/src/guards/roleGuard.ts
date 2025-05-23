import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RolesEnum } from '../resources/rolesEnum';
import { UserService } from '../services/userService';

export const roleGuard = (requiredRole: RolesEnum): CanActivateFn => () => {
  const userService = inject(UserService);
  return userService.hasRole(requiredRole);
};
