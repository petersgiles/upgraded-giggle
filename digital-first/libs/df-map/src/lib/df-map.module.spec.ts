import { async, TestBed } from '@angular/core/testing';
import { DfMapModule } from './df-map.module';

describe('DfMapModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfMapModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DfMapModule).toBeDefined();
  });
});
