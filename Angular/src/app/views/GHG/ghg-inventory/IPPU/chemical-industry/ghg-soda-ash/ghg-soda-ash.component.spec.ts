import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgSodaAshComponent } from './ghg-soda-ash.component';

describe('GhgSodaAshComponent', () => {
  let component: GhgSodaAshComponent;
  let fixture: ComponentFixture<GhgSodaAshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgSodaAshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgSodaAshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
