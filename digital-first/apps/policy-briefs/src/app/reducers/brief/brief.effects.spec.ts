import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BriefEffects } from './brief.effects';

describe('BriefEffects', () => {
  let actions$: Observable<any>;
  let effects: BriefEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BriefEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(BriefEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
