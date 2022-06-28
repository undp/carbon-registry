import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgTrackingComponent } from './sdg-tracking.component';

describe('SdgTrackingComponent', () => {
  let component: SdgTrackingComponent;
  let fixture: ComponentFixture<SdgTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdgTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
