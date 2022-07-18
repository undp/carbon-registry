import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceTrackingComponent } from './finance-tracking.component';

describe('FinanceTrackingComponent', () => {
  let component: FinanceTrackingComponent;
  let fixture: ComponentFixture<FinanceTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
