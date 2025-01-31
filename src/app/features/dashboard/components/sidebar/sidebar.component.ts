import {Component, HostBinding, OnInit} from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {BadgeModule} from 'primeng/badge';
import {RippleModule} from 'primeng/ripple';
import {AvatarModule} from 'primeng/avatar';
import {MenuItem} from 'primeng/api';
import {NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DashboardMenuItems} from '@dashboard/pages/dashboard-page.component';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  @HostBinding('class') class = 'h-screen xl:flex py-10 fixed hidden';
  items: MenuItem[] = DashboardMenuItems;
}
