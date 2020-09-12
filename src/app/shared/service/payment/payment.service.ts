import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof PaymentService
   */
  async getPaymentSession(): Promise<any> {
    try {
      return this.apiService.get('/payment');
    } catch (e) {
      throw new Error(e);
    }
  }
}
