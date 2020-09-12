import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../../shared/service/product/product.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.sass']
})
export class AdminHomeComponent implements OnInit {

  products;
  loading = true;

  constructor(
    private productService: ProductService,
  ) { }

  /**
   *
   *
   * @memberof AdminHomeComponent
   */
  ngOnInit(): void {
    this.initialize();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof AdminHomeComponent
   */
  async initialize(): Promise<void> {
    try {
      await this.getProducts();
    } catch (e) {
      throw new Error(e);
    } finally {
      this.loading = false;
    }
  }

  /**
   *
   *
   * @param {string} productId
   * @returns {Promise<void>}
   * @memberof AdminHomeComponent
   */
  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.productService.deleteProduct(productId).then(() => {
        this.getProducts();
      })
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof AdminHomeComponent
   */
  async getProducts(): Promise<void> {
    try {
      this.products = await this.productService.getAll();
    } catch (e) {
      throw new Error(e);
    }
  }

}
