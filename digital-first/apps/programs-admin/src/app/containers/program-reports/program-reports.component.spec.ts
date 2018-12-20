import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramReportsComponent } from './program-reports.component';

describe('ProgramReportsComponent', () => {
  let component: ProgramReportsComponent;
  let fixture: ComponentFixture<ProgramReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
