import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdcComponent } from './ndc.component';

describe('NdcComponent', () => {
  let component: NdcComponent;
  let fixture: ComponentFixture<NdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
