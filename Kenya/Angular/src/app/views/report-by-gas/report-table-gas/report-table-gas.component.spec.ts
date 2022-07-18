import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTableGasComponent } from './report-table-gas.component';

describe('ReportTableGasComponent', () => {
  let component: ReportTableGasComponent;
  let fixture: ComponentFixture<ReportTableGasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTableGasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTableGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
