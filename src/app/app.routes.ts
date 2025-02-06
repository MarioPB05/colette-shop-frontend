import { Routes } from '@angular/router';
import {AuthPageComponent} from '@features/auth/pages/auth-page.component';
import {CatalogPageComponent} from '@features/catalog/pages/catalog-page/catalog-page.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('@dashboard/dashboard.module').then(
      m => m.DashboardModule
    )
  },
  {
    path: '',
    component: CatalogPageComponent
  },
  {
    path: 'shop',
    component: CatalogPageComponent
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];
