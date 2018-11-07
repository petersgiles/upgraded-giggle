import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { AnnouncementTypeActionTypes, LoadAnnouncementTypes, GetAllAnnouncementTypes, AnnouncementTypesActionFailure } from './announcement-type.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, AnnouncementTypesResult } from '../../models'

@Injectable()
export class AnnouncementTypeEffects {

  @Effect()
  getAllAnnouncementTypes$: Observable<Action> = this.actions$
    .pipe(ofType(AnnouncementTypeActionTypes.GetAllAnnouncementTypes))
    .pipe(
      map((action: GetAllAnnouncementTypes) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterAnnouncementTypes(filter)
        .pipe(
          map((result: DataResult<AnnouncementTypesResult>) => new LoadAnnouncementTypes(result)),
          catchError(error => of(new AnnouncementTypesActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
