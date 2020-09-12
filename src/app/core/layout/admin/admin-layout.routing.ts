import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminHomeComponent } from '../../page/admin-home/admin-home.component';
import { ProductCreateComponent } from 'src/app/feature/admin-product/create/product-create.component';
import { AuthGuard } from '../../../shared/guard/auth.guard';
import { RoleGuard } from '../../../shared/guard/role.guard';
import { ProductEditComponent } from 'src/app/feature/admin-product/edit/product-edit.component';


export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard, RoleGuard],
        component: AdminHomeComponent,
      },
      {
        path: 'createProduct',
        canActivate: [AuthGuard, RoleGuard],
        component: ProductCreateComponent,
      },
      {
        path: 'editProduct/:id',
        canActivate: [AuthGuard, RoleGuard],
        component: ProductEditComponent,
      }
    ]
  },
];

