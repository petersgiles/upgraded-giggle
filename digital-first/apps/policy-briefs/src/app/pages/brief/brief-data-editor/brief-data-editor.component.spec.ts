import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefDataEditorComponent } from './brief-data-editor.component';

describe('BriefDataEditorComponent', () => {
  let component: BriefDataEditorComponent;
  let fixture: ComponentFixture<BriefDataEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefDataEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
