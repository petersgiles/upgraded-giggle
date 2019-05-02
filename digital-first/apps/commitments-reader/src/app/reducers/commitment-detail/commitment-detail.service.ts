import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { GetCommitmentDetailGQL } from '../../generated/graphql'
import { map, takeUntil, filter } from 'rxjs/operators'
import { Commitment } from '../../models/commitment.model'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDetailService {
  constructor(private getCommitmentDetailGQL: GetCommitmentDetailGQL) {}

  get Notification(): Observable<string> {
    return of(null)
  }

  getCurrentUser(action): Observable<any> {
    let commitments = action.result.payload
    return commitments
  }

  LoadCommitment(id){
   return this.getCommitmentDetailGQL
      .watch(
        { id: id },
        { fetchPolicy: 'network-only' }
      )
      .valueChanges.pipe(map(value => value.data.commitments))
      .subscribe(dbItem => {
        if (dbItem) {
          const commitment: Commitment = {
            id: dbItem[0].id,
            title: dbItem[0].title,
            description: dbItem[0].description,
            bookType: dbItem[0].bookType,
            cost: dbItem[0].cost,
            date: dbItem[0].date,
            politicalParty: dbItem[0].politicalParty,
            announcedBy: dbItem[0].announcedBy,
            announcementType: dbItem[0].announcementType
              ? dbItem[0].announcementType.title
              : '',
            criticalDate: dbItem[0].criticalDate
              ? dbItem[0].criticalDate.title
              : '',
            portfolio: dbItem[0].portfolioLookup
              ? dbItem[0].portfolioLookup.title
              : ''
          }
        }
      })
  }
}
