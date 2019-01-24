import { Injectable } from '@angular/core'
import { SharepointJsomService, idFromLookup } from '@digital-first/df-sharepoint'
import { RelatedLinkDataService } from '../related-link-data.service'
import { Observable, of } from 'rxjs'
import { DataResult, RelatedLinksResult } from '../../../models'
import { concatMap, map, tap } from 'rxjs/operators'
import { byCommitmentIdQuery, byJoinTableQuery, byIdQuery } from '../../../services/sharepoint/caml'
import { mapRelatedLinks } from './maps'
import { LoggerService } from '@digital-first/df-logging'

@Injectable({
    providedIn: 'root'
})
export class RelatedLinkDataSharePointService implements RelatedLinkDataService {

    removeItemFromCommitment(payload: any): Observable<any> {
        const LISTNAME = 'RelatedLink'

        const viewXml = byIdQuery({ id: payload.id })
        this.logger.info(viewXml, payload)
        return this.sharepoint.getItems({
          listName: LISTNAME,
          viewXml: viewXml
        }).pipe(
          map(mapRelatedLinks),
          map(result => result[0]),
          concatMap((result: any) =>
            this.sharepoint.removeItem({
              listName: LISTNAME, id: result.id
            }).pipe(
              concatMap(_ => of({ commitment: { id: payload.commitment } }))
            )
          )
        )
      }
      addItemToCommitment(payload: any): Observable<any> {
        const LISTNAME = 'RelatedLink'

        const sp = {
          Title: `${payload.commitment} ${payload.url}`,
          Commitment: payload.commitment,
          Url: payload.url
        }

        return this.sharepoint.storeItem({
          listName: LISTNAME,
          data: sp,
        }).pipe(
          concatMap(_ =>
            of({ commitment: { id: payload.commitment } }))
        )
      }
      getItemsByCommitment(commitment: any): Observable<DataResult<RelatedLinksResult>> {
        const viewXml = byCommitmentIdQuery({ id: commitment })

        return this.sharepoint.getItems({
          listName: 'RelatedLink',
          viewXml: viewXml
        }).pipe(
          concatMap(items =>
            of({
              data: { commitmentRelatedLinks: mapRelatedLinks(items) },
              loading: false
            }))
          )
      }

    constructor(private sharepoint: SharepointJsomService, private logger: LoggerService) { }
}
