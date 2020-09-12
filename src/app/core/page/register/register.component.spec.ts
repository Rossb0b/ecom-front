import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/shared/service/user/user.service';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register', async () => {
    const userService = TestBed.get(UserService);
    const router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');
    spyOn(userService, 'create').and.callFake(() => Promise.resolve({}));

    await component.register();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should throw', (done) => {
    const userService = TestBed.get(UserService);
    spyOn(userService, 'create').and.callFake(() => Promise.reject('fake error'));
    component.register().catch((e) => {
      expect(e).toEqual('fake error');
      done();
    });
  });
});
