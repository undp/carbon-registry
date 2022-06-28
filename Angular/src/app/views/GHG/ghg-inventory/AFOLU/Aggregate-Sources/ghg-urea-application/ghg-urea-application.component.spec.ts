import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgUreaApplicationComponent } from './ghg-urea-application.component';

describe('GhgUreaApplicationComponent', () => {
  let component: GhgUreaApplicationComponent;
  let fixture: ComponentFixture<GhgUreaApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgUreaApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgUreaApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
