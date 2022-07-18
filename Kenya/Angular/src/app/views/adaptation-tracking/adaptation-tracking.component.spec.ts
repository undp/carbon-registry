import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptationTrackingComponent } from './adaptation-tracking.component';

describe('AdaptationTrackingComponent', () => {
  let component: AdaptationTrackingComponent;
  let fixture: ComponentFixture<AdaptationTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptationTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptationTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
