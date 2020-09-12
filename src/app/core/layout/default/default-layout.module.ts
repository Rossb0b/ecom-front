import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultLayoutComponent } from './default-layout.component';
import { AngularMaterialModule } from '../../../shared/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DefaultHomeComponent } from '../../page/default-home/default-home.component';
import { CreatePaymentComponent } from '../../../shared/component/_dialog/create-payment/create-payment.component';

import { routes } from './default-layout.routing';
import { RouterModule } from '@angular/router';

import { ClickOutsideModule } from 'ng-click-outside';
import { NgxStripeModule } from 'ngx-stripe';

import { DefaultFooterComponent } from '../../navigation/default-footer/default-footer.component';
import { DefaultHeaderComponent } from '../../navigation/default-header/default-header.component';
import { LoginComponent } from '../../page/login/login.component';
import { RegisterComponent } from '../../page/register/register.component';
import { ProductShowComponent } from 'src/app/feature/product-show/product-show.component';
import { BucketShowComponent } from 'src/app/feature/bucket-show/bucket-show.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HandleCommandComponent } from 'src/app/feature/handle-command/handle-command.component';
import { CreateBillingAddressComponent } from 'src/app/shared/component/_dialog/create-billingAddress/create-billingAddress.component';
import { CreateShippingAddressComponent } from 'src/app/shared/component/_dialog/create-shippingAddress/create-shippingAddress.component';
import { EditAddressComponent } from 'src/app/shared/component/_dialog/edit-address/edit-address.component';
import { ProfilViewComponent } from 'src/app/feature/profil-view/profil-view.component';


@NgModule({
  declarations: [
    DefaultLayoutComponent,
    DefaultHomeComponent,
    CreatePaymentComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductShowComponent,
    BucketShowComponent,
    HandleCommandComponent,
    CreateBillingAddressComponent,
    CreateShippingAddressComponent,
    EditAddressComponent,
    CreatePaymentComponent,
    ProfilViewComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ClickOutsideModule,
    NgxStripeModule.forRoot('pk_test_51H3ja9IHs9TQroDdqLSbDRzx1NQpITCEOZ11Gx14296SZmCDg6yosF6U3sBumi8DCl03055hYTDYDpA9G4LXBkfi00Qot7ldQl'),
    RouterModule.forChild(routes),
  ],
  entryComponents: [
    CreateBillingAddressComponent,
    CreateShippingAddressComponent,
    CreatePaymentComponent,
    EditAddressComponent,
  ],
})
export class DefaultLayoutModule { }
