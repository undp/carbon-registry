import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IobwComponent } from './iobw.component';

describe('IobwComponent', () => {
  let component: IobwComponent;
  let fixture: ComponentFixture<IobwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IobwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IobwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
