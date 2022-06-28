import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhginventoryYearwiseComponent } from './ghginventory-yearwise.component';

describe('GhginventoryYearwiseComponent', () => {
  let component: GhginventoryYearwiseComponent;
  let fixture: ComponentFixture<GhginventoryYearwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhginventoryYearwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhginventoryYearwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
