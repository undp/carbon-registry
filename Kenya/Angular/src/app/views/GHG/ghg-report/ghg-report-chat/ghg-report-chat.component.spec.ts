import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgReportChatComponent } from './ghg-report-chat.component';

describe('GhgReportChatComponent', () => {
  let component: GhgReportChatComponent;
  let fixture: ComponentFixture<GhgReportChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgReportChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgReportChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
