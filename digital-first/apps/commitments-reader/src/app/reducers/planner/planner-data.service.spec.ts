import { TestBed } from '@angular/core/testing';

import { PlannerDataService } from './planner-data.service';

describe('PlannerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlannerDataService = TestBed.get(PlannerDataService);
    expect(service).toBeTruthy();
  });
});
