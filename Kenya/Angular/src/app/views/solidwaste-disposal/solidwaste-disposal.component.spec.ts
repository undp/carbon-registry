import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidwasteDisposalComponent } from './solidwaste-disposal.component';

describe('SolidwasteDisposalComponent', () => {
  let component: SolidwasteDisposalComponent;
  let fixture: ComponentFixture<SolidwasteDisposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolidwasteDisposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolidwasteDisposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
