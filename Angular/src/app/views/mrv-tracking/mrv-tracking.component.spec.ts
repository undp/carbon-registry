import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrvTrackingComponent } from './mrv-tracking.component';

describe('MrvTrackingComponent', () => {
  let component: MrvTrackingComponent;
  let fixture: ComponentFixture<MrvTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrvTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrvTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
