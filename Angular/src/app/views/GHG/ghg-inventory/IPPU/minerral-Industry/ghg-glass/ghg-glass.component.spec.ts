import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgGlassComponent } from './ghg-glass.component';

describe('GhgGlassComponent', () => {
  let component: GhgGlassComponent;
  let fixture: ComponentFixture<GhgGlassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgGlassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgGlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
