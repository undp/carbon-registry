import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroplandComponent } from './cropland.component';

describe('CroplandComponent', () => {
  let component: CroplandComponent;
  let fixture: ComponentFixture<CroplandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CroplandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CroplandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
