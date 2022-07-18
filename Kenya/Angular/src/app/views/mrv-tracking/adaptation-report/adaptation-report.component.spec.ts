import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptationReportComponent } from './adaptation-report.component';

describe('AdaptationReportComponent', () => {
  let component: AdaptationReportComponent;
  let fixture: ComponentFixture<AdaptationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
