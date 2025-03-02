import {Component, HostBinding} from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {BadgeModule} from 'primeng/badge';
import {RippleModule} from 'primeng/ripple';
import {AvatarModule} from 'primeng/avatar';
import {MenuItem} from 'primeng/api';
import {AsyncPipe, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DashboardMenuItems} from '@dashboard/pages/dashboard-page.component';
import {UserDetailsService} from '@shared/services/user-details.service';
import {TieredMenu} from 'primeng/tieredmenu';
import {AuthService} from '@core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, NgIf, RouterLink, RouterLinkActive, AsyncPipe, TieredMenu],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  @HostBinding('class') class = 'h-screen xl:flex py-10 fixed hidden';
  items: MenuItem[] = DashboardMenuItems;
  userItems: MenuItem[] = [
    {
      label: 'Tienda',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: '/'
    },
    {
      label: 'Colección',
      icon: 'pi pi-fw pi-star',
      routerLink: '/collection'
    },
    {
      label: 'Inventario',
      icon: 'pi pi-fw pi-box',
      routerLink: '/inventory'
    },
    {
      label: 'Perfil',
      icon: 'pi pi-fw pi-user',
      routerLink: '/user/details'
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-fw pi-power-off',
      command: () => this.authService.logout()
    }
  ];

  constructor(protected userDetailsService: UserDetailsService, private authService: AuthService) {}
}
