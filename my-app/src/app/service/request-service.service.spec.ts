import { TestBed } from '@angular/core/testing';

import { RequestService } from './request-service.service';

describe('RequestServiceService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
