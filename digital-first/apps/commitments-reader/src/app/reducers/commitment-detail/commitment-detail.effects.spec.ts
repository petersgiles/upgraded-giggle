import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CommitmentDetailEffects } from './commitment-detail.effects';

import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

describe('DogComponent', () => {
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });

    controller = TestBed.get(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });
});

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
