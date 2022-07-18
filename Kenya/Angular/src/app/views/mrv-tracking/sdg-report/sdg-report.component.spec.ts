import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgReportComponent } from './sdg-report.component';

describe('SdgReportComponent', () => {
  let component: SdgReportComponent;
  let fixture: ComponentFixture<SdgReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdgReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
