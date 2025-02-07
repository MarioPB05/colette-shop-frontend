import { Routes } from '@angular/router';
import {AuthPageComponent} from '@features/auth/pages/auth-page.component';
import {CatalogPageComponent} from '@features/catalog/pages/catalog-page/catalog-page.component';
import {authGuard} from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('@dashboard/dashboard.module').then(
      m => m.DashboardModule
    ),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },
  {
    path: '',
    component: CatalogPageComponent,
    canActivate: [authGuard],
    data: { role: 'authenticated' }
  },
  {
    path: 'shop',
    component: CatalogPageComponent,
    canActivate: [authGuard],
    data: { role: 'authenticated' }
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];
