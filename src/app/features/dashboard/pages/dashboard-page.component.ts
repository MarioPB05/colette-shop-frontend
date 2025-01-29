import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '@dashboard/components/sidebar/sidebar.component';
import {Card} from "primeng/card";

@Component({
  selector: 'app-dashboard-page',
    imports: [
        RouterOutlet,
        SidebarComponent,
        Card
    ],
  templateUrl: './dashboard-page.component.html',
  styles: ``
})
export class DashboardPageComponent {

}
