import { HttpClientModule } from '@angular/common/http';
import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './shared';
import { HasPermissionDirective } from './shared/auth/has-permission.directive';

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    MenuComponent,
    HasPermissionDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: [environment.apiUrl],
          sendAccessToken: true
      }
  })
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
