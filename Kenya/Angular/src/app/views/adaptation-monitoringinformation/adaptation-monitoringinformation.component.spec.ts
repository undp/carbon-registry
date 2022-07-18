import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptationMonitoringinformationComponent } from './adaptation-monitoringinformation.component';

describe('AdaptationMonitoringinformationComponent', () => {
  let component: AdaptationMonitoringinformationComponent;
  let fixture: ComponentFixture<AdaptationMonitoringinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptationMonitoringinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptationMonitoringinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
