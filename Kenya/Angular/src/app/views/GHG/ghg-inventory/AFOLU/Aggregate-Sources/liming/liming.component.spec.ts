import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimingComponent } from './liming.component';

describe('LimingComponent', () => {
  let component: LimingComponent;
  let fixture: ComponentFixture<LimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
