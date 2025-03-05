import {NgModule} from '@angular/core';
import {DashboardRoutesModule} from '@dashboard/dashboard.routes';
import {DashboardPageComponent} from '@dashboard/pages/dashboard-page.component';
import {StatsPageComponent} from '@dashboard/pages/stats-page/stats-page.component';
import {BoxesPageComponent} from '@dashboard/pages/boxes-page/boxes-page.component';
import {BrawlersPageComponent} from '@dashboard/pages/brawlers-page/brawlers-page.component';
import {UserPageComponent} from '@dashboard/pages/users-page/user-page.component';
import {OrderPageComponent} from '@dashboard/pages/orders-page/order-page.component';
import {BoxEditorPageComponent} from '@dashboard/pages/box-editor-page/box-editor-page.component';
import {UserDetailsPageComponent} from '@dashboard/pages/user-details-page/user-details-page.component';
import {OrderDetailsPageComponent} from '@dashboard/pages/order-details-page/order-details-page.component';
import {FaviconService} from '@core/services/favicon.service';

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
    UserDetailsPageComponent,
    OrderDetailsPageComponent,
    DashboardRoutesModule,
  ]
})
export class DashboardModule {

  constructor(private faviconService: FaviconService) {
    this.faviconService.changeFavicon('/images/user-details-icons/brawl-icon.png');
  }

}
