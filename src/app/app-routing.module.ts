import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'panel', loadChildren: () => import('./pages/admin/panel-admin/panel-admin.module').then(m => m.PanelAdminModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/panel' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
