import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecUserComponent } from './sec-user.component';

describe('SecUserComponent', () => {
  let component: SecUserComponent;
  let fixture: ComponentFixture<SecUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
