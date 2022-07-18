import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearWiseChartComponent } from './year-wise-chart.component';

describe('YearWiseChartComponent', () => {
  let component: YearWiseChartComponent;
  let fixture: ComponentFixture<YearWiseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearWiseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearWiseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
