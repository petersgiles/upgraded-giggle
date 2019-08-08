import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LookupEffects } from './lookup.effects';

describe('LookupEffects', () => {
  let actions$: Observable<any>;
  let effects: LookupEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LookupEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LookupEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
