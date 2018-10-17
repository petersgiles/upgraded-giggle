import { async, TestBed } from '@angular/core/testing';
import { DfPagesModule } from './df-pages.module';

describe('DfPagesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfPagesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DfPagesModule).toBeDefined();
  });
});
