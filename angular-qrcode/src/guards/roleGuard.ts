import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RolesEnum } from '../resources/rolesEnum';
import { UserService } from '../services/userService';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

export const roleGuard = (requiredRole: RolesEnum): CanActivateFn => (): Observable<boolean> => {
  const userService = inject(UserService);

  return userService.rolesLoaded$.pipe(
    filter(loaded => loaded),
    take(1),              
    map(() => {
      return userService.hasRole(requiredRole);
    })
  );
};

export const rolesGuard = (requiredRoles: RolesEnum[]): CanActivateFn => () => {
  let hasRoles = true;
  const userService = inject(UserService);

  
  requiredRoles.forEach((role: RolesEnum) => {
    console.log(role + " : " + userService.hasRole(role))
    if(!userService.hasRole(role)){
      hasRoles = false;
    }
  })
  return hasRoles;
};

export const rolesAtLeastOneGuard = (requiredRoles: RolesEnum[]): CanActivateFn => () => {
  let hasRoles = false;
  const userService = inject(UserService);

  requiredRoles.forEach((role: RolesEnum) => {
    if(userService.hasRole(role)){
      hasRoles = true;
    }
  })
  return hasRoles;
};

export const notIfRoleGuard = (requiredRole: RolesEnum): CanActivateFn => () => {
  const userService = inject(UserService);
  console.log(requiredRole)
  console.log(!userService.hasRole(requiredRole))
  return !userService.hasRole(requiredRole);
};
