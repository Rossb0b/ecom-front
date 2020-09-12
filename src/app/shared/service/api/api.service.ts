import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  /**
   *
   *
   * @template T
   * @param {string} path
   * @param {Object} [options=this.httpOptions]
   * @returns {Promise<T>}
   * @memberof ApiService
   */
  get<T = any>(path: string, options: Object = this.httpOptions): Promise<T> {
    return this.http.get<T>(environment.apiUrl + path, options).toPromise();
  }

  /**
   *
   *
   * @template T
   * @param {string} url
   * @param {object} body
   * @param {Object} [options=this.httpOptions]
   * @returns {Promise<T>}
   * @memberof ApiService
   */
  post<T = any>(url: string, body: object, options: Object = this.httpOptions): Promise<T> {
    return this.http.post<T>(environment.apiUrl + url, body, options).toPromise();
  }

  /**
   *
   *
   * @template T
   * @param {string} url
   * @param {object} body
   * @param {Object} [options=this.httpOptions]
   * @returns {Promise<T>}
   * @memberof ApiService
   */
  put<T = any>(url: string, body: object, options: Object = this.httpOptions): Promise<T> {
    return this.http.put<T>(environment.apiUrl + url, body, options).toPromise();
  }

  /**
   *
   *
   * @template T
   * @param {string} url
   * @param {object} [options=this.httpOptions]
   * @returns {Promise<T>}
   * @memberof ApiService
   */
  delete<T = any>(url: string, options: object = this.httpOptions): Promise<T> {
    return this.http.delete<T>(environment.apiUrl + url, options).toPromise();
  }
}
