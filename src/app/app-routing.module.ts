import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guard/auth.guard';
import { RoleGuard } from './shared/guard/role.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/layout/default/default-layout.module').then(m => m.DefaultLayoutModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () => import('./core/layout/admin/admin-layout.module').then(m => m.AdminLayoutModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuard],
})
export class AppRoutingModule { }
