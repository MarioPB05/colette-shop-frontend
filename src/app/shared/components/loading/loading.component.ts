import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {LoadingService} from '@core/services/loading.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [
    AsyncPipe
  ],
  templateUrl: './loading.component.html',
  standalone: true
})
export class LoadingComponent implements OnInit {
  @HostBinding('class') class = 'fixed z-50 bg-brawl-blue overflow-hidden';

  loading$: Observable<boolean>;

  @Input()
  detectRouteTransitions = false;

  constructor(
    private loadingService: LoadingService,
    private router: Router) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }

}
