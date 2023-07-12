import { TestBed } from '@angular/core/testing';

import { ProvisionRequestService } from './provision-request.service';

describe('ProvisionRequestService', () => {
  let service: ProvisionRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvisionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
