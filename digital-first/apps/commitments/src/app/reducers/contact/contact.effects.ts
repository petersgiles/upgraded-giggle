import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { ContactActionTypes, LoadContacts, GetAllContacts, ContactsActionFailure, StoreContact } from './contact.actions'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, ContactsResult } from '../../models'
import { AppNotification, ClearAppNotification } from '../app.actions'

@Injectable()
export class ContactEffects {

  @Effect()
  getAllContacts$: Observable<Action> = this.actions$
    .pipe(ofType(ContactActionTypes.GetAllContacts))
    .pipe(
      map((action: GetAllContacts) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterContacts(filter)
        .pipe(
          map((result: DataResult<ContactsResult>) => new LoadContacts(result)),
          catchError(error => of(new ContactsActionFailure(error)))
        )
      ))

  @Effect()
  storeContact$: Observable<Action> = this.actions$
    .pipe(ofType(ContactActionTypes.StoreContact))
    .pipe(
      map((action: StoreContact) => action.payload),
      switchMap((payload: any) => this.service.storeContact(payload.contact)),
      switchMap((result: DataResult<ContactsResult>) => [
        new AppNotification({ message: 'Contact Created' }),
        new GetAllContacts(),
        new ClearAppNotification()
      ]),
      catchError(error => of(new ContactsActionFailure(error)))
    )

  constructor(private actions$: Actions, private service: AppDataService) { }
}
