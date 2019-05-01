import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RefinerEffects } from './refiner.effects';

describe('RefinerEffects', () => {
  let actions$: Observable<any>;
  let effects: RefinerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RefinerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(RefinerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
