import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenAccessComponent } from './screen-access.component';

describe('ScreenAccessComponent', () => {
  let component: ScreenAccessComponent;
  let fixture: ComponentFixture<ScreenAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
