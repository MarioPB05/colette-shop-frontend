import { Routes } from '@angular/router';
import {AuthPageComponent} from '@features/auth/pages/auth-page.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('@dashboard/dashboard.module').then(
      m => m.DashboardModule
    )
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];
