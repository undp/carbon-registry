import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringInformationComponent } from './monitoring-information.component';

describe('MonitoringInformationComponent', () => {
  let component: MonitoringInformationComponent;
  let fixture: ComponentFixture<MonitoringInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
