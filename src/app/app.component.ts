import {Component, OnDestroy, Renderer2} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingComponent} from '@shared/components/loading/loading.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {Observable, Subscription} from 'rxjs';
import {LoadingService} from '@core/services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnDestroy {
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
