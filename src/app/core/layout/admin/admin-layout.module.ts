import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutComponent } from './admin-layout.component';
import { AngularMaterialModule } from '../../../shared/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminHomeComponent } from '../../page/admin-home/admin-home.component';

import { routes } from './admin-layout.routing';
import { RouterModule } from '@angular/router';
import { AdminFooterComponent } from '../../navigation/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from '../../navigation/admin-header/admin-header.component';
import { ProductCreateComponent } from '../../../feature/admin-product/create/product-create.component';
import { ProductEditComponent } from '../../../feature/admin-product/edit/product-edit.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHomeComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    ProductCreateComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminLayoutModule { }
