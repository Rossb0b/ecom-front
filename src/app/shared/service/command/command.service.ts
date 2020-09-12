import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  constructor(private apiService: ApiService) { }

  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof CommandService
   */
  getAll(): Promise<any> {
    return this.apiService.get('/command');
  }

  /**
   *
   *
   * @param {string} id
   * @returns {Promise<any>}
   * @memberof CommandService
   */
  find(id: string): Promise<any> {
    return this.apiService.get('/command/' + id);
  }

  /**
   *
   *
   * @param {*} commandData
   * @returns
   * @memberof CommandService
   */
  createCommand(commandData) {
    return this.apiService.post('/command', commandData);
  }
}
