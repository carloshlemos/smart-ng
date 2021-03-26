# Smart-Ng

### Visão Geral

Sistema Modelo de ARquitetura e Tecnologias utilizando **Autenticação** e **Autorização** baseado em **OAuth2** utilizando **WSO2 Identity Server**.

### Implementação

Como versão inicial, escrevemos um exemplo de trabalho para este caso de uso. Este exemplo comunica-se com o **[WSO2 Identity Server - PDP](https://miro.medium.com/max/700/0*aHqWFOnd9p4te4W0.png)** para realizar à autorização.

#### Uso

1. Adicionar as libs:
   ````
   npm i angular-oauth2-oidc --save
   npm i angular-oauth2-oidc-jwks --save
   npm i @datorama/akita --save
   ````
2. O arquivo `oauth2.config.ts` possui o arquivo de configuração da lib **angular-oauth2-oidc** de acordo com a documentação https://manfredsteyer.github.io/angular-oauth2-oidc/docs/.

3. A lib Akita é utilizada para controle de estado apoiando a **diretiva** **hasPermission** (https://www.npmjs.com/package/@datorama/akita).

2. No arquivo `enviroment.ts` informar os atributos abaixo:
   Exemplo do conteúdo do arquivo `environment.ts`:
   ````
   apiUrl: 'http://localhost:8080/smart-api/api',
   authorizationUrl: 'https://localhost:9443/api/identity/entitlement/decision',
   apiPortalRS: 'http://localhost:8080/portal-api/api',
   idSistemaPortal: 'SMART-NG',
   sso: {
        clientId: 'v2r2nAaJO5rIS0aM9kreTvWE5zYa',
        serverUrl: 'https://localhost:9443',
        issuer: '/oauth2/oidcdiscovery',
        redirectUri: window.location.origin,
        scope: 'openid',
        showDebugInformation: true,
        responseType: 'code',
   }
   ````

3. No arquivo `authorization.service.ts` está o mecanismo que valida a autorização a determinada **rota**, utilizando com o `auth.guard.service.ts` para guarda.

4. A **diretiva** criada pelo arquivo `has-permission.directive.ts` auxilia na renderaização de componentes, ou não, baseado nas **roles** de perfis do usuário. Abaixo exemplo de utilização:
    ````
    <button *hasPermission="'Menu.C'" type="button" (click)="search()">Search</button>
    ````
    Podendo ser utilizada também com array de **roles**, exemplo:
    ````
    <button *hasPermission="['Menu.C', 'Menu.A']" type="button" (click)="search()">Search</button>
    ````