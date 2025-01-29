import {NgModule} from '@angular/core';
import {DashboardRoutesModule} from '@dashboard/dashboard.routes';
import {DashboardPageComponent} from '@dashboard/pages/dashboard-page.component';
import {StatsPageComponent} from '@dashboard/pages/stats-page/stats-page.component';

@NgModule({
  declarations: [],
  imports: [
    DashboardPageComponent,
    StatsPageComponent,
    DashboardRoutesModule,
  ]
})
export class DashboardModule { }
