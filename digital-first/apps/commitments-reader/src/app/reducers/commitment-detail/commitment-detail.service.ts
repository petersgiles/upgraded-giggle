import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { GetCommitmentDetailGQL } from '../../generated/graphql'
import { map } from 'rxjs/operators'
import { Commitment, CommitmentLocation, MapPoint } from '../../models/commitment.model'
import { Store } from '@ngrx/store'
import { GetDetailedCommitment } from './commitment-detail.actions'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDetailService {
  constructor(private getCommitmentDetailGQL: GetCommitmentDetailGQL, private store: Store<any>) {}

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
        { id: id, bookType: "red" },
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
            commitmentType: dbItem[0].commitmentType
            ?dbItem[0].commitmentType.title
            : '', 
            status: dbItem[0].status
            ?dbItem[0].status.title
            : '', 
            announcementType: dbItem[0].announcementType
              ? dbItem[0].announcementType.title
              : '',
            criticalDate: dbItem[0].criticalDate
              ? dbItem[0].criticalDate.title
              : '',
            portfolio: dbItem[0].portfolioLookup
              ? dbItem[0].portfolioLookup.title
              : '',
            electorates: this.handleElectorates(dbItem[0].commitmentLocations),
           // mapPoints: this.handleMapPoints(dbItem[0].commitmentMapPoints)
          
          }

         this.store.dispatch(new GetDetailedCommitment({commitment}))
        }
      })
  }

  handleMapPoints(commitmentMapPoints)
  {
    let mapPoint: MapPoint[]
    if(commitmentMapPoints && commitmentMapPoints.length){
      commitmentMapPoints.map(mapPoint => {mapPoint.push({id: mapPoint.id,  title: mapPoint.title})}) 
    }
    return mapPoint
  }

  handleElectorates(commitmentLocations){
    let commitmentLoation: CommitmentLocation[] = []
    if(commitmentLocations && commitmentLocations.length){
      commitmentLocations.map(electorate => {commitmentLoation.push({id: electorate.location.id, state: electorate.location.state, title: electorate.location.title})}) 
    }
    return commitmentLoation
  }
}
