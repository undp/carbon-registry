import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfbbComponent } from './efbb.component';

describe('EfbbComponent', () => {
  let component: EfbbComponent;
  let fixture: ComponentFixture<EfbbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfbbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfbbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
