import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { User } from '../../interface/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: Router,
  ) { }

  /**
   *
   *
   * @param {User} user
   * @returns {Promise<any>}
   * @memberof AuthService
   */
  login(user: User): Promise<any> {
    return this.apiService.post('/auth', user);
  }

  /**
   *
   *
   * @memberof AuthService
   */
  logout(): void {
    localStorage.removeItem('jwt');
    this.userService.setUserInf(null);
    this.route.navigateByUrl('/');
  }

  /**
   *
   *
   * @returns {boolean}
   * @memberof AuthService
   */
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt') || '';
    return !this.jwtHelper.isTokenExpired(token);
  }

  /**
   *
   *
   * @returns
   * @memberof AuthService
   */
  async autoAuthUser() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return;
    }

    try {
      await this.userService.connectUser();
    } catch (e) {
      throw new Error(e);
    }
  }
}
