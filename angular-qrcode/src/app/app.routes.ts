import { Routes } from '@angular/router';
import { AppComponent } from '../components/base/app.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PlanningComponent } from '../pages/planning/planning.component';
import { RegisterComponent } from '../pages/register/register.component';
import { roleGuard } from '../guards/roleGuard';
import { RolesEnum } from '../resources/rolesEnum';
import { RegisterCaregiverComponent } from '../components/register-caregiver/register-caregiver.component';
import { UserAccountComponent } from '../pages/user-account/user-account.component';
import { RegisterPatientComponent } from '../components/register-patient/register-patient.component';

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
    path: 'register/patient',
    component: RegisterPatientComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'account',
    component: UserAccountComponent
  },
  {
    path: 'planning',
    component: PlanningComponent,
    canActivate: [roleGuard(RolesEnum.ADMIN)]
  },
];
