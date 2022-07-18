import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseIppuComponent } from './database-ippu.component';

describe('DatabaseIppuComponent', () => {
  let component: DatabaseIppuComponent;
  let fixture: ComponentFixture<DatabaseIppuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseIppuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseIppuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
