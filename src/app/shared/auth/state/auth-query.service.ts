import { Injectable } from '@angular/core';
import { Query, coerceArray } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore) {
    super(store);
  }

  hasPermission(permissions: String[] | String): Observable<boolean> {
    const asArray = coerceArray(permissions);

    return this.select(state => state.permissions).pipe(
      map(userPermissions =>
        asArray.every(current => userPermissions.includes(current))
      )
    );
  }
}
