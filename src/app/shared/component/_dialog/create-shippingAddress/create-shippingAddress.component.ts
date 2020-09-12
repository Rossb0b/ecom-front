import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Scavenger } from '@wishtack/rx-scavenger';
import {MatDialogRef} from '@angular/material/dialog';
import { UserService } from 'src/app/shared/service/user/user.service';

@Component({
  selector: 'app-create-shippingAddress',
  templateUrl: './create-shippingAddress.component.html',
  styleUrls: ['./create-shippingAddress.component.sass']
})
export class CreateShippingAddressComponent implements OnInit, OnDestroy {
  form: FormGroup;
  shippingAddress;
  user;
  scavenger = new Scavenger(this);

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateShippingAddressComponent>,
    private userService: UserService,
  ) {
    this.buildForm();
  }

  /**
   *
   *
   * @memberof CreateShippingAddressComponent
   */
  async ngOnInit() {
    await this.getCurrentUser();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof CreateShippingAddressComponent
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
   * @memberof CreateShippingAddressComponent
   */
  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: ['', {validators: [Validators.required, Validators.pattern('\d{5}')]}]
    });
  }

  /**
   *
   *
   * @memberof CreateShippingAddressComponent
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof CreateShippingAddressComponent
   */
  async onSubmit(): Promise<void> {
    this.shippingAddress = this.form.value;
    this.user.user.shippingAddress.push(this.shippingAddress);
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
   * @memberof CreateShippingAddressComponent
   */
  ngOnDestroy() {}

}
