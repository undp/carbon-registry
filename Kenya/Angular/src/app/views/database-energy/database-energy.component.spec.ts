import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseEnergyComponent } from './database-energy.component';

describe('DatabaseEnergyComponent', () => {
  let component: DatabaseEnergyComponent;
  let fixture: ComponentFixture<DatabaseEnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseEnergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
