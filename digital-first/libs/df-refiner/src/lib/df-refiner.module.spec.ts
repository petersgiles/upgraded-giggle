import { async, TestBed } from '@angular/core/testing';
import { DfRefinerModule } from './df-refiner.module';

describe('DfRefinerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfRefinerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DfRefinerModule).toBeDefined();
  });
});
