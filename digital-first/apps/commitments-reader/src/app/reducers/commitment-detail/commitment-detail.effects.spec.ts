import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CommitmentDetailEffects } from './commitment-detail.effects';

describe('CommitmentDetailEffects', () => {
  let actions$: Observable<any>;
  let effects: CommitmentDetailEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommitmentDetailEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(CommitmentDetailEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

});
