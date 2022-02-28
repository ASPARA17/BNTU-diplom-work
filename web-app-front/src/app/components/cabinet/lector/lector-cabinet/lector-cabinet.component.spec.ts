import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorCabinetComponent } from './lector-cabinet.component';

describe('LectorCabinetComponent', () => {
  let component: LectorCabinetComponent;
  let fixture: ComponentFixture<LectorCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
