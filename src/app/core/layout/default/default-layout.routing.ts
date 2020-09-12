import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout.component';
import { DefaultHomeComponent } from '../../page/default-home/default-home.component';
import { LoginComponent } from '../../page/login/login.component';
import { RegisterComponent } from '../../page/register/register.component';
import { ProductShowComponent } from '../../../feature/product-show/product-show.component';
import { BucketShowComponent } from 'src/app/feature/bucket-show/bucket-show.component';
import { HandleCommandComponent } from 'src/app/feature/handle-command/handle-command.component';
import { ProfilViewComponent } from 'src/app/feature/profil-view/profil-view.component';
import { AuthGuard } from '../../../shared/guard/auth.guard';


export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: DefaultHomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'product/:id',
        component: ProductShowComponent
      },
      {
        path: 'bucket',
        canActivate: [AuthGuard],
        component: BucketShowComponent
      },
      {
        path: 'command',
        canActivate: [AuthGuard],
        component: HandleCommandComponent
      },
      {
        path: 'profil',
        canActivate: [AuthGuard],
        component: ProfilViewComponent
      }
    ]
  },
];

