import {Component, OnDestroy, Renderer2} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '@dashboard/components/sidebar/sidebar.component';
import {Card} from "primeng/card";
import {Observable, Subscription} from 'rxjs';
import {LoadingService} from '@core/services/loading.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterOutlet,
    SidebarComponent,
    Card,
  ],
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnDestroy {
  loading$: Observable<boolean>;
  private subscription!: Subscription;

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

}
