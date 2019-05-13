import { Observable, of } from 'rxjs'
import { first } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Commitment, CommitmentLocation, MapPoint, HandlingAdvices } from '../../models/commitment.model'
import { Store, select } from '@ngrx/store'
import { GetDetailedCommitment, GetHandlingAdvices, SetPMCHandlingAdviceResult, SetPMOHandlingAdviceResult } from './commitment-detail.actions'
import { GetCommitmentDetailGQL, GetHandlingAdvicesGQL, UpdatePmcHandlingAdviceCommitmentGQL, UpdatePmoHandlingAdviceCommitmentGQL } from '../../generated/graphql'
import { map} from 'rxjs/operators'
import * as fromRoot from '../user'

@Injectable({
  providedIn: 'root'
})

export class CommitmentDetailService {
  constructor(private getCommitmentDetailGQL: GetCommitmentDetailGQL, 
    private getHandlingAdvicesGQL: GetHandlingAdvicesGQL, 
    private updatePmcHandlingAdviceCommitmentGQL: UpdatePmcHandlingAdviceCommitmentGQL, 
    private updatePmoHandlingAdviceCommitmentGQL: UpdatePmoHandlingAdviceCommitmentGQL,
    private store: Store<any>) {}

  get Notification(): Observable<string> {
    return of(null)
  }

  get UserOperation(): Observable<any> {
    return this.store.pipe(
        select(fromRoot.User.getCurrentUserOperations),

    )
}

  getCurrentUser(action): Observable<any> {
    let commitments = action.result.payload
    return commitments
  }
commitment: Commitment
  LoadCommitment(id, bookType){
       return this.getCommitmentDetailGQL
      .watch(
        { id: id, book: bookType },
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
            PMCHandlingAdvice: dbItem[0].pmcHandlingAdvice ? dbItem[0].pmcHandlingAdvice.title
            : '',
            PMOHandlingAdvice: dbItem[0].pmoHandlingAdvice ? dbItem[0].pmoHandlingAdvice.title
            : ''
           // mapPoints: this.handleMapPoints(dbItem[0].commitmentMapPoints)
          
          }

         this.store.dispatch(new GetDetailedCommitment({commitment}))
         this.store.dispatch(new SetPMOHandlingAdviceResult({res: commitment.PMOHandlingAdvice}))
         this.store.dispatch(new SetPMCHandlingAdviceResult({res: commitment.PMCHandlingAdvice}))
        }
      })
  }



  updatePmcHandlingAdviceCommitment(pmcItem: any) {
  this.updatePmcHandlingAdviceCommitmentGQL
    .mutate(
      {
        messageId: this.generateUUID(),
        conversationId: this.generateUUID(),
        data: {
          commitmentId: pmcItem.commitmentId,
          handlingAdviceId: pmcItem.value
        }
      },
      {}
    )
    .pipe(first())
    .subscribe(value => {
      if(value.data.updatePmcHandlingAdviceCommitment.id){
          this.store.dispatch(new SetPMCHandlingAdviceResult({res: pmcItem.label}))
      }
    })
}

updatePmoHandlingAdviceCommitment(pmoItem: any) {
  this.updatePmoHandlingAdviceCommitmentGQL
    .mutate(
      {
        messageId: this.generateUUID(),
        conversationId: this.generateUUID(),
        data: {
          commitmentId: pmoItem.commitmentId,
          handlingAdviceId: pmoItem.value
        }
      },
      {}
    )
    .pipe(first())
    .subscribe(value => {
      if(value.data.updatePmoHandlingAdviceCommitment.id){
        this.store.dispatch(new SetPMOHandlingAdviceResult({res: pmoItem.label}))
      }
    })
}

  getHandlingAdvices(){
    return this.getHandlingAdvicesGQL
    .watch(
      { fetchPolicy: 'network-only' }
    )
    .valueChanges.pipe(map(value => value.data.handlingAdvices))
    .subscribe(dbItem => {
      if (dbItem) {
        const advices = dbItem.map(item => ({value: item.id, label: item.title}),
      )
      this.store.dispatch(new GetHandlingAdvices({advices}))
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

  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
}
