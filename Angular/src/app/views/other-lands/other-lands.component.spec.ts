import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherLandsComponent } from './other-lands.component';

describe('OtherLandsComponent', () => {
  let component: OtherLandsComponent;
  let fixture: ComponentFixture<OtherLandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherLandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherLandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
