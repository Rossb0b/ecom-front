import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../interface/user.interface';
import { BucketService } from '../bucket/bucket.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserInfSubject = new BehaviorSubject<{
    user: {
      role: Number,
      _id: string,
      email: string,
      firstname: string,
      lastname: string,
      billingAddress: [],
      shippingAddress: []
    },
    bucket: {
      _id: string,
      products: [],
      price: Number,
      userId: string
    }
  }>(null);

  constructor(
    private apiService: ApiService,
    private bucketService: BucketService,
  ) { }

  /**
   *
   *
   * @returns {Observable<{
   *     user: {
   *       role: Number,
   *       _id: string,
   *       email: string,
   *       firstname: string,
   *       lastname: string,
   *       billingAddress: [],
   *       shippingAddress: []
   *     },
   *     bucket: {
   *       _id: string,
   *       products: [],
   *       price: Number,
   *       userId: string
   *     }
   *   }>}
   * @memberof UserService
   */
  getCurrentUserInf(): Observable<{
    user: {
      role: Number,
      _id: string,
      email: string,
      firstname: string,
      lastname: string,
      billingAddress: [],
      shippingAddress: []
    },
    bucket: {
      _id: string,
      products: [],
      price: Number,
      userId: string
    }
  }> {
    return this.currentUserInfSubject.asObservable();
  }

  /**
   *
   *
   * @returns {{
   *     user: {
   *       role: Number,
   *       _id: string,
   *       email: string,
   *       firstname: string,
   *       lastname: string,
   *       billingAddress: [],
   *       shippingAddress: []
   *     },
   *     bucket: {
   *       _id: string,
   *       products: [],
   *       price: Number,
   *       userId: string
   *     }
   *   }}
   * @memberof UserService
   */
  getCurrentUserInfValue(): {
    user: {
      role: Number,
      _id: string,
      email: string,
      firstname: string,
      lastname: string,
      billingAddress: [],
      shippingAddress: []
    },
    bucket: {
      _id: string,
      products: [],
      price: Number,
      userId: string
    }
  } {
    return this.currentUserInfSubject.getValue();
  }

  /**
   *
   *
   * @param {{
   *     user: {
   *       role: Number,
   *       _id: string,
   *       email: string,
   *       firstname: string,
   *       lastname: string,
   *       billingAddress: [],
   *       shippingAddress: []
   *     },
   *     bucket: {
   *       _id: string,
   *       products: [],
   *       price: Number,
   *       userId: string
   *     }
   *   }} userInf
   * @memberof UserService
   */
  setUserInf(userInf: {
    user: {
      role: Number,
      _id: string,
      email: string,
      firstname: string,
      lastname: string,
      billingAddress: [],
      shippingAddress: []
    },
    bucket: {
      _id: string,
      products: [],
      price: Number,
      userId: string
    }
  }): void {
    this.currentUserInfSubject.next(userInf);
  }

  /**
   *
   *
   * @param {User} user
   * @returns {Promise<any>}
   * @memberof UserService
   */
  create(user: User): Promise<any> {
    return this.apiService.post('/user', user);
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof UserService
   */
  async connectUser(): Promise<void> {
    try {
      const user = await this.apiService.get('/user');
      const bucket = await this.getBucket();
      const userInf = {
        user: {
          role: user.role,
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          billingAddress: user.billingAddress,
          shippingAddress: user.shippingAddress
        },
        bucket: {
          _id: bucket._id,
          products: bucket.products,
          price: bucket.price,
          userId: bucket.userId
        }
      };

      this.setUserInf(userInf);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof UserService
   */
  async clearBucket(): Promise<void> {
    const subject = this.currentUserInfSubject.getValue();

    try {
      await this.bucketService.deleteBucket();
      const bucket = await this.bucketService.createBucket();
      subject.bucket = bucket._doc;

      this.setUserInf(subject);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @param {*} updatedUserData
   * @returns {Promise<void>}
   * @memberof UserService
   */
  async updateUser(updatedUserData): Promise<void> {
    try {
      const user = await this.apiService.post('/user/' + updatedUserData.user._id, updatedUserData.user);
      await this.connectUser();
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof UserService
   */
  async getBucket(): Promise<any> {
    try {
      let bucket = await this.bucketService.find();

      if (bucket === null) {
        bucket = await this.bucketService.createBucket();
        bucket = bucket._doc;
      }

      return bucket;
    } catch (e) {
      throw new Error(e);
    }
  }
}
