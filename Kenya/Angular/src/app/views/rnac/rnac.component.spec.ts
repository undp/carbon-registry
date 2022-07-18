import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnacComponent } from './rnac.component';

describe('RnacComponent', () => {
  let component: RnacComponent;
  let fixture: ComponentFixture<RnacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
