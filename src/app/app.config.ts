import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {BrawlTheme} from './brawl.theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: BrawlTheme,
        options: {
          darkModeSelector: 'none'
        }
      }
    })
  ]
};
