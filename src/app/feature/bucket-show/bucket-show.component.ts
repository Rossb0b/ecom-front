import { Component, OnInit, OnDestroy } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { UserService } from 'src/app/shared/service/user/user.service';
import { BucketService } from 'src/app/shared/service/bucket/bucket.service';

@Component({
  selector: 'app-bucket-show',
  templateUrl: './bucket-show.component.html',
  styleUrls: ['./bucket-show.component.sass']
})
export class BucketShowComponent implements OnInit, OnDestroy {
  loading = false;
  user;
  scavenger = new Scavenger(this);
  quantity = 0;

  constructor(
    private userService: UserService,
    private bucketService: BucketService,
  ) {}

  /**
   *
   *
   * @memberof BucketShowComponent
   */
  async ngOnInit() {
    await this.getCurrentUser();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof BucketShowComponent
   */
  async getCurrentUser(): Promise<void> {
    try {
      this.userService.getCurrentUserInf().pipe(
        this.scavenger.collect(),
      ).subscribe((userInf) => {
        this.user = userInf;
        for (const product of this.user.bucket.products) {
          this.quantity += product.volume;
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @param {*} index
   * @memberof BucketShowComponent
   */
  increaseQuantity(index) {
    for (let i = 0; i < this.user.bucket.products.length; i++) {
      if (i === index) {
        this.user.bucket.products[i].volume += 1;
        this.quantity += 1;
        this.updateBucket();
      }
    }
  }

  /**
   *
   *
   * @param {*} index
   * @memberof BucketShowComponent
   */
  decreaseQuantity(index) {
    for (let i = 0; i < this.user.bucket.products.length; i++) {
      if (i === index) {
        if (this.user.bucket.products[i].volume > 0) {
          this.user.bucket.products[i].volume -= 1;
          this.quantity -= 1;
          this.updateBucket();
        }
      }
    }
  }

  /**
   *
   *
   * @param {*} index
   * @memberof BucketShowComponent
   */
  deleteProduct(index) {
    for (let i = 0; i < this.user.bucket.products.length; i++) {
      if (i === index) {
        this.quantity -= this.user.bucket.products[i].volume;
        this.user.bucket.products.splice(i, 1);
        this.updateBucket();
      }
    }
  }

  /**
   *
   *
   * @memberof BucketShowComponent
   */
  async updateBucket() {
    try {
      await this.bucketService.updateBucket(this.user.bucket);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @memberof BucketShowComponent
   */
  ngOnDestroy() {}

}
