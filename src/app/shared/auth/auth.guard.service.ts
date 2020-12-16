import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthorizationService } from '../auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router, private authorization: AuthorizationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.oauthService.hasValidIdToken()) {
      return this.authorization.preAuthorize(state.url).pipe(map((response: boolean) => {
        if (response) {
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }),catchError((error) => {
        this.router.navigate(['/home']);
        console.log("Erro ao tentar verificar Authorização!!");
        return of(false);
    }));      
    }
  }
}
