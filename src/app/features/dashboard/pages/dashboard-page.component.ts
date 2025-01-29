import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '@dashboard/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styles: ``
})
export class DashboardPageComponent {

}
