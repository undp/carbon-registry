import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNdcComponent } from './create-ndc.component';

describe('CreateNdcComponent', () => {
  let component: CreateNdcComponent;
  let fixture: ComponentFixture<CreateNdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
