import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  loading = false;

  constructor(
    private authService: AuthService,
  ) {}

  /**
   *
   *
   * @memberof AppComponent
   */
  async ngOnInit() {
    this.loading = true;
    try {
      await this.authService.autoAuthUser();
    } catch (e) {
      console.log('try');
    } finally {
      this.loading = false;
    }
  }

  /**
   *
   *
   * @memberof AppComponent
   */
  ngOnDestroy() {}

}
