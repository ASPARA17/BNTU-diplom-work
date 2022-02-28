import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadOfDepartmentComponent } from './head-of-department.component';

describe('HeadOfDepartmentComponent', () => {
  let component: HeadOfDepartmentComponent;
  let fixture: ComponentFixture<HeadOfDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadOfDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadOfDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
