import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgConfigComponent } from './ghg-config.component';

describe('GhgConfigComponent', () => {
  let component: GhgConfigComponent;
  let fixture: ComponentFixture<GhgConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
