import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../api/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../interface/user.interface';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', async () => {
    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'post').and.callFake(() => Promise.resolve({}));
    const res = await service.login({} as User);
    expect(res).toEqual({});
  });

  it('isLoggedIn should return false', () => {
    spyOn(service.jwtHelper, 'isTokenExpired').and.callFake(() => true);
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('isLoggedIn should return true', () => {
    spyOn(service.jwtHelper, 'isTokenExpired').and.callFake(() => false);
    expect(service.isLoggedIn()).toBeTruthy();
  });
});
