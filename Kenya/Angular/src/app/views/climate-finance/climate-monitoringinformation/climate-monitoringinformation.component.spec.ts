import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateMonitoringinformationComponent } from './climate-monitoringinformation.component';

describe('ClimateMonitoringinformationComponent', () => {
  let component: ClimateMonitoringinformationComponent;
  let fixture: ComponentFixture<ClimateMonitoringinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimateMonitoringinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimateMonitoringinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
