import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private authz = {};

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  preAuthorize(url: string): Observable<boolean> {
    this.montaRequest(url);
    return this.httpClient.post(`${environment.authorizationUrl}/pdp`, this.authz, { observe: 'body' })
      .pipe(
        map((response: JSON) => {
          if (response['Response'][0].Decision.includes("Permit")) {
            return true;
          } else {
            return false;
          }
        }));
  }

  private montaRequest(url: string) {
    this.authz = {
      "Request": {
        "Action": {
          "Attribute": [{
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "BaixaBem.C"
          }
          ]
        },
        "Resource": {
          "Attribute": [{
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:resource:resource-id",
            "Value": url
          }
          ]
        },
        "AccessSubject": {
          "Attribute": [{
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:subject:subject-id",
            "Value": this.givenName()
          }
          ]
        }
      }
    }
  }

  private givenName() {
    const token = this.oauthService.getAccessToken();
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['sub'];
  }
}
