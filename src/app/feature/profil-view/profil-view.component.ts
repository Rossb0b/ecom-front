import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/service/user/user.service';
import { Scavenger } from '@wishtack/rx-scavenger';
import { MatDialog } from '@angular/material/dialog';
import { CreateBillingAddressComponent } from 'src/app/shared/component/_dialog/create-billingAddress/create-billingAddress.component';
import { CreateShippingAddressComponent } from 'src/app/shared/component/_dialog/create-shippingAddress/create-shippingAddress.component';
import { EditAddressComponent } from 'src/app/shared/component/_dialog/edit-address/edit-address.component';
import { CommandService } from 'src/app/shared/service/command/command.service';

@Component({
  selector: 'app-profil-view',
  templateUrl: './profil-view.component.html',
  styleUrls: ['./profil-view.component.sass']
})
export class ProfilViewComponent implements OnInit, OnDestroy {
  loading = false;
  billingsPanelOpenState = false;
  shippingsPanelOpenState = false;
  commandsPanelOpenState = false;
  secondPanelOpenState = false;
  thirdPanelOpenState = false;
  fourthPanelOpenState = false;
  showCommands = false;
  showBillings = false;
  showShippings = false;


  scavenger = new Scavenger(this);
  user;
  commands;

  constructor(
    private userService: UserService,
    private commandService: CommandService,
    private dialog: MatDialog,
  ) {}

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  async ngOnInit() {
    await this.getCurrentUser();
    await this.getCommands();
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  getCurrentUser() {
    try {
      this.userService.getCurrentUserInf().pipe(
        this.scavenger.collect(),
      ).subscribe((user) => {
        if (user) this.user = user.user;
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  async getCommands() {
    try {
      this.commands = await this.commandService.getAll();
      if (this.user.role === 0) {
        this.commands.sort();
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  openCommandsPanel() {
    this.showCommands = true;
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  closeCommandsPanel() {
    this.showCommands = false;
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  openBillingsPanel() {
    this.showBillings = true;
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  closeBillingsPanel() {
    this.showBillings = false;
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  openShippingsPanel() {
    this.showShippings = true;
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  closeShippingsPanel() {
    this.showShippings = false;
  }

  /**
   *
   *
   * @param {*} indexOfBillingAddress
   * @memberof ProfilViewComponent
   */
  editBillingAddress(indexOfBillingAddress): void {
    this.dialog.open(EditAddressComponent, {
      data: {
        billingAddress: true,
        name: this.user.billingAddress[indexOfBillingAddress].name,
        address: this.user.billingAddress[indexOfBillingAddress].address,
        city: this.user.billingAddress[indexOfBillingAddress].city,
        postCode: this.user.billingAddress[indexOfBillingAddress].postCode
      }
    })
  }

  /**
   *
   *
   * @param {*} indexOfShippingAddress
   * @memberof ProfilViewComponent
   */
  editShippingAddress(indexOfShippingAddress): void {
    this.dialog.open(EditAddressComponent, {
      data: {
        shippingAddress: true,
        name: this.user.shippingAddress[indexOfShippingAddress].name,
        address: this.user.shippingAddress[indexOfShippingAddress].address,
        city: this.user.shippingAddress[indexOfShippingAddress].city,
        postCode: this.user.shippingAddress[indexOfShippingAddress].postCode
      }
    })
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  addBillingAddress(): void {
    this.dialog.open(CreateBillingAddressComponent);
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  addShippingAddress(): void {
    this.dialog.open(CreateShippingAddressComponent);
  }

  /**
   *
   *
   * @memberof ProfilViewComponent
   */
  ngOnDestroy() {}

}
