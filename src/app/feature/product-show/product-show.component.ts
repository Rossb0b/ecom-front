import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from 'src/app/shared/service/product/product.service';
import { BucketService } from 'src/app/shared/service/bucket/bucket.service';
import { Scavenger } from '@wishtack/rx-scavenger';
import { UserService } from 'src/app/shared/service/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.sass']
})
export class ProductShowComponent implements OnInit {
  loading = false;
  productId = this.route.snapshot.params.id;
  product;
  bucket;
  quantity = 0;
  scavenger = new Scavenger(this);
  user;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private bucketService: BucketService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  /**
   *
   *
   * @memberof ProductShowComponent
   */
  async ngOnInit() {
    try {
      this.product = await this.productService.find(this.productId);
      if (this.product === null) {
        this.dialog.open(ErrorComponent, {data: {message: 'Ce produit n\'existe plus ou n\'est plus disponible à la vente'}});
        this.router.navigateByUrl('/')
      }
      this.getCurrentUser();
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof ProductShowComponent
   */
  getCurrentUser() {
    try {
      this.userService.getCurrentUserInf().pipe(
        this.scavenger.collect(),
      ).subscribe((user) => {
        this.user = user;
        if (this.user !== null) this.bucket = this.user.bucket;
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof ProductShowComponent
   */
  async updateBucket() {
    const product = {
      product: {
        _id: this.product._id,
        name: this.product.name,
        price: this.product.price
      },
      volume: this.quantity
    };

    let checkProductExist;

    if (this.user.bucket.products.length > 0) {
      for (const prod of this.user.bucket.products) {
        if (product.product._id === prod.product._id) {
          checkProductExist = true;
        }
      }

      if (!checkProductExist) {
        this.user.bucket.products.push(product);
      } else {
        for (const prod of this.user.bucket.products) {
          if (product.product._id === prod.product._id) {
            prod.volume += product.volume;
          }
        }
      }
    } else {
      this.user.bucket.products.push(product);
    }

    try {
      this.bucketService.updateBucket(this.user.bucket);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof ProductShowComponent
   */
  increaseQuantity() {
    this.quantity += 1;
  }

  /**
   *
   *
   * @memberof ProductShowComponent
   */
  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 1;
    }
  }

  /**
   *
   *
   * @memberof ProductShowComponent
   */
  ngOnDestroy() {}

}
