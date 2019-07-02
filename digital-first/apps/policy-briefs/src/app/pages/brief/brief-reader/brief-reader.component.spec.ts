import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefReaderComponent } from './brief-reader.component';

describe('BriefReaderComponent', () => {
  let component: BriefReaderComponent;
  let fixture: ComponentFixture<BriefReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
