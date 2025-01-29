import {Component, HostBinding, OnInit} from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {BadgeModule} from 'primeng/badge';
import {RippleModule} from 'primeng/ripple';
import {AvatarModule} from 'primeng/avatar';
import {MenuItem} from 'primeng/api';
import {NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit {
  @HostBinding('class') class = 'h-screen flex py-10';
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
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
  }
}
