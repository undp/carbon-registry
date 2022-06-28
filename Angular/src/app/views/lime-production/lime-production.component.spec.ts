import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimeProductionComponent } from './lime-production.component';

describe('LimeProductionComponent', () => {
  let component: LimeProductionComponent;
  let fixture: ComponentFixture<LimeProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimeProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimeProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
