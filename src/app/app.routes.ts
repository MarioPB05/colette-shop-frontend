import { Routes } from '@angular/router';
import {CatalogPageComponent} from '@features/catalog/pages/catalog-page/catalog-page.component';
import {BoxDetailPageComponent} from '@features/box-detail/pages/box-detail-page/box-detail-page.component';

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
    path: 'box/:id',
    component: BoxDetailPageComponent
  }
];
