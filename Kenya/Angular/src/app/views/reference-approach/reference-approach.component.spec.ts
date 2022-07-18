import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceApproachComponent } from './reference-approach.component';

describe('ReferenceApproachComponent', () => {
  let component: ReferenceApproachComponent;
  let fixture: ComponentFixture<ReferenceApproachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceApproachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
