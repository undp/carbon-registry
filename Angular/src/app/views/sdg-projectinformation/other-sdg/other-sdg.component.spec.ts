import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSdgComponent } from './other-sdg.component';

describe('OtherSdgComponent', () => {
  let component: OtherSdgComponent;
  let fixture: ComponentFixture<OtherSdgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSdgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSdgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
