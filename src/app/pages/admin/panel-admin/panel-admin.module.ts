
import { NavbarPanelComponent } from './navbar-panel/navbar-panel.component';
import { SidebarPanelComponent } from './sidebar-panel/sidebar-panel.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialModule } from 'src/app/_material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CarDiaLogComponent } from './car-dia-log/car-dia-log.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { DialogoConfirmacionComponent } from 'src/app/_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from 'src/app/_shared/order-detail/order-detail.component';
import { DataClientComponent } from 'src/app/_shared/data-client/data-client.component';
import { DriverPanelModule } from '../driver-panel/driver-panel.module';
const routes: Routes = [
  {
    path: '', component: WelcomeComponent,
  }
];


@NgModule({
  declarations: [NavbarPanelComponent, SidebarPanelComponent, WelcomeComponent,UserProfileComponent, CarDiaLogComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    NgMaterialMultilevelMenuModule,

    SharedModule,
    ReactiveFormsModule,
    NgMaterialMultilevelMenuModule,
    FormsModule,

    DriverPanelModule,

  ],
  exports:[
    RouterModule,
    WelcomeComponent
  ],
  entryComponents:[
    CarDiaLogComponent,DialogoConfirmacionComponent,OrderDetailComponent,DataClientComponent,
  ],
})
export class PanelAdminModule { }
