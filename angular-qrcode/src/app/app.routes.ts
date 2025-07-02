import { Routes } from '@angular/router';
import { AppComponent } from '../components/base/app.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PlanningComponent } from '../pages/planning/planning.component';
import { RegisterComponent } from '../pages/register/register.component';
import { notIfRoleGuard, roleGuard, rolesAtLeastOneGuard, rolesGuard } from '../guards/roleGuard';
import { RolesEnum } from '../resources/rolesEnum';
import { UserAccountComponent } from '../pages/user-account/user-account.component';
import { RegisterPatientComponent } from '../components/register-patient/register-patient.component';
import { ManageActsComponent } from '../pages/manage-acts/manage-acts.component';
import { RegisterhealthcareprofessionalComponent } from '../components/register-healthcareprofessional/register-healthcareprofessional.component';
import { CreatePrescriptionComponent } from '../pages/create-prescription/create-prescription.component';
import { PrescriptionsToPlanComponent } from '../pages/prescriptions-to-plan/prescriptions-to-plan.component';
import { RolesLoadedGuard } from '../guards/rolesLoadedGuard';
import { ValidateActPatientComponent } from '../pages/validate-act-patient/validate-act-patient.component';
import { PrescriptionsForPatientComponent } from '../pages/prescriptions-for-patient/prescriptions-for-patient.component';
import { ValidateActHealthcareprofessionalComponent } from '../pages/validate-act-healthcareprofessional/validate-act-healthcareprofessional.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RolesLoadedGuard, notIfRoleGuard(RolesEnum.USER)]
  },
  {
    path: 'register/healthcareprofessional',
    component: RegisterhealthcareprofessionalComponent,
    canActivate: [RolesLoadedGuard, notIfRoleGuard(RolesEnum.HEALTHCAREPROFESSIONAL)]
  },
  {
    path: 'register/patient',
    component: RegisterPatientComponent,
    canActivate: [RolesLoadedGuard, notIfRoleGuard(RolesEnum.PATIENT)]
  },
  {
    path: 'manage-acts',
    component: ManageActsComponent,
    canActivate: [RolesLoadedGuard, roleGuard(RolesEnum.HEALTHCAREPROFESSIONAL)]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RolesLoadedGuard, roleGuard(RolesEnum.ADMIN)]
  },
  {
    path: 'account',
    component: UserAccountComponent,
    canActivate: [RolesLoadedGuard, roleGuard(RolesEnum.USER)]
  },
  {
    path: 'planning',
    component: PlanningComponent,
    canActivate: [roleGuard(RolesEnum.USER)]
  },
  {
    path: 'create-prescription',
    component: CreatePrescriptionComponent,
    canActivate: [RolesLoadedGuard, roleGuard(RolesEnum.STRUCTURE)]
  },
  {
    path: 'prescriptions-to-plan',
    component: PrescriptionsToPlanComponent,
    canActivate: [RolesLoadedGuard, roleGuard(RolesEnum.HEALTHCAREPROFESSIONAL)]
  },
  { 
    path: 'patient/prescriptions', 
    component: PrescriptionsForPatientComponent,
    canActivate: [RolesLoadedGuard, roleGuard(RolesEnum.PATIENT)]
  },
  { 
    path: 'validate-act/patient/:prescriptionHealthcareActId', 
    component: ValidateActPatientComponent,
    canActivate: [RolesLoadedGuard, roleGuard(RolesEnum.PATIENT)]
  },
  {
    path: 'validate-act/healthcareprofessional/:prescriptionHealthcareActId/:token',
    component: ValidateActHealthcareprofessionalComponent,
    canActivate: [RolesLoadedGuard, roleGuard(RolesEnum.HEALTHCAREPROFESSIONAL)]
  }
];
