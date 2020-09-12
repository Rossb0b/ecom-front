import { OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Scavenger } from '@wishtack/rx-scavenger';
import { Injectable } from '@angular/core';
import { UserService } from '../service/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate, OnDestroy {
  user;
  scavenger = new Scavenger(this);

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  /**
   *
   *
   * @returns {boolean}
   * @memberof RoleGuard
   */
  canActivate(): boolean {
    this.userService.getCurrentUserInf().pipe(
      this.scavenger.collect(),
    ).subscribe((userInf) => {
      this.user = userInf;
      if (this.user === null) {
        this.router.navigateByUrl('/');
      } else {
        if (this.user.user.role === 0) return true;
        else this.router.navigateByUrl('/');
      }
    });

    return true;
  }

  ngOnDestroy() {}
}
