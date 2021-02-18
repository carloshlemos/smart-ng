import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: environment.sso.serverUrl.concat(environment.sso.issuer),

    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: environment.sso.clientId,

    redirectUri: environment.sso.redirectUri,
    silentRefreshRedirectUri: `${environment.sso.serverUrl}/silent-refresh.html`,
    postLogoutRedirectUri: environment.sso.redirectUri,

    // Specify whether to skip the validation of the issuer in the discovery document.
    // Normally, the discovey document's url starts with the url of the issuer.
    skipIssuerCheck: true,

    // Specify whether every endpoint provided by the discovery document
    // has to start with the issuer's url defined above
    strictDiscoveryDocumentValidation: false,

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    // Use either 'code' for code flow (recommended) or '' for implicit flow
    responseType: environment.sso.responseType,

    // Set to true to use pure code flow without PKCE (not recommended)
    disablePKCE: false,

    // Set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    scope: environment.sso.scope,

    //silentRefreshTimeout: 5000, // For faster testing
    //timeoutFactor: 0.25, // For faster testing
    silentRefreshTimeout: 50000, // For faster testing
    timeoutFactor: 0.75, // For faster testing

    sessionChecksEnabled: true,

    // Specify whether additional debug information should
    // be shown at the console.
    // Also requires enabling "Verbose" level in devtools
    showDebugInformation: environment.sso.showDebugInformation,

    // Specify whether to clear the hash fragment after logging in.
    // See https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040
    clearHashAfterLogin: false,
};
