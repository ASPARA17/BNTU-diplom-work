import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryCabinetComponent } from './secretary-cabinet.component';

describe('SecretaryCabinetComponent', () => {
  let component: SecretaryCabinetComponent;
  let fixture: ComponentFixture<SecretaryCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretaryCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
