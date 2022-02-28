import { TestBed } from '@angular/core/testing';

import { FuzzysetService } from './fuzzyset.service';

describe('FuzzysetService', () => {
  let service: FuzzysetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuzzysetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
