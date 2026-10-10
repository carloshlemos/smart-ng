import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sensitive-callback',
  template: '<p>Validando credenciais...</p>'
})
export class SensitiveCallbackComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const verifier = localStorage.getItem('pkce_verifier');

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', `${environment.sso.clientId}`)
      .set('code', code)
      .set('redirect_uri', window.location.origin + '/sensitive-callback')
      .set('code_verifier', verifier);

    this.http.post(`${environment.sso.serverUrl}/oauth2/token`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).subscribe(res => {
      console.log('Token recebido:', res);
      alert('Validação sensível concluída com sucesso!');
      window.close(); // fecha o popup
    }, error => {
      console.error('Erro ao validar token:', error);
      alert('Erro ao validar. Ação não autorizada.');
      window.close();
    });
  }

}
