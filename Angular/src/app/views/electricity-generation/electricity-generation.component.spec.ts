import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityGenerationComponent } from './electricity-generation.component';

describe('ElectricityGenerationComponent', () => {
  let component: ElectricityGenerationComponent;
  let fixture: ComponentFixture<ElectricityGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricityGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
