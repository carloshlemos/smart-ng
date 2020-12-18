import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthZ } from '../auth/auth.model';
import authzRequest from '../../../assets/data/request.json';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private authz: AuthZ = authzRequest;

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  preAuthorize(url: string): Observable<boolean> {
    this.authz.Request.Action.Attribute = [{ AttributeId: authzRequest.Request.Action.Attribute[0].AttributeId, Value: "validarRota" }];
    this.authz.Request.Resource.Attribute = [{ AttributeId: authzRequest.Request.Resource.Attribute[0].AttributeId, Value: url }];
    this.authz.Request.AccessSubject.Attribute = [{ AttributeId: authzRequest.Request.AccessSubject.Attribute[0].AttributeId, Value: this.oauthService.getIdentityClaims()['sub'] }];

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(`${environment.authorizationUrl}/pdp`, this.authz, httpOptions)
      .pipe(
        map((response: JSON) => {
          if (response['Response'][0].Decision.includes("Permit")) {
            return true;
          } else {
            console.log("Acesso Negado!!!");
            return false;
          }
        }));
  }
}
