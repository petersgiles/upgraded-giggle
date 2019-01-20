import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import {
  RelatedLinkActionTypes,
  LoadRelatedLinks,
  RelatedLinksActionFailure,
  GetRelatedLinksByCommitment,
  AddLinkToCommitment,
  RemoveLinkFromCommitment
} from './related-link.actions'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

import { DataResult, RelatedLinksResult } from '../../models'
import { AppNotification, ClearAppNotification } from '../app.actions'
import { SetCurrentCommitment } from '../commitment/commitment.actions'
import { RelatedLinkDataService } from './related-link-data.service'

@Injectable()
export class RelatedLinkEffects {
  @Effect()
  addLinkToCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(RelatedLinkActionTypes.AddLinkToCommitment),
    map((action: AddLinkToCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.addItemToCommitment(payload).pipe(
        // tslint:disable-next-line:no-console
        tap(result => console.log(result)),
        switchMap((result: any) => [
          new AppNotification({ message: 'Related Link Added' }),
          new SetCurrentCommitment({ id: result.commitment.id }),
          new ClearAppNotification()
        ])
      )
    ),
    catchError(error => of(new RelatedLinksActionFailure(error)))
  )

  @Effect()
  removeLinkFromCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(RelatedLinkActionTypes.RemoveLinkFromCommitment),
    map((action: RemoveLinkFromCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.removeItemFromCommitment(payload)
      .pipe(
        // tslint:disable-next-line:no-console
        tap(result => console.log(result)),
        switchMap((result: any) => [
          new AppNotification({ message: 'Related Link Removed' }),
          new SetCurrentCommitment({ id: result.commitment.id }),
          new ClearAppNotification()
        ])
      )
    ),
    catchError(error => of(new RelatedLinksActionFailure(error)))
  )

  @Effect()
  getRelatedLinksByCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(RelatedLinkActionTypes.GetRelatedLinksByCommitment),
    map((action: GetRelatedLinksByCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.getItemsByCommitment(payload.commitment).pipe(
        map(
          (result: DataResult<RelatedLinksResult>) =>
            new LoadRelatedLinks(result)
        ),
        catchError(error => of(new RelatedLinksActionFailure(error)))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private service: RelatedLinkDataService
  ) {}
}
