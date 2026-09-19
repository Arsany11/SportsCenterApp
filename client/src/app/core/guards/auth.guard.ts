import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { inject } from '@angular/core';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const accountService =  inject(AccountService);
  const router = inject(Router);
  if(accountService.isAuthenticated()){
    return true;
  }else {
    // store the attempted URL for redirecting
    accountService.redirectUrl = state.url;
    // navigate to the login page
    return router.createUrlTree(['/account/login'],{
      queryParams: {returnUrl: state.url}
    });
  }
};
