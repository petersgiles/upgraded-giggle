import { Injectable } from '@angular/core'
import { Observable, of, forkJoin, EMPTY } from 'rxjs'
import { SharepointJsomService, fromLookup } from '@df/sharepoint'
import { BriefDataService } from '../brief-data.service'
import { concatMap, map, tap } from 'rxjs/operators'
import { sortBy } from '../../../utils'
import { HttpClient } from '@angular/common/http'
import { AppSettingsService } from '@digital-first/df-app-core'
import { byIdQuery, byBriefIdQuery } from '../../../services/sharepoint/caml'
import { BriefMapperService } from '../../../services/mappers/brief-mapper.service'
import { RecommendedDirectionMapperService } from '../../../services/mappers/recommended-direction-mapper.service'
import { RecommendationMapperService } from '../../../services/mappers/recommendation-mapper.service'
import { AttachmentMapperService } from '../../../services/mappers/attachment-mapper.service'
import { LookupMapperService } from '../../../services/mappers/lookup-mapper.service'

declare var _spPageContextInfo: any

const BRIEF_ITEM_LIST_NAME = 'Brief'
const RECOMMENDED_DIRECTION_ITEM_LIST_NAME = 'RecommendedDirection'
const RECOMMENDATION_ITEM_LIST_NAME = 'Recommendation'
const RESPONSE_ITEM_LIST_NAME = 'Response'

@Injectable({
  providedIn: 'root'
})
export class BriefDataSharepointService implements BriefDataService {
  getBriefDocument(id: string): Observable<{ data: any; loading: boolean }> {
    return EMPTY
  }

  addBrief = (item: any): Observable<any> =>
    this.sharepoint
      .storeItem({
        listName: BRIEF_ITEM_LIST_NAME,
        data: {}
      })
      .pipe(concatMap(_ => of({})))

  updateBrief = (id: string, changes: any, hint?: string): Observable<any> => {
    console.log('hint', hint, changes)
    if (hint == 'RecommendedDirection') {
      return this.updateRecommendedDirection(id, changes)
    }

    return this.sharepoint
      .storeItem({
        listName: BRIEF_ITEM_LIST_NAME,
        data: {
          ...changes
        },
        id: id
      })
      .pipe(concatMap(_ => of({ briefId: id, loading: false })))
  }

  updateRecommendedDirection(briefId: string, changes: any): Observable<any> {
    console.log('updateRecommendedDirection', briefId, changes)
    const briefIdViewXml = byBriefIdQuery({ id: briefId })

    return this.sharepoint
      .getItems({
        listName: RECOMMENDED_DIRECTION_ITEM_LIST_NAME,
        viewXml: briefIdViewXml
      })
      .pipe(
        concatMap(result =>
          this.sharepoint
            .storeItem({
              listName: RECOMMENDED_DIRECTION_ITEM_LIST_NAME,
              data: {
                ...changes
              },
              id: result.ID
            })
            .pipe(concatMap(_ => of({ briefId: briefId, loading: false })))
        )
      )
  }

  removeBrief = (item: { id: string }): Observable<any> =>
    this.sharepoint
      .removeItem({
        listName: BRIEF_ITEM_LIST_NAME,
        id: item.id
      })
      .pipe(concatMap(_ => of({})))

  getBriefs = (
    parent
  ): Observable<{
    data: any
    loading: boolean
  }> =>
    forkJoin([
      this.sharepoint.getItems({
        listName: BRIEF_ITEM_LIST_NAME
      })
    ]).pipe(
      map(([spBriefs]) => [...this.briefMapperService.mapMany(spBriefs)]),
      map(result => (result || []).sort(sortBy('sortOrder'))),
      tap(result => console.log(`getBriefs`, result)),
      concatMap(result =>
        of({
          data: result,
          loading: false
        })
      )
    )

  public getActiveBrief(briefId): Observable<{ data: any; loading: boolean }> {
    const viewXml = byIdQuery({ id: briefId })
    const briefIdViewXml = byBriefIdQuery({ id: briefId })

    // tslint:disable-next-line:no-console
    console.log(`🙈 - brief`, viewXml)

    return forkJoin([
      this.sharepoint.getItems({
        listName: BRIEF_ITEM_LIST_NAME,
        viewXml: viewXml
      }),
      this.sharepoint.getItems({
        listName: RECOMMENDED_DIRECTION_ITEM_LIST_NAME,
        viewXml: briefIdViewXml
      }),
      this.sharepoint.getItems({
        listName: RECOMMENDATION_ITEM_LIST_NAME,
        viewXml: briefIdViewXml
      }),
      this.sharepoint.getItems({
        listName: RESPONSE_ITEM_LIST_NAME,
        viewXml: briefIdViewXml
      })
      // this.sharepoint.getItems({
      //   listName: 'BriefAttachments',
      //   viewXml: briefIdViewXml
      // }),
      // this.sharepoint.getItems({
      //   listName: 'BriefStatus'
      // }),
      // this.sharepoint.getItems({
      //   listName: 'BriefDivision'
      // })
    ]).pipe(
      concatMap(
        ([spBrief, spRecommendedDirection, spRecommendations, spResponses]) => {
          const result = spBrief[0]

          const recommendedDirection = spRecommendedDirection[0] || {}
          console.log('getActiveBrief ==> ', recommendedDirection, spResponses)
          const recommendedActions = spRecommendations || []

          const editor = fromLookup(result.Editor)
          const subPolicy = fromLookup(result.SubPolicy)
          const policy = fromLookup(result.Policy)
          const briefStatus = fromLookup(result.BriefStatus)
          const briefDivision = fromLookup(result.BriefDivision)

          const brief = this.briefMapperService.mapSingle({
            ...result,
            Editor: editor,
            SubPolicy: subPolicy,
            Policy: policy,
            BriefStatus: briefStatus,
            BriefDivision: briefDivision,
            RecommendedDirection: recommendedDirection.Recommended,
            Recommendations: recommendedActions
          })

          console.log('BRIEF =>', brief)

          return of({
            data: brief,
            loading: false
          })
        }
      )
    )
  }

  public getBriefHtml(
    fileLeafRef
  ): Observable<{
    data: any
    loading: boolean
    error?: any
  }> {
    const relativeUrl = `${_spPageContextInfo.webAbsoluteUrl}/BriefHTML/${fileLeafRef}.aspx`

    console.log(`getBriefHtml`, relativeUrl)

    return this.http.get(relativeUrl, { responseType: 'text' }).pipe(
      concatMap((result: any) =>
        of({
          data: result,
          loading: false
        })
      )
    )
  }

  constructor(
    private http: HttpClient,
    private sharepoint: SharepointJsomService,
    private briefMapperService: BriefMapperService,
    private recommendedDirectionMapperService: RecommendedDirectionMapperService,
    private recommendationMapperService: RecommendationMapperService,
    private attachmentMapperService: AttachmentMapperService,
    private lookupMapperService: LookupMapperService
  ) {
    console.log(`BriefDataSharepointService`)
  }
}
