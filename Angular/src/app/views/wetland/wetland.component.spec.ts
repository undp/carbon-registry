import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetlandComponent } from './wetland.component';

describe('WetlandComponent', () => {
  let component: WetlandComponent;
  let fixture: ComponentFixture<WetlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
