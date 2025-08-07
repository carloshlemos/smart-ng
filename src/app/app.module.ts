import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { ClienteAddComponent } from './cliente/cliente-add/cliente-add.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteEditComponent } from './cliente/cliente-edit/cliente-edit.component';
import { P403Component } from './error/403.component';
import { P404Component } from './error/404.component';
import { AuthGuard } from './core/auth/auth.guard.service';
import { HasPermissionDirective } from './core/auth/has-permission.directive';
import { HomeComponent } from './home/home.component';
import {SensitiveCallbackComponent} from './sensitive-callback/sensitive-callback';

const appRoutes: Routes = [
  { path: 'cliente', component: ClienteListComponent, canActivate: [AuthGuard] },
  { path: 'add-cliente', component: ClienteAddComponent },
  { path: 'edit-cliente', component: ClienteEditComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sensitive-callback', component: SensitiveCallbackComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '403', component: P403Component, data: { title: 'Forbidden!!' } },
  { path: '**', component: P404Component }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteListComponent,
    HasPermissionDirective,
    ClienteAddComponent,
    ClienteEditComponent,
    SensitiveCallbackComponent,
    P403Component,
    P404Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiUrl, environment.apiPortalRS],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
