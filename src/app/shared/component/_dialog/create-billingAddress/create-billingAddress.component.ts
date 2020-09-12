import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Scavenger } from '@wishtack/rx-scavenger';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/shared/service/user/user.service';


@Component({
  selector: 'app-create-billingAddress',
  templateUrl: './create-billingAddress.component.html',
  styleUrls: ['./create-billingAddress.component.sass']
})
export class CreateBillingAddressComponent implements OnInit, OnDestroy {
  form: FormGroup;
  billingAddress;
  user;
  scavenger = new Scavenger(this);

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateBillingAddressComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buildForm();
  }

  /**
   *
   *
   * @memberof CreateBillingAddressComponent
   */
  async ngOnInit() {
    await this.getCurrentUser();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof CreateBillingAddressComponent
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
   * @memberof CreateBillingAddressComponent
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
   * @memberof CreateBillingAddressComponent
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof CreateBillingAddressComponent
   */
  async onSubmit(): Promise<void> {
    this.billingAddress = this.form.value;
    this.user.user.billingAddress.push(this.billingAddress);
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
   * @memberof CreateBillingAddressComponent
   */
  ngOnDestroy() {}

}
