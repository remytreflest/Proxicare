import { Routes } from '@angular/router';
import { AppComponent } from '../components/base/app.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PlanningComponent } from '../pages/planning/planning.component';
import { RegisterComponent } from '../pages/register/register.component';
import { roleGuard } from '../guards/roleGuard';
import { RolesEnum } from '../resources/rolesEnum';
import { RegisterCaregiverComponent } from '../components/register-caregiver/register-caregiver.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/caregiver',
    component: RegisterCaregiverComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'planning',
    component: PlanningComponent,
    canActivate: [roleGuard(RolesEnum.USER)]
  },
];
