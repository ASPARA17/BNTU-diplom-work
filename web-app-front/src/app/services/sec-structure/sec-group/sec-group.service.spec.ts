import { TestBed } from '@angular/core/testing';

import { SecGroupService } from './sec-group.service';

describe('SecGroupService', () => {
  let service: SecGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
