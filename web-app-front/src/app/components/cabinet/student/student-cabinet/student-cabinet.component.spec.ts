import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCabinetComponent } from './student-cabinet.component';

describe('StudentCabinetComponent', () => {
  let component: StudentCabinetComponent;
  let fixture: ComponentFixture<StudentCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
