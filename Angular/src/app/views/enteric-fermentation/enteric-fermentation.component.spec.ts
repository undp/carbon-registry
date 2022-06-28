import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntericFermentationComponent } from './enteric-fermentation.component';

describe('EntericFermentationComponent', () => {
  let component: EntericFermentationComponent;
  let fixture: ComponentFixture<EntericFermentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntericFermentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntericFermentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
