import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirectEmissionsComponent } from './indirect-emissions.component';

describe('IndirectEmissionsComponent', () => {
  let component: IndirectEmissionsComponent;
  let fixture: ComponentFixture<IndirectEmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndirectEmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndirectEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
