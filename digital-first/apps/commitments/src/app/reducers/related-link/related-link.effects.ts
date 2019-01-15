import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { RelatedLinkActionTypes, LoadRelatedLinks, GetAllRelatedLinks,
  RelatedLinksActionFailure, GetRelatedLinksByCommitment, StoreRelatedLink } from './related-link.actions'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, RelatedLinksResult } from '../../models'
import { AppNotification, ClearAppNotification } from '../app.actions'

@Injectable()
export class RelatedLinkEffects {

  @Effect()
  getRelatedLinksByCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(RelatedLinkActionTypes.GetRelatedLinksByCommitment),
      map((action: GetRelatedLinksByCommitment) => action.payload),
      switchMap((payload: any) => this.service.getRelatedLinksByCommitment(payload.commitment)
        .pipe(
          map((result: DataResult<RelatedLinksResult>) => new LoadRelatedLinks(result)),
          catchError(error => of(new RelatedLinksActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
