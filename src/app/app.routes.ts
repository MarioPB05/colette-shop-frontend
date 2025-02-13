import { Routes } from '@angular/router';
import {AuthPageComponent} from '@features/auth/pages/auth-page.component';
import {CatalogPageComponent} from '@features/catalog/pages/catalog-page/catalog-page.component';
import {BoxDetailPageComponent} from '@features/box-detail/pages/box-detail-page/box-detail-page.component';
import {authGuard} from '@guards/auth.guard';
import {OpenBoxPageComponent} from '@features/open-box/pages/open-box-page.component';

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
    path: 'box/:id',
    component: BoxDetailPageComponent,
    canActivate: [authGuard],
    data: { role: 'authenticated' }
  },
  {
    path: 'box/:id/open',
    component: OpenBoxPageComponent,
    canActivate: [authGuard],
    data: { role: 'authenticated' }
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];
