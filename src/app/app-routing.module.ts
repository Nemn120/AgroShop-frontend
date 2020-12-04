import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/admin/panel-admin/welcome/welcome.component';

const routes: Routes = [

  {
    path: '', component: WelcomeComponent, children: [
  {
    path: 'panel', loadChildren: () => import('./pages/admin/panel-admin/panel-admin.module').then(m => m.PanelAdminModule)
  },
  {
    path: 'company', loadChildren: () => import('./pages/admin/company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'product', loadChildren: () => import('./pages/admin/product/product.module').then(m => m.ProductModule),

  },
  { path: 'vehicle', loadChildren: () => import('./pages/admin/vehicle/vehicle.module').then(m => m.VehicleModule)
  },
  { path: 'postulation', loadChildren: () => import('./pages/admin/postulation/postulation.module').then(m => m.PostulationModule)
  },
  { path: 'order', loadChildren: () => import('./pages/admin/order/order.module').then(m => m.OrderModule)
  },
  { path: 'driver', loadChildren: () => import('./pages/admin/driver-panel/driver-panel.module').then(m => m.DriverPanelModule)
  }
  ]},
  {
    path: 'auth', loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },

  { path: '**', pathMatch: 'full', redirectTo: '/driver/list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
