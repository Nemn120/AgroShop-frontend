import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './_material/material.module';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { PanelAdminModule } from './pages/admin/panel-admin/panel-admin.module';
import { ServerErrorsInterceptor } from './_service/server-errors.interceptor';
import { AuthorizationModule } from './pages/authorization/authorization.module';
import { FormsModule } from '@angular/forms';


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
    MatFabMenuModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  exports: [FlexLayoutModule]
})

export class AppModule{}
