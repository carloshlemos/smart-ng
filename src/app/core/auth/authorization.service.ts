import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { action, arrayToggle } from '@datorama/akita';
import { OAuthService } from 'angular-oauth2-oidc';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import authzRequest from '../../../assets/data/request.json';
import { environment } from '../../../environments/environment';
import { AuthZ } from '../auth/auth.model';
import { AuthStore } from './state/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private authz: AuthZ = authzRequest;

  constructor(private oauthService: OAuthService,
    private httpClient: HttpClient,
    private authStore: AuthStore,
    private router: Router) { }

  preAuthorize(url: string): Observable<boolean> {
    this.authz.Request.Action.Attribute = [{ AttributeId: authzRequest.Request.Action.Attribute[0].AttributeId, Value: "validarRota" }];
    this.authz.Request.Resource.Attribute = [{ AttributeId: authzRequest.Request.Resource.Attribute[0].AttributeId, Value: url }];
    this.authz.Request.AccessSubject.Attribute = [{ AttributeId: authzRequest.Request.AccessSubject.Attribute[0].AttributeId, Value: this.oauthService.getIdentityClaims()['sub'] }];

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let loadRolesUser = this.httpClient.get(`${environment.apiPortalRS}/acessos-usuario?login=${this.oauthService.getIdentityClaims()['sub']}&sistema=${environment.idSistemaPortal}`)

    forkJoin([loadRolesUser]).subscribe(results => {
      var roles = Object.keys(results[0]).map(function (actionIDIndex) {
        let action = results[0][actionIDIndex];
        return action.um_attr_value;
      });
      this.authStore._setState(state => ({ permissions: roles }))
    });

    return this.httpClient.post(`${environment.authorizationUrl}/pdp`, this.authz, httpOptions)
      .pipe(
        map((response: JSON) => {
          if (response['Response'][0].Decision.includes("Permit")) {
            return true;
          } else {
            this.router.navigateByUrl(`/403`);
            return false;
          }
        }));
  }
}
