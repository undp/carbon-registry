import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FugitiveEmissionTableComponent } from './fugitive-emission-table.component';

describe('FugitiveEmissionTableComponent', () => {
  let component: FugitiveEmissionTableComponent;
  let fixture: ComponentFixture<FugitiveEmissionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FugitiveEmissionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FugitiveEmissionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
