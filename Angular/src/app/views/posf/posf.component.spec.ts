import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosfComponent } from './posf.component';

describe('PosfComponent', () => {
  let component: PosfComponent;
  let fixture: ComponentFixture<PosfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
