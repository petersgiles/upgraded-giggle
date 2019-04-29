import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { NavigationEffects } from './navigation.effects';

describe('NavigationEffects', () => {
  let actions$: Observable<any>;
  let effects: NavigationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(NavigationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
