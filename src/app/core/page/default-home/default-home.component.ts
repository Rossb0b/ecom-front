import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/service/product/product.service';

@Component({
  selector: 'app-default-home',
  templateUrl: './default-home.component.html',
  styleUrls: ['./default-home.component.sass'],
})
export class DefaultHomeComponent implements OnInit {
  loading = false;
  products;

  constructor(
    private productService: ProductService,
  ) { }

  /**
   *
   *
   * @memberof DefaultHomeComponent
   */
  ngOnInit(): void {
    this.initialize();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof DefaultHomeComponent
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
   * @returns {Promise<void>}
   * @memberof DefaultHomeComponent
   */
  async getProducts(): Promise<void> {
    try {
      this.products = await this.productService.getAll();
    } catch (e) {
      throw new Error(e);
    }
  }

}
