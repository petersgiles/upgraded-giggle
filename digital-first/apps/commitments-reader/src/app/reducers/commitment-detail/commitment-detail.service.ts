import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { Commitment, CommitmentLocation, MapPoint } from '../../models/commitment.model'
import { Store } from '@ngrx/store'
import { GetDetailedCommitment } from './commitment-detail.actions'
import { GetCommitmentDetailGQL, BookType } from '../../generated/graphql'
import { map, takeUntil, filter } from 'rxjs/operators'


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
commitment: Commitment
  LoadCommitment(id, bookType){
       return this.getCommitmentDetailGQL
      .watch(
        { id: id, bookType: bookType },
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

  updateHandlingAdvice(value: any, agency: string): Observable<any> {
     const commitment = {
      announcedBy: null,
      announcementType: "Media Report",
      bookType: "Red",
      commitmentType: "National",
      cost: "1",
      criticalDate: "Undefined",
      date: "2018-10-31T00:00:00+11:00",
      description: "Labor has committed to a five year phase out of the live sheep trade. Labor will stop the northern summer sheep trade at the first opportunity and phase out all live sheep exports over time. test",
      electorates: [],
      id: 2,
      politicalParty: "Australian Labor Party",
      portfolio: "Agriculture and Water Resources",
      status: "With Policy Area",
      title: "Phasing Out of Live Sheep Dave",
      PMOHandlingAdvice: null,
      PMCHandlingAdvice: null
     } as Commitment

     if(agency === 'PMO'){
       commitment.PMOHandlingAdvice = value.label
     }

     if(agency === 'PMC'){
      commitment.PMCHandlingAdvice = value.label
    }
     return of(commitment)
  }

  /*setCostingRequired(payload: {commitment: number, costingRequired: boolean}): Observable<DataResult<CommitmentResult>> {
    const variables = {
        id: payload.commitment,
        costingRequired: payload.costingRequired
    }

    return callMutate<CommitmentResult>(this.apollo,
      { mutation: SET_COSTING_REQUIRED, variables: variables },
      (result: any) => ({ data: { commitment: result.data.setCostingRequired.id } }))

  }*/

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
