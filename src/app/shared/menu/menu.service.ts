import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private oauthService: OAuthService, private http: HttpClient) { }

  search(): Observable<any> {
    return this.http.get<Menu[]>(`${environment.apiUrl}/menu`).pipe(
      map((menus: Menu[]) => menus));
  }
}

export class Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;

  constructor(obj?: any) {
    this.id = obj && Number(obj.id) || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.price = obj && obj.price || null;
    this.image = obj && obj.image || null;
  }
}
