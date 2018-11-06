import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { ContactActionTypes, LoadContacts, GetAllContacts, ContactsActionFailure } from './contact.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, ContactsResult } from '../../models'

@Injectable()
export class ContactEffects {

  @Effect()
  getAllContacts$: Observable<Action> = this.actions$
    .ofType(ContactActionTypes.GetAllContacts)
    .pipe(
      map((action: GetAllContacts) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterContacts(filter)
        .pipe(
          map((result: DataResult<ContactsResult>) => new LoadContacts(result)),
          catchError(error => of(new ContactsActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
