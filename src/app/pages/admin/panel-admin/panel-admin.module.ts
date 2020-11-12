
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

import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';
const routes: Routes = [
  {
    path: '', component: WelcomeComponent,
  }
];


@NgModule({
  declarations: [NavbarPanelComponent, SidebarPanelComponent, WelcomeComponent,UserProfileComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    NgMaterialMultilevelMenuModule,
    OrderModule
  ],
  exports:[
    WelcomeComponent
  ]
})
export class PanelAdminModule { }
