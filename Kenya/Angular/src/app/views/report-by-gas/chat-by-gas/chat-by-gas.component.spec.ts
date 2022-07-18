import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatByGasComponent } from './chat-by-gas.component';

describe('ChatByGasComponent', () => {
  let component: ChatByGasComponent;
  let fixture: ComponentFixture<ChatByGasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatByGasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatByGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
