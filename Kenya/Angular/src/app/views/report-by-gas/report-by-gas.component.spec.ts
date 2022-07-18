import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByGasComponent } from './report-by-gas.component';

describe('ReportByGasComponent', () => {
  let component: ReportByGasComponent;
  let fixture: ComponentFixture<ReportByGasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByGasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
