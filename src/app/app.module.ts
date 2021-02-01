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
import { ServerErrorsInterceptor } from './_service/server-errors.interceptor';
import { AuthorizationModule } from './pages/authorization/authorization.module';
import { MaterialModule } from './_material/material.module';


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
    PanelAdminModule,
    AuthorizationModule,
    MatSnackBarModule,
    MatFabMenuModule,
    FormsModule
   
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
