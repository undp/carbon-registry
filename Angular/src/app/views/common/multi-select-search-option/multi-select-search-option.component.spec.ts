import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectSearchOptionComponent } from './multi-select-search-option.component';

describe('MultiSelectSearchOptionComponent', () => {
  let component: MultiSelectSearchOptionComponent;
  let fixture: ComponentFixture<MultiSelectSearchOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectSearchOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectSearchOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
