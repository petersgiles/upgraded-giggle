import { async, TestBed } from '@angular/core/testing';
import { DfLayoutsModule } from './df-layouts.module';

describe('DfLayoutsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfLayoutsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DfLayoutsModule).toBeDefined();
  });
});
