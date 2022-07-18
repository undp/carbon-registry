import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WastePopulationComponent } from './waste-population.component';

describe('WastePopulationComponent', () => {
  let component: WastePopulationComponent;
  let fixture: ComponentFixture<WastePopulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WastePopulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WastePopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
