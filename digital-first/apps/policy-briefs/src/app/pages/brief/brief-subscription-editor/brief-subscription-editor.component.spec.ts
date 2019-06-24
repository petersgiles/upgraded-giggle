import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefSubscriptionEditorComponent } from './brief-subscription-editor.component';

describe('BriefSubscriptionEditorComponent', () => {
  let component: BriefSubscriptionEditorComponent;
  let fixture: ComponentFixture<BriefSubscriptionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefSubscriptionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefSubscriptionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
