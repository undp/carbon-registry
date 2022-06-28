import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtswComponent } from './btsw.component';

describe('BtswComponent', () => {
  let component: BtswComponent;
  let fixture: ComponentFixture<BtswComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtswComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
