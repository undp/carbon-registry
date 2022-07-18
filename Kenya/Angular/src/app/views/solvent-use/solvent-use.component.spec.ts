import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolventUseComponent } from './solvent-use.component';

describe('SolventUseComponent', () => {
  let component: SolventUseComponent;
  let fixture: ComponentFixture<SolventUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolventUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolventUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
