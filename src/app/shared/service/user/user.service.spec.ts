import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { User } from '../../interface/user.interface';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    });

    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current user', () => {
    service.getCurrentUserInf().pipe(take(1)).subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should get current user value', () => {
    expect(service.getCurrentUserInfValue()).toBeNull();
  });

  it('should create', async () => {
    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'post').and.callFake(() => Promise.resolve({}));
    const res = await service.create({} as User);
    expect(res).toEqual({});
  });

  it('should connect user', async () => {
    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get').and.callFake(() => Promise.resolve({ id: 1 }));
    spyOn(service, 'setUserInf');
    await service.connectUser();
  });

  it('connect user should throw', (done) => {
    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get').and.callFake(() => Promise.reject('fake error'));
    service.connectUser().catch((e) => { expect(e).toEqual(Error('fake error')); done(); });
  });
});
