import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaisteComponent } from './waiste.component';

describe('WaisteComponent', () => {
  let component: WaisteComponent;
  let fixture: ComponentFixture<WaisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
