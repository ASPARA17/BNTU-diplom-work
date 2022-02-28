import { TestBed } from '@angular/core/testing';

import { DiplomWorkService } from './diplom-work.service';

describe('DiplomWorkService', () => {
  let service: DiplomWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
