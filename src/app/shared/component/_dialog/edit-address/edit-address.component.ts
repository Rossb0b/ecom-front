import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Scavenger } from '@wishtack/rx-scavenger';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../service/user/user.service'

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.sass']
})
export class EditAddressComponent implements OnInit, OnDestroy {
  form: FormGroup;
  address;
  user;
  scavenger = new Scavenger(this);

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditAddressComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.buildForm();
    }

  /**
   *
   *
   * @memberof EditAddressComponent
   */
  async ngOnInit() {
    await this.getCurrentUser();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof EditAddressComponent
   */
  async getCurrentUser(): Promise<void> {
    try {
      this.userService.getCurrentUserInf().pipe(
        this.scavenger.collect(),
      ).subscribe((userInf) => {
        this.user = userInf;
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof EditAddressComponent
   */
  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.data.name, [Validators.required]],
      address: [this.data.address, [Validators.required]],
      city: [this.data.city, [Validators.required]],
      postCode: [this.data.postCode, {validators: [Validators.required, Validators.pattern('\d{5}')]}]
    });
  }

  /**
   *
   *
   * @memberof EditAddressComponent
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof EditAddressComponent
   */
  async onSubmit(): Promise<void> {
    let index;
    this.address = this.form.value;

    if (this.data.shippingAddress) {
      index = this.user.user.shippingAddress.findIndex((shippingAddress) => shippingAddress.name === this.data.name);
      this.user.user.shippingAddress.splice(index, 1, this.address);
    }

    if (this.data.billingAddress) {
      index = this.user.user.billingAddress.findIndex((billingAddress) => billingAddress.name === this.data.name);
      this.user.user.billingAddress.splice(index, 1, this.address);
    }

    try {
      await this.userService.updateUser(this.user);
    } catch (e) {
      throw new Error(e);
    } finally {
      this.closeDialog();
    }
  }

  /**
   *
   *
   * @memberof EditAddressComponent
   */
  ngOnDestroy() {}

}
