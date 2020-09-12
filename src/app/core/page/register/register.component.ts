import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  user;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.buildForm();
  }

  /**
   *
   *
   * @memberof RegisterComponent
   */
  buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordVerif: ['', [Validators.required]],
    });
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof RegisterComponent
   */
  async register(): Promise<void> {
    this.loading = true;

    try {
      const req = await this.userService.create(this.form.value);
      const token = req.token;
      localStorage.setItem('jwt', token);
      await this.userService.connectUser()
    } catch (error) {
      throw error;
    }
    this.router.navigateByUrl('/admin');
  }

}
