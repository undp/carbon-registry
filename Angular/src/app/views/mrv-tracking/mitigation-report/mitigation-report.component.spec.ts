import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitigationReportComponent } from './mitigation-report.component';

describe('MitigationReportComponent', () => {
  let component: MitigationReportComponent;
  let fixture: ComponentFixture<MitigationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitigationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitigationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
