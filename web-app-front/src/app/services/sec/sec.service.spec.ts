import { TestBed } from '@angular/core/testing';

import { SecService } from './sec.service';

describe('SecService', () => {
  let service: SecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
