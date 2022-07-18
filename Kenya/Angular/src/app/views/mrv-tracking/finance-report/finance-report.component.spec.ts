import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceReportComponent } from './finance-report.component';

describe('FinanceReportComponent', () => {
  let component: FinanceReportComponent;
  let fixture: ComponentFixture<FinanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
