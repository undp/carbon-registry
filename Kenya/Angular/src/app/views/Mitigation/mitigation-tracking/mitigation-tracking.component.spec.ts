import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitigationTrackingComponent } from './mitigation-tracking.component';

describe('MitigationTrackingComponent', () => {
  let component: MitigationTrackingComponent;
  let fixture: ComponentFixture<MitigationTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitigationTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitigationTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
