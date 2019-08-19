import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefProcessingInstructionComponent } from './brief-processing-instruction.component';

describe('BriefProcessingInstructionComponent', () => {
  let component: BriefProcessingInstructionComponent;
  let fixture: ComponentFixture<BriefProcessingInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefProcessingInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefProcessingInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
