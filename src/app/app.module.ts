import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelAdminModule } from './pages/admin/panel-admin/panel-admin.module';
import { AuthorizationModule } from './pages/authorization/authorization.module';
import { MaterialModule } from './_material/material.module';
import { ServerErrorsInterceptor } from './_service/server-errors.interceptor';

export function tokenGetter() {
  const tk = sessionStorage.getItem(environment.TOKEN_NAME);
  const token = tk != null ? tk : '';
  return token;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EcoFabSpeedDialModule,
    MaterialModule,
    FlexLayoutModule,
<<<<<<< HEAD
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
=======
    PanelAdminModule,
    AuthorizationModule,
    MatSnackBarModule,
    MatFabMenuModule,
<<<<<<< HEAD
    FormsModule,
>>>>>>> 1df15fce4b281e0d5ec25afeffe54412e2a88dcb
=======
    FormsModule
>>>>>>> 2930b927f1b795bbce400c4114c74e0cb62e9170
  ],

  providers: [
    FormsModule,
    MatFabMenuModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
  exports: [FlexLayoutModule],
})
export class AppModule {}
