export const environment = {
    production: false,
    profile: 'desenv',
    idSistemaPortal: 'SMART-NG',
    apiUrl: 'http://localhost:8080/smart-api/api',
    authorizationUrl: 'https://ssodesenv.go.gov.br/api/identity/entitlement/decision',
    apiPortalRS: 'https://apidesenv.go.gov.br:443/acessousuario/1.0.0/api',
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