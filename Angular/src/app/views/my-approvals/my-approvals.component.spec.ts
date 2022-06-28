import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApprovalsComponent } from './my-approvals.component';

describe('MyApprovalsComponent', () => {
  let component: MyApprovalsComponent;
  let fixture: ComponentFixture<MyApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
