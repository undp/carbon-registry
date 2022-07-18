import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FugitiveEmissionFactorComponent } from './fugitive-emission-factor.component';

describe('FugitiveEmissionFactorComponent', () => {
  let component: FugitiveEmissionFactorComponent;
  let fixture: ComponentFixture<FugitiveEmissionFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FugitiveEmissionFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FugitiveEmissionFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
