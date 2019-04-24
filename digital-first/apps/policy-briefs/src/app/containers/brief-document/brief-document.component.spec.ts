import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefDocumentComponent } from './brief-document.component';

describe('BriefDocumentComponent', () => {
  let component: BriefDocumentComponent;
  let fixture: ComponentFixture<BriefDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
