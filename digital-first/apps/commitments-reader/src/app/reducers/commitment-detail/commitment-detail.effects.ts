import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
  concatMap,
  filter,
  switchMap,
  map,
  withLatestFrom,
  tap,
  catchError,
  first
} from 'rxjs/operators'
import { RouteChange, CHANGE, ofRoute } from '../router.actions'
import * as fromRoot from '../../reducers'
import { EMPTY, of } from 'rxjs'
import {
  CommitmentDetailActionTypes,
  CommitmentDetailActions,
  LoadDetailedCommitment,
  LoadHandlingAdvices,
  GetDetailedCommitmentFailure,
  GetHandlingAdvicesFailure,
  UpdatePMCHandlingAdviceFailure,
  UpdatePMOHandlingAdviceFailure,
  GetHandlingAdvices,
  SetPMOHandlingAdviceResult,
  SetPMCHandlingAdviceResult
} from './commitment-detail.actions'

import {
  GetCommitmentDetailGQL,
  GetHandlingAdvicesGQL,
  UpdatePmcHandlingAdviceCommitmentGQL,
  UpdatePmoHandlingAdviceCommitmentGQL
} from '../../generated/graphql'
import { Config } from '../../services/config/config-model'
import { Store } from '@ngrx/store'

const generateUUID = () => {
  // Public Domain/MIT
  let d = new Date().getTime()
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line: no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    // tslint:disable-next-line: no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

const mapHandlingadvice = (item): any => {
  if (item && item[0]) {
    const handlingAdvice = item[0].handlingAdvice
    return handlingAdvice.value
  }
  return null
}

const mapCommitmentDetail = (item): any => {
  // tslint:disable-next-line: no-console
  console.log(`🤡 item`, item)

  const mapResult = {
    id: item.id,
    title: item.title,
    description: item.description,
    bookType: item.bookType,
    cost: item.cost,
    date: item.date,
    politicalParty: item.politicalParty,
    announcedBy: item.announcedBy,
    commitmentType: item.commitmentType ? item.commitmentType.title : '',
    status: item.status ? item.status.title : '',
    announcementType: item.announcementType ? item.announcementType.title : '',
    criticalDate: item.criticalDate ? item.criticalDate.title : '',
    portfolio: item.portfolioLookup ? item.portfolioLookup.title : '',
    // electorates: this.handleElectorates(item.commitmentLocations)
    pmcHandlingAdvice: mapHandlingadvice(item.pmcHandlingAdviceCommitments),
    pmoHandlingAdvice: mapHandlingadvice(item.pmoHandlingAdviceCommitments)
  }
  console.log(`🤡 item`, mapResult)
  return mapResult
}

@Injectable()
export class CommitmentDetailEffects {
  constructor(
    private actions$: Actions<CommitmentDetailActions>,
    private store$: Store<fromRoot.State>,
    private getCommitmentDetailGQL: GetCommitmentDetailGQL,
    private getHandlingAdvicesGQL: GetHandlingAdvicesGQL,
    private updatePmcHandlingAdviceCommitmentGQL: UpdatePmcHandlingAdviceCommitmentGQL,
    private updatePmoHandlingAdviceCommitmentGQL: UpdatePmoHandlingAdviceCommitmentGQL
  ) {}

  @Effect()
  loadCommitmentDetails$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.GetDetailedCommitment),
    withLatestFrom(this.store$),
    map(([a, s]) => {
      const store = <any>s
      const action = <any>a
      const config: Config = store.app.config
      const bookType = config.header.bookType
      const webId = config.webId
      const siteId = config.siteId
      return {
        id: action.payload.id,
        book: bookType,
        webId: [webId],
        siteId: [siteId]
      }
    }),

    switchMap(config =>
      this.getCommitmentDetailGQL.fetch(config).pipe(
        first(),
        map(result => result.data.commitments[0]),
        // tslint:disable-next-line: no-console
        tap(result => console.log(`🤡 getCommitmentDetailGQL_1`, result)),
        map(mapCommitmentDetail),
        // tslint:disable-next-line: no-console
        tap(result => console.log(`🤡 getCommitmentDetailGQL_2`, result)),
        concatMap(result => [
          new LoadDetailedCommitment(result),
          new GetHandlingAdvices(null)
        ])
      )
    ),
    catchError(error => of(new GetDetailedCommitmentFailure(error)))
  )

  @Effect()
  getHandlingAdvices$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.GetHandlingAdvices),
    withLatestFrom(this.store$),
    map(([a, s]) => {
      const store = <any>s
      const action = <any>a
      const config: Config = store.app.config
      const bookType = config.header.bookType
      const webId = config.webId
      const siteId = config.siteId
      return {
        book: bookType,
        webId: [webId],
        siteId: [siteId]
      }
    }),
    switchMap(config =>
      this.getHandlingAdvicesGQL.fetch(config).pipe(
        first(),
        map(result => result.data.handlingAdvices),
        // tslint:disable-next-line: no-console
        tap(result => console.log(`🤡 GetHandlingAdvices`, result)),
        concatMap(advices => [new LoadHandlingAdvices({ advices })])
      )
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`🤢 GetHandlingAdvicesFailure`, error)
      return of(new GetHandlingAdvicesFailure(error))
    })
  )

  @Effect()
  updatePMOHandlingAdvice$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.UpdatePMOHandlingAdvice),
    withLatestFrom(this.store$),
    map(([a, s]) => {
      const store = <any>s
      const action = <any>a
      const config: Config = store.app.config
      const webId = config.webId
      const siteId = config.siteId

      const commitmentId = store.commitmentDetail.commitment.id
      return {
        messageId: generateUUID(),
        conversationId: generateUUID(),
        data: {
          commitmentId: commitmentId,
          handlingAdviceId: action.payload.handlingAdviceId,
          webId: webId,
          siteId: siteId
        }
      }
    }),
    switchMap(config =>
      this.updatePmoHandlingAdviceCommitmentGQL.mutate(config, {}).pipe(
        first(),
        map(response => response.data.updatePmoHandlingAdviceCommitment.id),
        concatMap(response => [
          new SetPMOHandlingAdviceResult({
            handlingAdviceId: config.data.handlingAdviceId
          })
        ])
      )
    ),
    catchError(error => of(new UpdatePMOHandlingAdviceFailure(error)))
  )

  @Effect()
  updatePMCHandlingAdvice$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.UpdatePMCHandlingAdvice),
    withLatestFrom(this.store$),
    map(([a, s]) => {
      const store = <any>s
      const action = <any>a
      const config: Config = store.app.config
      const webId = config.webId
      const siteId = config.siteId
      const commitmentId = store.commitmentDetail.commitment.id
      return {
        messageId: generateUUID(),
        conversationId: generateUUID(),
        data: {
          commitmentId: commitmentId,
          handlingAdviceId: action.payload.handlingAdviceId,
          webId: webId,
          siteId: siteId
        }
      }
    }),
    switchMap(config =>
      this.updatePmcHandlingAdviceCommitmentGQL.mutate(config, {}).pipe(
        first(),
        map(response => response.data.updatePmcHandlingAdviceCommitment.id),
        concatMap(response => [
          new SetPMCHandlingAdviceResult({
            handlingAdviceId: config.data.handlingAdviceId
          })
        ])
      )
    ),
    catchError(error => {
      console.log(`UpdatePMCHandlingAdviceFailure`, error)
      return of(new UpdatePMCHandlingAdviceFailure(error))
    })
  )
}

//     this.updatePmcHandlingAdviceCommitmentGQL
//       .mutate(
//         {
//           messageId: this.generateUUID(),
//           conversationId: this.generateUUID(),
//           data: {
//             commitmentId: pmcItem.commitmentId,
//             handlingAdviceId: pmcItem.value
//           }
//         },
//         {}
//       )
//       .pipe(first())
//       .subscribe(value => {
//         if (value.data.updatePmcHandlingAdviceCommitment.id) {
//           this.store.dispatch(
//             new SetPMCHandlingAdviceResult({ res: pmcItem.label })
//           )
//         }
//       })

//  @Effect()
// loadCommitmentDetails$ = this.actions$.pipe(
//   ofType(CommitmentDetailActionTypes.GetDetailedCommitment),
//   switchMap((criteria: { id: string, brief: string}) => {
//     return this.getCommitmentDetailGQL.fetch(criteria)
//   }))

// LoadCommitment(id, bookType) {
//   return this.getCommitmentDetailGQL
//     .watch({ id: id, book: bookType }, { fetchPolicy: 'network-only' })
//     .valueChanges.pipe(
//       map(value =>
//         value.data.commitments ? value.data.commitments[0] : null
//       ),
//       filter(result => result !== null)
//     )
//     .subscribe(dbItem => {
//       const commitment: Commitment = {
//         id: dbItem.id,
//         title: dbItem.title,
//         description: dbItem.description,
//         bookType: dbItem.bookType,
//         cost: dbItem.cost,
//         date: dbItem.date,
//         politicalParty: dbItem.politicalParty,
//         announcedBy: dbItem.announcedBy,
//         commitmentType: dbItem.commitmentType
//           ? dbItem.commitmentType.title
//           : '',
//         status: dbItem.status ? dbItem.status.title : '',
//         announcementType: dbItem.announcementType
//           ? dbItem.announcementType.title
//           : '',
//         criticalDate: dbItem.criticalDate ? dbItem.criticalDate.title : '',
//         portfolio: dbItem.portfolioLookup ? dbItem.portfolioLookup.title : '',
//         electorates: this.handleElectorates(dbItem.commitmentLocations),
//         PMCHandlingAdvice: dbItem.pmcHandlingAdvice
//           ? dbItem.pmcHandlingAdvice.title
//           : '',
//         PMOHandlingAdvice: dbItem.pmoHandlingAdvice
//           ? dbItem.pmoHandlingAdvice.title
//           : ''
//         // mapPoints: this.handleMapPoints(dbItem.commitmentMapPoints)
//       }

//       this.store.dispatch(new GetDetailedCommitment({ commitment }))
//       this.store.dispatch(
//         new SetPMOHandlingAdviceResult({
//           res: commitment.PMOHandlingAdvice
//         })
//       )
//       this.store.dispatch(
//         new SetPMCHandlingAdviceResult({
//           res: commitment.PMCHandlingAdvice
//         })
//       )
//     })
// }

//     return of(result)
//   }),
//   map((action: any) => action.payload),
//   map(result => new LoadDetailedCommitment(result))
// )

// @Effect()
// loadHandlinfAdvices$ = this.actions$.pipe(
//   ofType(CommitmentDetailActionTypes.GetHandlingAdvices),
//   switchMap((result: any) => {

//     return of(result)
//   }),
//   map((action: any) => action.payload),
//   map(result => new LoadHandlingAdvices(result))
// )

// @Effect()
// updatePMOHandlingAdvice$ = this.actions$
//   .pipe(
//     ofType(CommitmentDetailActionTypes.UpdatePMOHandlingAdvice),
//     map((action: any) => action.payload),
//     switchMap((value: any) => [this.commitmentDetailService.updatePmoHandlingAdviceCommitment(value)]

//   ))

//   @Effect()
// updatePMCHandlingAdvice$ = this.actions$
//   .pipe(
//     ofType(CommitmentDetailActionTypes.UpdatePMCHandlingAdvice),
//     map((action: any) => action.payload),
//     switchMap((value: any) => [this.commitmentDetailService.updatePmcHandlingAdviceCommitment(value)]

//   ))

/*@Effect()
  updatePMOHandlingAdvice$ = this.actions$
    .pipe(
      ofType(CommitmentDetailActionTypes.UpdatePMOHandlingAdvice),
      map((action: any) => action.payload),
      switchMap((value: any) => 
        {
          return this.commitmentDetailService.updatePmoHandlingAdviceCommitment(value)
          .pipe( map((result: Commitment) => new LoadDetailedCommitment({commitment: result}))
          )}  
    ))

  @Effect()
  updatePMCHandlingAdvice$ = this.actions$
    .pipe(
      ofType(CommitmentDetailActionTypes.UpdatePMCHandlingAdvice),
      map((action: any) => action.payload),
      switchMap((value: any) => 
        {
          return this.commitmentDetailService.updatePmcHandlingAdviceCommitment(value)
          .pipe( map((result: Commitment) => new LoadDetailedCommitment({commitment: result}))
          )}  
    ))*/

// @Effect()
// commitmentDetailsRouted$ = this.actions$.pipe(
//   ofType(CHANGE),
//   filter((routeChangeAction: RouteChange) => routeChangeAction.payload.path === 'commitment/:id'),
//    concatMap((action) => this.commitmentDetailService.getCurrentUser({action}))
//   //new LoadCommitmentActions({ actions: result.data.commitmentActions })),
// )

// @Effect() commitmentRouted = this.actions$.pipe(ofRoute('commitmentDetail/:id'))
//}

// import { Observable, of } from 'rxjs'
// import { first, filter } from 'rxjs/operators'
// import { Injectable } from '@angular/core'
// import {
//   Commitment,
//   CommitmentLocation,
//   MapPoint,
//   HandlingAdvices
// } from '../../models/commitment.model'
// import { Store, select } from '@ngrx/store'
// import {
//   GetDetailedCommitment,
//   GetHandlingAdvices,
//   SetPMCHandlingAdviceResult,
//   SetPMOHandlingAdviceResult
// } from './commitment-detail.actions'
// import {
//   GetCommitmentDetailGQL,
//   GetHandlingAdvicesGQL,
//   UpdatePmcHandlingAdviceCommitmentGQL,
//   UpdatePmoHandlingAdviceCommitmentGQL
// } from '../../generated/graphql'
// import { map } from 'rxjs/operators'
// import * as fromRoot from '../user'

// @Injectable({
//   providedIn: 'root'
// })
// export class CommitmentDetailService {
//   constructor(
//     private getCommitmentDetailGQL: GetCommitmentDetailGQL,
//     private getHandlingAdvicesGQL: GetHandlingAdvicesGQL,
//     private updatePmcHandlingAdviceCommitmentGQL: UpdatePmcHandlingAdviceCommitmentGQL,
//     private updatePmoHandlingAdviceCommitmentGQL: UpdatePmoHandlingAdviceCommitmentGQL,
//     private store: Store<any>
//   ) {}

//   loadCommitment(criteria) {
//     this.store.dispatch(new GetDetailedCommitment(criteria))
//    }
//   commitment: Commitment

//   updatePmcHandlingAdviceCommitment(pmcItem: any) {
//     this.updatePmcHandlingAdviceCommitmentGQL
//       .mutate(
//         {
//           messageId: this.generateUUID(),
//           conversationId: this.generateUUID(),
//           data: {
//             commitmentId: pmcItem.commitmentId,
//             handlingAdviceId: pmcItem.value
//           }
//         },
//         {}
//       )
//       .pipe(first())
//       .subscribe(value => {
//         if (value.data.updatePmcHandlingAdviceCommitment.id) {
//           this.store.dispatch(
//             new SetPMCHandlingAdviceResult({ res: pmcItem.label })
//           )
//         }
//       })
//   }

//   updatePmoHandlingAdviceCommitment(pmoItem: any) {
//     this.updatePmoHandlingAdviceCommitmentGQL
//       .mutate(
//         {
//           messageId: this.generateUUID(),
//           conversationId: this.generateUUID(),
//           data: {
//             commitmentId: pmoItem.commitmentId,
//             handlingAdviceId: pmoItem.value
//           }
//         },
//         {}
//       )
//       .pipe(first())
//       .subscribe(value => {
//         if (value.data.updatePmoHandlingAdviceCommitment.id) {
//           this.store.dispatch(
//             new SetPMOHandlingAdviceResult({ res: pmoItem.label })
//           )
//         }
//       })
//   }

//   getHandlingAdvices() {
//     return this.getHandlingAdvicesGQL
//       .watch({ fetchPolicy: 'network-only' })
//       .valueChanges.pipe(map(value => value.data.handlingAdvices))
//       .subscribe(dbItem => {
//         if (dbItem) {
//           const advices = dbItem.map(item => ({
//             value: item.id,
//             label: item.title
//           }))
//           this.store.dispatch(new GetHandlingAdvices({ advices }))
//         }
//       })
//   }

//   updateHandlingAdvice(value: any, agency: string): Observable<any> {
//     const commitment = {
//       announcedBy: null,
//       announcementType: 'Media Report',
//       bookType: 'Red',
//       commitmentType: 'National',
//       cost: '1',
//       criticalDate: 'Undefined',
//       date: '2018-10-31T00:00:00+11:00',
//       description:
//         'Labor has committed to a five year phase out of the live sheep trade. Labor will stop the northern summer sheep trade at the first opportunity and phase out all live sheep exports over time. test',
//       electorates: [],
//       id: 2,
//       politicalParty: 'Australian Labor Party',
//       portfolio: 'Agriculture and Water Resources',
//       status: 'With Policy Area',
//       title: 'Phasing Out of Live Sheep Dave',
//       PMOHandlingAdvice: null,
//       PMCHandlingAdvice: null
//     } as Commitment

//     if (agency === 'PMO') {
//       commitment.PMOHandlingAdvice = value.label
//     }

//     if (agency === 'PMC') {
//       commitment.PMCHandlingAdvice = value.label
//     }
//     return of(commitment)
//   }

//   /*setCostingRequired(payload: {commitment: number, costingRequired: boolean}): Observable<DataResult<CommitmentResult>> {
//     const variables = {
//         id: payload.commitment,
//         costingRequired: payload.costingRequired
//     }

//     return callMutate<CommitmentResult>(this.apollo,
//       { mutation: SET_COSTING_REQUIRED, variables: variables },
//       (result: any) => ({ data: { commitment: result.data.setCostingRequired.id } }))

//   }*/

//   handleMapPoints(commitmentMapPoints) {
//     let mapPoint: MapPoint[]
//     if (commitmentMapPoints && commitmentMapPoints.length) {
//       commitmentMapPoints.map(mapPoint => {
//         mapPoint.push({ id: mapPoint.id, title: mapPoint.title })
//       })
//     }
//     return mapPoint
//   }

//   handleElectorates(commitmentLocations) {
//     let commitmentLoation: CommitmentLocation[] = []
//     if (commitmentLocations && commitmentLocations.length) {
//       commitmentLocations.map(electorate => {
//         commitmentLoation.push({
//           id: electorate.location.id,
//           state: electorate.location.state,
//           title: electorate.location.title
//         })
//       })
//     }
//     return commitmentLoation
//   }

//   generateUUID() {
//     // Public Domain/MIT
//     var d = new Date().getTime()
//     if (
//       typeof performance !== 'undefined' &&
//       typeof performance.now === 'function'
//     ) {
//       d += performance.now() //use high-precision timer if available
//     }
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = (d + Math.random() * 16) % 16 | 0
//       d = Math.floor(d / 16)
//       return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
//     })
//   }
// }
