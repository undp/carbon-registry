import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgCarbonatesComponent } from './ghg-carbonates.component';

describe('GhgCarbonatesComponent', () => {
  let component: GhgCarbonatesComponent;
  let fixture: ComponentFixture<GhgCarbonatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgCarbonatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgCarbonatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
