import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {map, Observable} from 'rxjs';
import {MessageService} from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const router = inject(Router);

  const expectedRole = route.data?.['role'] as 'authenticated' | 'admin' | 'user';

  let authCheck$: Observable<boolean>;

  switch (expectedRole) {
    case 'admin':
      authCheck$ = authService.isAdministrator();
      break;
    case 'user':
      authCheck$ = authService.isUser();
      break;
    default:
      authCheck$ = authService.isAuthenticated();
  }

  return authCheck$.pipe(
    map((isValid) => {
      if (!isValid) {
        router.navigate(['/auth']).then(() => {
          messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Tu sesión no es válida'
          });
        });
        return false;
      }
      return true;
    })
  );
};
