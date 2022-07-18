import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgFugitiveEmissionsFromFuelsNaturalGasComponent } from './ghg-fugitive-emissions-from-fuels-natural-gas.component';

describe('GhgFugitiveEmissionsFromFuelsNaturalGasComponent', () => {
  let component: GhgFugitiveEmissionsFromFuelsNaturalGasComponent;
  let fixture: ComponentFixture<GhgFugitiveEmissionsFromFuelsNaturalGasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgFugitiveEmissionsFromFuelsNaturalGasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgFugitiveEmissionsFromFuelsNaturalGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
