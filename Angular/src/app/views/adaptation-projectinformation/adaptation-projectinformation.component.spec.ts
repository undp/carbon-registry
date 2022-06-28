import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptationProjectinformationComponent } from './adaptation-projectinformation.component';

describe('AdaptationProjectinformationComponent', () => {
  let component: AdaptationProjectinformationComponent;
  let fixture: ComponentFixture<AdaptationProjectinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptationProjectinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptationProjectinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
