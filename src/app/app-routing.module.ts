import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'panel', loadChildren: () => import('./pages/admin/panel-admin/panel-admin.module').then(m => m.PanelAdminModule)
  },
  {
    path: 'company', loadChildren: () => import('./pages/admin/company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'product', loadChildren: () => import('./pages/admin/product/product.module').then(m => m.ProductModule)
  },
  { path: 'driver', loadChildren: () => import('./pages/admin/driver/driver.module').then(m => m.DriverModule)},

  { path: '**', pathMatch: 'full', redirectTo: '/driver' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
