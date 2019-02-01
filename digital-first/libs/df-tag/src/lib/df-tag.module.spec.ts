import { async, TestBed } from '@angular/core/testing';
import { DfTagModule } from './df-tag.module';

describe('DfTagModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfTagModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DfTagModule).toBeDefined();
  });
});
