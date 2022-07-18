import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionfactorLivestockComponent } from './emissionfactor-livestock.component';

describe('EmissionfactorLivestockComponent', () => {
  let component: EmissionfactorLivestockComponent;
  let fixture: ComponentFixture<EmissionfactorLivestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmissionfactorLivestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissionfactorLivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
