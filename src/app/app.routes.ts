import { Routes } from '@angular/router';
import {CatalogPageComponent} from '@features/catalog/pages/catalog-page/catalog-page.component';
import {AuthPageComponent} from '@features/auth/pages/auth-page.component';

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
