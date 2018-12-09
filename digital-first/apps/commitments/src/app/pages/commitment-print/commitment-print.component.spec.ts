import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitmentPrintComponent } from './commitment-print.component';

describe('CommitmentPrintComponent', () => {
  let component: CommitmentPrintComponent;
  let fixture: ComponentFixture<CommitmentPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitmentPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
