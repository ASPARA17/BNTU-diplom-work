import { TestBed } from '@angular/core/testing';

import { SecRoleService } from './sec-role.service';

describe('SecRoleService', () => {
  let service: SecRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
