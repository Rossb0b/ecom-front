import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   *
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns
   * @memberof AuthInterceptor
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // We check if url request is our api
    if (req.url.includes('') || req.url.includes('http://localhost:3000')) {
      const authToken = localStorage.getItem('jwt');
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });
      return next.handle(authRequest);
    }
    return next.handle(req);
  }
}
