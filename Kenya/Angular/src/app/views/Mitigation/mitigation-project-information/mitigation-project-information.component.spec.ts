import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitigationProjectInformationComponent } from './mitigation-project-information.component';

describe('MitigationProjectInformationComponent', () => {
  let component: MitigationProjectInformationComponent;
  let fixture: ComponentFixture<MitigationProjectInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitigationProjectInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitigationProjectInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
