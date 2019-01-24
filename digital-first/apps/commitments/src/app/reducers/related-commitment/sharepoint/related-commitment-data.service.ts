import { LoggerService } from '@digital-first/df-logging'
import { Injectable } from '@angular/core'
import {
  SharepointJsomService,
  idFromLookup
} from '@digital-first/df-sharepoint'
import { RelatedCommitmentDataService } from '../related-commitment-data.service'
import { Observable, of } from 'rxjs'
import { DataResult, RelatedCommitmentsResult } from '../../../models'
import { concatMap, map, tap } from 'rxjs/operators'
import {
  byCommitmentIdQuery,
  byIdQuery
} from '../../../services/sharepoint/caml'
import { mapRelatedCommitments } from './maps'

@Injectable({
  providedIn: 'root'
})
export class RelatedCommitmentDataSharePointService
  implements RelatedCommitmentDataService {
  removeItemFromCommitment(payload: any): Observable<any> {
    const LISTNAME = 'RelatedCommitment'

    const viewXml = byIdQuery({ id: payload.relatedTo })

    return this.sharepoint
      .getItems({
        listName: LISTNAME,
        viewXml: viewXml
      })
      .pipe(
        map(mapRelatedCommitments),
        map(result => result[0]),
        concatMap((result: any) =>
          this.sharepoint
            .removeItem({
              listName: LISTNAME,
              id: result.id
            })
            .pipe(
              concatMap(_ => of({ commitment: { id: payload.commitment } }))
            )
        )
      )
  }
  addItemToCommitment(payload: any): Observable<any> {
    const LISTNAME = 'RelatedCommitment'

    const sp = {
      Title: `${payload.commitment} ${payload.relatedTo}`,
      Commitment: payload.commitment,
      RelatedTo: payload.relatedTo
    }

    return this.sharepoint
      .storeItem({
        listName: LISTNAME,
        data: sp
      })
      .pipe(concatMap(_ => of({ commitment: { id: payload.commitment } })))
  }
  getItemsByCommitment(
    commitment: any
  ): Observable<DataResult<RelatedCommitmentsResult>> {
    const viewXml = byCommitmentIdQuery({ id: commitment })

    return this.sharepoint
      .getItems({
        listName: 'RelatedCommitment',
        viewXml: viewXml
      })
      .pipe(
        concatMap(items =>
          of({
            data: {
              commitmentRelatedCommitments: mapRelatedCommitments(items)
            },
            loading: false
          })
        )
      )
  }

  // getRelatedCommitmentsByCommitment(commitment: number): Observable<DataResult<RelatedCommitmentsResult>> {
  //   const viewXml = byCommitmentIdQuery({ id: commitment })

  //   return this.sharepoint.getItems({
  //     listName: 'RelatedCommitment',
  //     viewXml: viewXml
  //   }).pipe(
  //     concatMap(items =>
  //       of({
  //         data: { commitmentRelatedCommitments: mapRelatedCommitments(items) },
  //         loading: false
  //       }))
  //     )

  // }
  // removeCommitmentFromCommitment(payload: any): Observable<any> {
  //   const LISTNAME = 'RelatedCommitment'

  //   const viewXml = byIdQuery({ id: payload.relatedTo })

  //   return this.sharepoint.getItems({
  //     listName: LISTNAME,
  //     viewXml: viewXml
  //   }).pipe(
  //     map(mapRelatedCommitments),
  //     map(result => result[0]),
  //     concatMap((result: any) =>
  //       this.sharepoint.removeItem({
  //         listName: LISTNAME, id: result.id
  //       }).pipe(
  //         concatMap(_ => of({ commitment: { id: payload.commitment } }))
  //       )
  //     )
  //   )
  // }
  // addCommitmentToCommitment(payload: any): Observable<any> {
  //   const LISTNAME = 'RelatedCommitment'

  //   const sp = {
  //     Title: `${payload.commitment} ${payload.relatedTo}`,
  //     Commitment: payload.commitment,
  //     RelatedTo: payload.relatedTo
  //   }

  //   return this.sharepoint.storeItem({
  //     listName: LISTNAME,
  //     data: sp,
  //   }).pipe(
  //     concatMap(_ =>
  //       of({ commitment: { id: payload.commitment } }))
  //   )
  // }

  constructor(
    private sharepoint: SharepointJsomService,
    private logger: LoggerService
  ) {}
}
