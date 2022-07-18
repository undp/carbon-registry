import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManureManagementComponent } from './manure-management.component';

describe('ManureManagementComponent', () => {
  let component: ManureManagementComponent;
  let fixture: ComponentFixture<ManureManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManureManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
