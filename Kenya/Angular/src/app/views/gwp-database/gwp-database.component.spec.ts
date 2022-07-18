import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwpDatabaseComponent } from './gwp-database.component';

describe('GwpDatabaseComponent', () => {
  let component: GwpDatabaseComponent;
  let fixture: ComponentFixture<GwpDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwpDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwpDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
