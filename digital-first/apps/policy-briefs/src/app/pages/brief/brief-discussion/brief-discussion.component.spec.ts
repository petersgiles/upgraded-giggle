import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefDiscussionComponent } from './brief-discussion.component';

describe('BriefDiscussionComponent', () => {
  let component: BriefDiscussionComponent;
  let fixture: ComponentFixture<BriefDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
