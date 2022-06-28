import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WtdComponent } from './wtd.component';

describe('WtdComponent', () => {
  let component: WtdComponent;
  let fixture: ComponentFixture<WtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
