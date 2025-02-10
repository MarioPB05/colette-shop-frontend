import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {loadingInterceptor} from '@core/interceptors/loading.interceptor';
import {BrawlTheme} from './brawl.theme';
import {authInterceptor} from '@interceptors/auth.interceptor';
import {ConfirmationService, MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: BrawlTheme,
        options: {
          darkModeSelector: 'none'
        }
      }
    }),
    ConfirmationService,
    MessageService
  ]
};
