import { Component, OnInit, OnDestroy } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { UserService } from 'src/app/shared/service/user/user.service';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.sass']
})
export class DefaultHeaderComponent implements OnInit, OnDestroy {

  user;
  scavenger = new Scavenger(this);

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  /**
   *
   *
   * @memberof DefaultHeaderComponent
   */
  async ngOnInit() {
    await this.getCurrentUser();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof DefaultHeaderComponent
   */
  async getCurrentUser(): Promise<void> {
    try {
      this.userService.getCurrentUserInf().pipe(
        this.scavenger.collect(),
      ).subscribe((user) => {
        this.user = user;
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof DefaultHeaderComponent
   */
  logout() {
    this.authService.logout();
  }

  /**
   *
   *
   * @memberof DefaultHeaderComponent
   */
  ngOnDestroy() {}

}
