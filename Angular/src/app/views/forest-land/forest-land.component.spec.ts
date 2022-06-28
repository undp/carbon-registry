import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestLandComponent } from './forest-land.component';

describe('ForestLandComponent', () => {
  let component: ForestLandComponent;
  let fixture: ComponentFixture<ForestLandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForestLandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
