import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './_material/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { PanelAdminModule } from './pages/admin/panel-admin/panel-admin.module';
import { RegistryComponent } from './pages/authorization/registry/registry.component';


import { DriverFormContainerComponent } from './pages/authorization/registry/driver-form-container/driver-form-container.component';


import { ServerErrorsInterceptor } from './_service/server-errors.interceptor';
import { AuthorizationModule } from './pages/authorization/authorization.module';
import { LoginComponent } from './pages/authorization/login/login.component';

import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';

export function tokenGetter() {
  const tk = sessionStorage.getItem(environment.TOKEN_NAME);
  const token = tk != null ? tk : '';
  return token;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EcoFabSpeedDialModule,
    MaterialModule,
    FlexLayoutModule,
    PanelAdminModule,
    AuthorizationModule,
    MatSnackBarModule,
    /*JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),*/
    MatFabMenuModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angular-auth-firebase'),
    AngularFirestoreModule,
    AngularFireFunctionsModule


  ],
  providers: [

    {provide: REGION, useValue: 'us-central1'},
    {provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  exports: [
    FlexLayoutModule,


  ],
})
export class AppModule { }
