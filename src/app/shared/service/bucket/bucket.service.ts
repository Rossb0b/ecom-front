import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class BucketService {

  constructor(private apiService: ApiService) { }

  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof BucketService
   */
  async find(): Promise<any> {
    try {
      return await this.apiService.get('/bucket');
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof BucketService
   */
  async createBucket(): Promise<any> {
    try {
      const bucket = {
        products: [],
        price: 0,
      };

      return await this.apiService.post('/bucket', bucket);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @param {*} bucket
   * @returns
   * @memberof BucketService
   */
  async updateBucket(bucket) {
    try {
      return await this.apiService.post('/bucket/' + bucket._id, bucket);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @returns
   * @memberof BucketService
   */
  async deleteBucket() {
    try {
      return await this.apiService.delete('/bucket');
    } catch (e) {
      throw new Error(e);
    }
  }
}
