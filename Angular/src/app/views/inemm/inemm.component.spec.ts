import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InemmComponent } from './inemm.component';

describe('InemmComponent', () => {
  let component: InemmComponent;
  let fixture: ComponentFixture<InemmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InemmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InemmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
