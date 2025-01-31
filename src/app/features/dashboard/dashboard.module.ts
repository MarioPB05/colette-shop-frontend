import {NgModule} from '@angular/core';
import {DashboardRoutesModule} from '@dashboard/dashboard.routes';
import {DashboardPageComponent} from '@dashboard/pages/dashboard-page.component';
import {StatsPageComponent} from '@dashboard/pages/stats-page/stats-page.component';
import {BrawlersPageComponent} from '@dashboard/pages/brawlers-page/brawlers-page.component';
import {UserPageComponent} from '@dashboard/pages/user-page/user-page.component';
import {OrderPageComponent} from '@dashboard/pages/order-page/order-page.component';

@NgModule({
  declarations: [],
  imports: [
    DashboardPageComponent,
    StatsPageComponent,
    BrawlersPageComponent,
    UserPageComponent,
    OrderPageComponent,
    DashboardRoutesModule,
  ]
})
export class DashboardModule { }
