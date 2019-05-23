import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CommitmentDisplayOrderEffects } from './commitment-display-order.effects';

describe('CommitmentDisplayOrderEffects', () => {
  let actions$: Observable<any>;
  let effects: CommitmentDisplayOrderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommitmentDisplayOrderEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(CommitmentDisplayOrderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
