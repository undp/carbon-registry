import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgTableComponent } from './ghg-table.component';

describe('GhgTableComponent', () => {
  let component: GhgTableComponent;
  let fixture: ComponentFixture<GhgTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
