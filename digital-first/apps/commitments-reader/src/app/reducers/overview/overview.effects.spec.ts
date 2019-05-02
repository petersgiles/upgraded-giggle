import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OverviewEffects } from './overview.effects';

describe('OverviewEffects', () => {
  let actions$: Observable<any>;
  let effects: OverviewEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OverviewEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(OverviewEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
