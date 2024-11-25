import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './_service/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let estaLlogeado = inject(AuthenticationService).isUserLoggedIn();
  const isAdmin = inject(AuthenticationService).isAdmin();
  const url = route.routeConfig?.path;

  if (!estaLlogeado) {
    console.log('No esta loggeado');
    return inject(Router).navigate(['/login']);
  }

  if (
    (url === 'product' || url === 'category' || url?.includes('product/')) &&
    !isAdmin
  ) {
    return inject(Router).navigate(['']);
  }

  return true;
};
