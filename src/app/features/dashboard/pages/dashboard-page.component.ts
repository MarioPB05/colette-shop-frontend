import {Component, OnDestroy, Renderer2} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from '@dashboard/components/sidebar/sidebar.component';
import {Card} from "primeng/card";
import {Observable, Subscription} from 'rxjs';
import {LoadingService} from '@core/services/loading.service';
import {SpeedDial} from 'primeng/speeddial';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {Toast} from 'primeng/toast';

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
    RouterLink,
    Toast,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnDestroy {
  loading$: Observable<boolean>;
  private subscription!: Subscription;

  items: MenuItem[] = DashboardMenuItems;

  constructor(private loadingService: LoadingService, private renderer: Renderer2) {
    this.loading$ = this.loadingService.loading$;
    this.subscription = this.loading$.subscribe((isLoading) => {
      if (isLoading) {
        this.renderer.addClass(document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  getSpeedDialButtonSeverity(route: string): Button["severity"] {
    const currentRoute = window.location.pathname;
    return currentRoute === route ? 'primary' : 'secondary';
  }

}
