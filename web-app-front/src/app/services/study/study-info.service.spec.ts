import { TestBed } from '@angular/core/testing';

import { StudyInfoService } from './study-info.service';

describe('RegistrationService', () => {
  let service: StudyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
