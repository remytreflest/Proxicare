import { Routes } from '@angular/router';
import { AppComponent } from '../components/base/app.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PlanningComponent } from '../pages/planning/planning.component';
import { RegisterComponent } from '../pages/register/register.component';

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
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'planning',
    component: PlanningComponent
  },
];
