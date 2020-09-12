import { Component, OnInit, OnDestroy } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { UserService } from 'src/app/shared/service/user/user.service';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.sass']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {

  user;
  scavenger = new Scavenger(this);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: Router,
  ) {}

  /**
   *
   *
   * @memberof AdminHeaderComponent
   */
  ngOnInit(): void {
    this.initialize();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof AdminHeaderComponent
   */
  async initialize(): Promise<void> {
    try {
      await this.getCurrentUser();
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof AdminHeaderComponent
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
   * @memberof AdminHeaderComponent
   */
  logout() {
    this.authService.logout();
  }

  /**
   *
   *
   * @memberof AdminHeaderComponent
   */
  ngOnDestroy() {}

}
