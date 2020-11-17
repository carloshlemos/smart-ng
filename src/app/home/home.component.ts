import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  template: `
   <div *ngIf="givenName" class="col-12 mt-2">
      <button (click)="logout()" class="btn btn-sm btn-outline-primary float-right">Logout</button>
      <h2>Welcome, {{givenName}}!</h2>
      <p><a routerLink="/menu" routerLinkActive="active">Menu</a></p>
    </div>

    <div class="card mt-2" *ngIf="!givenName" style="text-align: center">
      <div class="card-body">
        <button class="btn btn-primary" (click)="login()">Login</button>
      </div>
    </div>`
})
export class HomeComponent implements OnInit {

  // Set this to true to revoke access and refresh tokens on logout
  public readonly revokeTokenOnLogout = true;

  constructor(private oauthService: OAuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    if (this.revokeTokenOnLogout) {
      const token = this.oauthService.getAccessToken(); // Get token before logging out which clears the token  
      this.revokeToken(token);
    }

    this.oauthService.logOut();
  }

  // Revoke access token
  // Notice that WSO2 IS 5.8.0 automatically revokes the associated refresh token
  // (check response headers of access token revocation) which looks very reasonable.
  private revokeToken(token: string) {
    console.log('Revoking token = ' + token);
    const revocationUrl = this.oauthService.tokenEndpoint.replace(/\/token$/, '/revoke');
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('token', token);
    urlSearchParams.append('token_type_hint', 'access_token');
    urlSearchParams.append('client_id', this.oauthService.clientId);
    this.http.post(revocationUrl, urlSearchParams.toString(), { headers })
      .subscribe(result => {
        console.log('Access token and related refresh token (if any) have been successfully revoked');
      }, (error) => {
        console.error('Something went wrong on token revocation');
      });
  }

  get givenName() {
    const token = this.oauthService.getAccessToken();
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['sub'];
  }
}
