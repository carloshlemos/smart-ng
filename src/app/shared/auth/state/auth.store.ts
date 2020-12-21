import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface AuthState {
  permissions: String[];
}

export function createInitialState(): AuthState {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  return this.httpClient.post(`${environment.apiPortalRS}/acessos-rs`, httpOptions).pipe(
    map((response: String[]) => {
      return response;
    }), catchError((error) => {
      console.log("Erro ao tentar carregar Unidades de Acesso!!");
      return [];
    })
  );
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}
