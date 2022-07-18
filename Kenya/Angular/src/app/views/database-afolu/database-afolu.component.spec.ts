import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseAfoluComponent } from './database-afolu.component';

describe('DatabaseAfoluComponent', () => {
  let component: DatabaseAfoluComponent;
  let fixture: ComponentFixture<DatabaseAfoluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseAfoluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseAfoluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
