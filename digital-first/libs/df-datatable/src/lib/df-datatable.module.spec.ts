import { async, TestBed } from '@angular/core/testing';
import { DfDatatableModule } from './df-datatable.module';

describe('DfDatatableModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfDatatableModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DfDatatableModule).toBeDefined();
  });
});
