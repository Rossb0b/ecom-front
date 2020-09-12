import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, } from '@angular/core';
import { PaymentService } from '../../../service/payment/payment.service';
import { MatDialogRef } from '@angular/material/dialog';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  StripeCardElementChangeEvent,
} from '@stripe/stripe-js';


@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.sass']
})
export class CreatePaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'fr',
  };

  paymentInstance: {
    clientSecret: string,
    totalValue: Number
  } = {
    clientSecret: undefined,
    totalValue: undefined
  };

  constructor(
    private paymentService: PaymentService,
    private dialogRef: MatDialogRef<CreatePaymentComponent>,
    private stripeService: StripeService,
    ) { }

  /**
   *
   *
   * @memberof CreatePaymentComponent
   */
  ngOnInit(): void {
    this.initialize();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof CreatePaymentComponent
   */
  async initialize(): Promise<void> {
    try {
      this.paymentInstance = await this.paymentService.getPaymentSession();
    } catch (e) {
      throw new Error(e);
    }
  }

  onChange(ev: StripeCardElementChangeEvent) {
    const displayError = document.getElementById('card-errors');
    if (ev.error) {
      displayError.textContent = ev.error.message;
    } else {
      displayError.textContent = '';
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async pay(): Promise<void> {
    try {
      this.stripeService.confirmCardPayment(this.paymentInstance.clientSecret, {
        payment_method: {
          card: this.card.element,
          billing_details: {
            name: 'test'
          }
        }
      }).subscribe((result) => {
        if(result.error) {
          throw new Error(result.error.message);
        }
      });
    } catch (e) {
      throw new Error(e);
    } finally {
      this.closeDialog();
    }
  }
}
