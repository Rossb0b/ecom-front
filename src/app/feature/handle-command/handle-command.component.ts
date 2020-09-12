import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/service/user/user.service';
import { Scavenger } from '@wishtack/rx-scavenger';
import { MatDialog } from '@angular/material/dialog';
import { CreateBillingAddressComponent } from 'src/app/shared/component/_dialog/create-billingAddress/create-billingAddress.component';
import { CreateShippingAddressComponent } from 'src/app/shared/component/_dialog/create-shippingAddress/create-shippingAddress.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BucketService } from 'src/app/shared/service/bucket/bucket.service';
import { CreatePaymentComponent } from 'src/app/shared/component/_dialog/create-payment/create-payment.component';

@Component({
  selector: 'app-handle-command',
  templateUrl: './handle-command.component.html',
  styleUrls: ['./handle-command.component.sass']
})
export class HandleCommandComponent implements OnInit, OnDestroy {
  loading = false;
  scavenger = new Scavenger(this);
  user;
  bucket;
  command;
  quantity = 0;
  commandTotal = 0;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private bucketService: BucketService,
  ) {}

  /**
   *
   *
   * @memberof HandleCommandComponent
   */
  async ngOnInit() {
    this.buildForm();
    await this.getCurrentUser();
  }

  /**
   *
   *
   * @memberof HandleCommandComponent
   */
  getCurrentUser() {
    try {
      this.userService.getCurrentUserInf().pipe(
        this.scavenger.collect(),
      ).subscribe((user) => {
        this.user = user;
        if (this.user !== null && this.user.bucket !== null) this.bucket = this.user.bucket;
        if (this.user.bucket) {
          for (const product of this.user.bucket?.products) {
            this.quantity += product.volume;
            this.commandTotal += product.volume * product.product.price;
          }
        }
        this.commandTotal = Number((Math.round(this.commandTotal * 100) / 100).toFixed(2));
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof HandleCommandComponent
   */
  buildForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      _id: ['', [Validators.required]],
    });

    this.secondFormGroup = this.formBuilder.group({
      _id: ['', [Validators.required]],
    });
  }

  /**
   *
   *
   * @memberof HandleCommandComponent
   */
  addBillingAddress(): void {
    this.dialog.open(CreateBillingAddressComponent);
  }

  /**
   *
   *
   * @memberof HandleCommandComponent
   */
  addShippingAddress(): void {
    this.dialog.open(CreateShippingAddressComponent);
  }

  /**
   *
   *
   * @param {*} index
   * @memberof HandleCommandComponent
   */
  increaseQuantity(index) {
    for (let i = 0; i < this.user.bucket.products.length; i++) {
      if (i === index) {
        this.user.bucket.products[i].volume += 1;
        this.quantity += 1;
        this.commandTotal = Number((Math.round((this.commandTotal + this.user.bucket.products[i].product.price) * 100) / 100).toFixed(2))
        this.updateBucket();
      }
    }
  }

  /**
   *
   *
   * @param {*} index
   * @memberof HandleCommandComponent
   */
  decreaseQuantity(index) {
    for (let i = 0; i < this.user.bucket.products.length; i++) {
      if (i === index) {
        if (this.user.bucket.products[i].volume > 0) {
          this.user.bucket.products[i].volume -= 1;
          this.quantity -= 1;
          this.commandTotal = Number((Math.round((this.commandTotal - this.user.bucket.products[i].product.price) * 100) / 100).toFixed(2));
          this.updateBucket();
        }
      }
    }
  }

  /**
   *
   *
   * @param {*} index
   * @memberof HandleCommandComponent
   */
  deleteProduct(index) {
    for (let i = 0; i < this.user.bucket.products.length; i++) {
      if (i === index) {
        this.quantity -= this.user.bucket.products[i].volume;
        this.commandTotal = Number((Math.round((this.commandTotal - (this.user.bucket.products[i].product.price * this.user.bucket.products[i].volume)) * 100) / 100).toFixed(2));
        this.user.bucket.products.splice(i, 1);
        this.updateBucket();
      }
    }
  }

  /**
   *
   *
   * @memberof HandleCommandComponent
   */
  async updateBucket() {
    try {
      await this.bucketService.updateBucket(this.user.bucket);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof HandleCommandComponent
   */
  validCommand() {
    this.dialog.open(CreatePaymentComponent, {
      data: {
        shippingAddressId: this.firstFormGroup.controls['_id'].value,
        billingAddressId: this.secondFormGroup.controls['_id'].value,
        bucketId: this.user.bucket._id,
      }
    });
  }

  /**
   *
   *
   * @memberof HandleCommandComponent
   */
  ngOnDestroy() {}

}
