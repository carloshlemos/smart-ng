import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './shared/oauth2.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-ng';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);

    /** enable below validation only if jwks object is defined as part of oauthconfig obj */
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setStorage(sessionStorage);

    /** commented below because below resource is protected by some identity server ex: wso2 */
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
