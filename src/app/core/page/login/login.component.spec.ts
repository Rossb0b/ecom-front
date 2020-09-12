import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { UserService } from 'src/app/shared/service/user/user.service';
import { Component } from '@angular/core';

@Component({
  template: '',
})
class EmptyComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'app', component: EmptyComponent,
        }]),
      ],
      declarations: [LoginComponent, EmptyComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', async () => {
    const mockedResult: MockedHttpResult = { token: 'fakeToken', user: 'jacky' };
    const userService = TestBed.get(UserService);
    const authService = TestBed.get(AuthService);
    spyOn(authService, 'login').and.callFake(() => Promise.resolve(mockedResult));
    spyOn(localStorage, 'setItem');
    spyOn(userService, 'setUser');
    component.form.setValue({
      email: 'fake@fake',
      password: 'f@keP@ss',
    });

    await component.login();

    expect(localStorage.setItem).toHaveBeenCalledWith('jwt', 'fakeToken');
    expect(userService.setUser).toHaveBeenCalledWith('jacky');
  });

  it('should throw', (done) => {
    const authService = TestBed.get(AuthService);
    spyOn(authService, 'login').and.callFake(() => Promise.reject('fake error'));
    component.form.setValue({
      email: 'fake@fake',
      password: 'f@keP@ss',
    }); // to make form invalid
    component.login().catch((e) => {
      expect(e).toEqual('fake error');
      done();
    });
  });
});

type MockedHttpResult = { token: string; user: string; };
