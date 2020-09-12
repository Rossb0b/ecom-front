import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Product } from '../../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  currentProductsSubject = new BehaviorSubject<Product[]>(null);

  constructor(private apiService: ApiService) { }

  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof ProductService
   */
  async getAll(): Promise<any> {
    try {
      const products = await this.apiService.get('/product');
      this.setProducts(products);
      return products;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @returns {Observable<Product[]>}
   * @memberof ProductService
   */
  getCurrentProducts(): Observable<Product[]> {
    return this.currentProductsSubject.asObservable();
  }

  /**
   *
   *
   * @returns {Product[]}
   * @memberof ProductService
   */
  getCurrentProductsValue(): Product[] {
    return this.currentProductsSubject.getValue();
  }

  /**
   *
   *
   * @param {Product[]} products
   * @memberof ProductService
   */
  setProducts(products: Product[]): void {
    this.currentProductsSubject.next(products);
  }

  /**
   *
   *
   * @param {string} id
   * @returns {Promise<any>}
   * @memberof ProductService
   */
  find(id: string): Promise<any> {
    return this.apiService.get('/product/' + id);
  }

  /**
   *
   *
   * @param {*} data
   * @param {*} files
   * @returns
   * @memberof ProductService
   */
  createProduct(data, files) {
    const productData = {
      name: data.name,
      description: data.description,
      price: data.price,
      files: files
    };

    return this.apiService.post('/product', productData);
  }

  /**
   *
   *
   * @param {*} productId
   * @param {*} data
   * @param {*} filesToKeep
   * @param {*} filesToUpload
   * @returns
   * @memberof ProductService
   */
  editProduct(productId, data, filesToKeep, filesToUpload) {
    const productData = {
      _id: productId,
      name: data.name,
      description: data.description,
      price: data.price,
      filesToKeep: filesToKeep,
      filesToUpload: filesToUpload
    };

    return this.apiService.post('/product/' + productId, productData);
  }

  /**
   *
   *
   * @param {*} updatedProductData
   * @param {*} files
   * @returns {Promise<void>}
   * @memberof ProductService
   */
  async updateUser(updatedProductData, files): Promise<void> {
    const productData = {
      name: updatedProductData.name,
      description: updatedProductData.description,
      price: updatedProductData.price,
      files: files
    };

    try {
      return await this.apiService.post('/user/' + updatedProductData.user._id, productData);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   *
   * @param {string} id
   * @returns {Promise<any>}
   * @memberof ProductService
   */
  deleteProduct(id: string): Promise<any> {
    return this.apiService.delete('/product/' + id);
  }
}
