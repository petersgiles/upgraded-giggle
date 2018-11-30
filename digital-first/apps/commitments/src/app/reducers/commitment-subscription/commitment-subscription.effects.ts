import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { switchMap, map, catchError, tap } from 'rxjs/operators'
import { CommitmentSubscriptionDataService } from './commitment-subscription-data.service'
import { CommitmentSubscriptionActionTypes, UnsubscribeFromCommitment, GetSubscriptionsByCommitment, SubscriptionActionFailure,
  SubscribeToCommitment, LoadSubscriptions} from './commitment-subscription.actions'
import { AppNotification, ClearAppNotification } from '../app.actions';

@Injectable()
export class CommitmentSubscriptionEffects {

  // @Effect()
  // getSubscriptionByCommitment$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(CommitmentSubscriptionActionTypes.GetSubscriptionsByCommitment),
  //     map((action: GetSubscriptionsByCommitment) => action.payload.commitment),
  //     // tslint:disable-next-line:no-console
  //     tap(result => console.log('getSubscriptionByCommitment =>  ', result)),
  //     switchMap((commitment: any) => this.service.getSubscriptionsByCommitment(commitment)
  //       .pipe(
  //         // tslint:disable-next-line:no-console
  //         tap(result => console.log('getSubscriptionByCommitment', result)),
  //         map((result: DataResult<SubscriptionResult>) => new LoadSubscriptions(result)),
  //         catchError(error => of(new SubscriptionActionFailure(error)))
  //       )
  //     ))

  @Effect()
  subscribeToCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentSubscriptionActionTypes.SubscribeToCommitment),
      map((action: SubscribeToCommitment) => action.payload),
      switchMap((payload: any) => this.service.subscribeToCommitment(payload)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('storeSubscription', result)),

        switchMap((result: any) => [
          new AppNotification({ message: 'Subscribed to commitment' }),
          new GetSubscriptionsByCommitment({ commitment: result.data.commitment }),
          new ClearAppNotification()

        ]),
          catchError(error => of(new SubscriptionActionFailure(error)))
        )
      ))

  @Effect()
  unsubscribeFromSubscription$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentSubscriptionActionTypes.UnsubscribeFromCommitment),
      map((action: UnsubscribeFromCommitment) => action.payload),
      switchMap((payload: any) => this.service.unsubscribeFromCommitment(payload)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('removeSubscription', result)),
          switchMap((result) => [
            new AppNotification({ message: 'Unsubscribed to commitment' }),
            new GetSubscriptionsByCommitment({ commitment: result.data.commitment }),
            new ClearAppNotification()
          ]),
          catchError(error => of(new SubscriptionActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: CommitmentSubscriptionDataService) { }
}
