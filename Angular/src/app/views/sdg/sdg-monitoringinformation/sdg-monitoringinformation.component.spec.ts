import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgMonitoringinformationComponent } from './sdg-monitoringinformation.component';

describe('SdgMonitoringinformationComponent', () => {
  let component: SdgMonitoringinformationComponent;
  let fixture: ComponentFixture<SdgMonitoringinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdgMonitoringinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgMonitoringinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
