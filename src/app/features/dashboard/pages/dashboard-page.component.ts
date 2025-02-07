import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from '@dashboard/components/sidebar/sidebar.component';
import {Card} from "primeng/card";
import {SpeedDial} from 'primeng/speeddial';
import {MenuItem} from 'primeng/api';
import {Button} from 'primeng/button';

export const DashboardMenuItems: MenuItem[] = [
  {
    label: 'Estadísticas',
    icon: 'pi pi-fw pi-chart-bar',
    route: '/dashboard/stats'
  },
  {
    label: 'Usuarios',
    icon: 'pi pi-fw pi-users',
    route: '/dashboard/users'
  },
  {
    label: 'Pedidos',
    icon: 'pi pi-fw pi-shopping-bag',
    route: '/dashboard/orders'
  },
  {
    label: 'Cajas',
    icon: 'pi pi-fw pi-box',
    route: '/dashboard/boxes'
  },
  {
    label: 'Brawlers',
    icon: 'pi pi-fw pi-star',
    route: '/dashboard/brawlers'
  }
];

@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterOutlet,
    SidebarComponent,
    Card,
    SpeedDial,
    Button,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {
  items: MenuItem[] = DashboardMenuItems;

  getSpeedDialButtonSeverity(route: string): Button["severity"] {
    const currentRoute = window.location.pathname;
    return currentRoute === route ? 'primary' : 'secondary';
  }
}
