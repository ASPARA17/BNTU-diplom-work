import { TestBed } from '@angular/core/testing';

import { SecSpecialtyService } from './sec-specialty.service';

describe('SecSpecialtyService', () => {
  let service: SecSpecialtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecSpecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
