import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardPageComponent} from '@dashboard/pages/dashboard-page.component';
import {StatsPageComponent} from '@dashboard/pages/stats-page/stats-page.component';
import {BrawlersPageComponent} from '@dashboard/pages/brawlers-page/brawlers-page.component';
import {BoxesPageComponent} from '@dashboard/pages/boxes-page/boxes-page.component';

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
        path: 'boxes',
        component: BoxesPageComponent
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
