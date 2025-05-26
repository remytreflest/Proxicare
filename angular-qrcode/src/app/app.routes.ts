import { Routes } from '@angular/router';
import { AppComponent } from '../components/base/app.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PlanningComponent } from '../pages/planning/planning.component';
import { RegisterComponent } from '../pages/register/register.component';
import { roleGuard, rolesAtLeastOneGuard, rolesGuard } from '../guards/roleGuard';
import { RolesEnum } from '../resources/rolesEnum';
import { UserAccountComponent } from '../pages/user-account/user-account.component';
import { RegisterPatientComponent } from '../components/register-patient/register-patient.component';
import { ManageActsComponent } from '../pages/manage-acts/manage-acts.component';
import { RegisterhealthcareprofessionalComponent } from '../components/register-healthcareprofessional/register-healthcareprofessional.component';
import { CreatePrescriptionComponent } from '../pages/create-prescription/create-prescription.component';

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
    path: 'register/healthcareprofessional',
    component: RegisterhealthcareprofessionalComponent
  },
  {
    path: 'register/patient',
    component: RegisterPatientComponent
  },
  {
    path: 'manage-acts',
    component: ManageActsComponent
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
    canActivate: [rolesAtLeastOneGuard([RolesEnum.PATIENT, RolesEnum.HEALTHCAREPROFESSIONAL])]
  },
  {
    path: 'create-prescription',
    component: CreatePrescriptionComponent,
    canActivate: [roleGuard(RolesEnum.STRUCTURE)]
  },
];
