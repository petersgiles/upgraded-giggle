import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import {
  CommitmentContactActionTypes,
  AddContactToCommitment,
  RemoveContactFromCommitment,
  CommitmentContactActionFailure,
  GetContactsByCommitment,
  LoadCommitmentContacts,
} from './commitment-contact.actions'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

import { AppNotification, ClearAppNotification } from '../app.actions'
import { CommitmentContactDataService } from './commitment-contact-data.service'
import { DataResult, ContactsResult } from '../../models'

@Injectable()
export class CommitmentContactEffects {

  @Effect()
  getContactsByCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentContactActionTypes.GetContactsByCommitment),
      map((action: GetContactsByCommitment) => action.payload.commitment),
      // tslint:disable-next-line:no-console
      tap(result => console.log('GetContactsByCommitment =>  ', result)),
      switchMap((commitment: any) => this.service.getContactsByCommitment(commitment)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('getContactsByCommitment', result)),
          map((result: DataResult<ContactsResult>) => new LoadCommitmentContacts({ contacts: result.data.contacts })),
          catchError(error => of(new CommitmentContactActionFailure(error)))
        )
      ))

  @Effect()
  addContactToCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentContactActionTypes.AddContactToCommitment),
      map((action: AddContactToCommitment) => action.payload),
      // tslint:disable-next-line:no-console
      tap(result => console.log('addContactToCommitment', result)),
      switchMap((payload: any) => this.service.addContactToCommitment(payload)),
      // tslint:disable-next-line:no-console
      tap(result => console.log('addContactToCommitment', result)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Contact Added' }),
        new GetContactsByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentContactActionFailure(error)))

    )

  @Effect()
  removeContactFromCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentContactActionTypes.RemoveContactFromCommitment),
      map((action: RemoveContactFromCommitment) => action.payload),
      // tslint:disable-next-line:no-console
      tap(result => console.log('removeContactFromCommitment', result)),
      switchMap((payload: any) => this.service.removeContactFromCommitment(payload)),
      // tslint:disable-next-line:no-console
      tap(result => console.log('addContactToCommitment', result)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Contact Removed' }),
        new GetContactsByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentContactActionFailure(error)))

    )

  constructor(private actions$: Actions, private service: CommitmentContactDataService) { }
}
