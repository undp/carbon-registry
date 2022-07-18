import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgReportTableComponent } from './ghg-report-table.component';

describe('GhgReportTableComponent', () => {
  let component: GhgReportTableComponent;
  let fixture: ComponentFixture<GhgReportTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgReportTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
