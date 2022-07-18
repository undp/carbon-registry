import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiceCultivationComponent } from './rice-cultivation.component';

describe('RiceCultivationComponent', () => {
  let component: RiceCultivationComponent;
  let fixture: ComponentFixture<RiceCultivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiceCultivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiceCultivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
