import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(ApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request', () => {
    const mockResult: MockedHttpResult = { fakeKey: 'fakeValue' };

    service.get('fake').then((res: MockedHttpResult) => {
      expect(res).toEqual(mockResult);
    });

    const req = httpTestingController.expectOne(environment.apiUrl + 'fake');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResult);
  });

  it('should make a POST request', () => {
    const mockResult: MockedHttpResult = { fakeKey: 'fakeValue' };

    service.post('fake', {}).then((res: MockedHttpResult) => {
      expect(res).toEqual(mockResult);
    });

    const req = httpTestingController.expectOne(environment.apiUrl + 'fake');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResult);
  });

  it('should make a PUT request', () => {
    const mockResult: MockedHttpResult = { fakeKey: 'fakeValue' };

    service.put('fake', {}).then((res: MockedHttpResult) => {
      expect(res).toEqual(mockResult);
    });

    const req = httpTestingController.expectOne(environment.apiUrl + 'fake');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockResult);
  });

  it('should make a DELETE request', () => {
    const mockResult: MockedHttpResult = { fakeKey: 'fakeValue' };

    service.delete('fake').then((res: MockedHttpResult) => {
      expect(res).toEqual(mockResult);
    });

    const req = httpTestingController.expectOne(environment.apiUrl + 'fake');
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockResult);
  });
});

export type MockedHttpResult = { fakeKey: string };
