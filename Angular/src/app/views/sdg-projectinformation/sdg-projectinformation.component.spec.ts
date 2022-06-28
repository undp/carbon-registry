import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgProjectinformationComponent } from './sdg-projectinformation.component';

describe('SdgProjectinformationComponent', () => {
  let component: SdgProjectinformationComponent;
  let fixture: ComponentFixture<SdgProjectinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdgProjectinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgProjectinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
