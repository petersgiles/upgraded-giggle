import { async, TestBed } from '@angular/core/testing';
import { DfMomentModule } from './df-moment.module';

describe('DfMomentModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfMomentModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DfMomentModule).toBeDefined();
  });
});
