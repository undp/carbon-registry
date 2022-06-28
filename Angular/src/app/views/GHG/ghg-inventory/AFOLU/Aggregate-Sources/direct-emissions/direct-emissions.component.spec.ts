import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectEmissionsComponent } from './direct-emissions.component';

describe('DirectEmissionsComponent', () => {
  let component: DirectEmissionsComponent;
  let fixture: ComponentFixture<DirectEmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectEmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
