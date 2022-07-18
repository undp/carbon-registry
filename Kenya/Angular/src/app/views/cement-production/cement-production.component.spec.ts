import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CementProductionComponent } from './cement-production.component';

describe('CementProductionComponent', () => {
  let component: CementProductionComponent;
  let fixture: ComponentFixture<CementProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CementProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CementProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
