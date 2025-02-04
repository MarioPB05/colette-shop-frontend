import {NgModule} from '@angular/core';
import {DashboardRoutesModule} from '@dashboard/dashboard.routes';
import {DashboardPageComponent} from '@dashboard/pages/dashboard-page.component';
import {StatsPageComponent} from '@dashboard/pages/stats-page/stats-page.component';
import {BoxesPageComponent} from '@dashboard/pages/boxes-page/boxes-page.component';
import {BrawlersPageComponent} from '@dashboard/pages/brawlers-page/brawlers-page.component';
import {UserPageComponent} from '@dashboard/pages/users-page/user-page.component';
import {OrderPageComponent} from '@dashboard/pages/orders-page/order-page.component';
import {BoxEditorPageComponent} from '@dashboard/pages/box-editor-page/box-editor-page.component';

@NgModule({
  declarations: [],
  imports: [
    DashboardPageComponent,
    StatsPageComponent,
    BrawlersPageComponent,
    UserPageComponent,
    OrderPageComponent,
    BoxesPageComponent,
    BoxEditorPageComponent,
    DashboardRoutesModule,
  ]
})
export class DashboardModule { }
