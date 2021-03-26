// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '/smart-api',
  authorizationUrl: 'https://ssodesenv.go.gov.br:443/api/identity/entitlement/decision',
  apiPortalRS: '/acesso-usuario-api',
  idSistemaPortal: 'SMART-NG',
  sso: {
    clientId: '_om5Y7gaI8uVVKldiqe50blcZG0a',
    serverUrl: 'https://ssodesenv.go.gov.br',
    issuer: '/oauth2/oidcdiscovery',
    redirectUri: window.location.origin,
    scope: 'openid email profile',
    showDebugInformation: true,
    responseType: 'code',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
