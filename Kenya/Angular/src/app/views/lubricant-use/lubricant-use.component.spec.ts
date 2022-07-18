import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LubricantUseComponent } from './lubricant-use.component';

describe('LubricantUseComponent', () => {
  let component: LubricantUseComponent;
  let fixture: ComponentFixture<LubricantUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LubricantUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LubricantUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
