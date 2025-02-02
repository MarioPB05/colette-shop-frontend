import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardPageComponent} from '@dashboard/pages/dashboard-page.component';
import {StatsPageComponent} from '@dashboard/pages/stats-page/stats-page.component';
import {BrawlersPageComponent} from '@dashboard/pages/brawlers-page/brawlers-page.component';
import {UserPageComponent} from '@dashboard/pages/user-page/user-page.component';
import {OrderPageComponent} from '@dashboard/pages/order-page/order-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: 'stats',
        component: StatsPageComponent
      },
      {
        path: 'brawlers',
        component: BrawlersPageComponent
      },
      {
        path: 'users',
        component: UserPageComponent
      },
      {
        path: 'orders',
        component: OrderPageComponent
      },
      {
        path: '',
        redirectTo: 'stats',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutesModule { }
