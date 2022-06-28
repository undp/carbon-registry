import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateProjectinformationComponent } from './climate-projectinformation.component';

describe('ClimateProjectinformationComponent', () => {
  let component: ClimateProjectinformationComponent;
  let fixture: ComponentFixture<ClimateProjectinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimateProjectinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimateProjectinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
