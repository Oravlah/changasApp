import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el token no es válido, forzar logout y redirigir al login
  if (!authService.validateToken()) {
    authService.logout();
    return of(router.createUrlTree(['/login']));
  }

  // Si el token es válido, verificar si está logueado activamente
  return authService.isUserLogin.pipe(
    map(isLoggedIn => isLoggedIn ? true : router.createUrlTree(['/login']))
  );
};
