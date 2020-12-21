import { Injectable } from '@angular/core';
import { arrayToggle } from '@datorama/akita';
import { AuthStore, Permissions } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore) { }

  updatePermission() {
    this.authStore._setState(state => ({ permissions: arrayToggle(state.permissions, Permissions.WRITE) }))
  }
}
