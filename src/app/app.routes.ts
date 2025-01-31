import { Routes } from '@angular/router';
import {ShopPageComponent} from '@features/shop/pages/shop-page/shop-page.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('@dashboard/dashboard.module').then(
      m => m.DashboardModule
    )
  },
  {
    path: 'shop',
    component: ShopPageComponent
  }
];
