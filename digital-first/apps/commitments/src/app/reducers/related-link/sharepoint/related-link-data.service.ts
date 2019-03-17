import { Injectable } from '@angular/core'
import {
  SharepointJsomService,
  idFromLookup
} from '@df/sharepoint'
import { RelatedLinkDataService } from '../related-link-data.service'
import { Observable, of } from 'rxjs'
import { DataResult, RelatedLinksResult } from '../../../models'
import { concatMap, map } from 'rxjs/operators'
import {
  byCommitmentIdQuery,
  byIdQuery
} from '../../../services/sharepoint/caml'
import { mapRelatedLinks } from './maps'

@Injectable({
  providedIn: 'root'
})
export class RelatedLinkDataSharePointService
  implements RelatedLinkDataService {
  removeItemFromCommitment(payload: any): Observable<any> {
    const LISTNAME = 'RelatedLink'

    const viewXml = byIdQuery({ id: payload.id })

    return this.sharepoint
      .getItems({
        listName: LISTNAME,
        viewXml: viewXml
      })
      .pipe(
        map(mapRelatedLinks),
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
    const LISTNAME = 'RelatedLink'

    const sp = {
      Title: payload.title,
      Commitment: payload.commitment,
      Url: payload.url
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
  ): Observable<DataResult<RelatedLinksResult>> {
    const viewXml = byCommitmentIdQuery({ id: commitment })

    return this.sharepoint
      .getItems({
        listName: 'RelatedLink',
        viewXml: viewXml
      })
      .pipe(
        concatMap(items =>
          of({
            data: { commitmentRelatedLinks: mapRelatedLinks(items) },
            loading: false
          })
        )
      )
  }

  constructor(
    private sharepoint: SharepointJsomService
  ) {}
}
