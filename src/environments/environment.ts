// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8090/smart-api/api',
  authorizationUrl: 'https://localhost:9449/api/identity/entitlement/decision',
  apiPortalRS: 'https://localhost:8243/portal-api/1.0.0/api',
  idSistemaPortal: 'SMART-NG',
  sso: {
    clientId: '7CzxYs06l2Dfs9PaPJYc_riA2Yca',
    serverUrl: 'https://localhost:9449',
    issuer: '/oauth2/oidcdiscovery',
    redirectUri: window.location.origin,
    scope: 'openid email phone profile',
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
