import { Injectable } from '@angular/core'
import { Observable, of, forkJoin, EMPTY, throwError } from 'rxjs'
import { SharepointJsomService } from '@df/sharepoint'
import { BriefDataService } from '../brief-data.service'
import { concatMap, map, first, catchError } from 'rxjs/operators'
import { sortBy } from '../../../utils'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { AppSettingsService } from '@digital-first/df-app-core'
import { byIdQuery, byBriefIdQuery } from '../../../services/sharepoint/caml'
import {
  recommendedDirections,
  mapAttachments,
  mapLookups,
  mapRecommendations
} from '../brief.effects'

declare var _spPageContextInfo: any

const BRIEF_ITEM_LIST_NAME = 'Brief'

export const mapBrief = (item): any => ({
  id: `${item.ID}`,
  title: item.Title,
  sortOrder: item.SortOrder
})

export const mapBriefs = (items): any[] => (items || []).map(mapBrief)

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

  updateBrief = (item: any): Observable<any> =>
    this.sharepoint
      .storeItem({
        listName: BRIEF_ITEM_LIST_NAME,
        data: {
          Title: item.title
        },
        id: item.id
      })
      .pipe(concatMap(_ => of({})))

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
      map(([spBriefs]) => [...mapBriefs(spBriefs)]),
      map(result => (result || []).sort(sortBy('sortOrder'))),
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

    return forkJoin([
      this.sharepoint.getItems({
        listName: 'Brief',
        viewXml: viewXml
      }),
      this.sharepoint.getItems({
        listName: 'RecommendedDirection',
        viewXml: briefIdViewXml
      }),
      this.sharepoint.getItems({
        listName: 'Recommendation',
        viewXml: briefIdViewXml
      }),
      this.sharepoint.getItems({
        listName: 'BriefAttachments',
        viewXml: briefIdViewXml
      }),
      this.sharepoint.getItems({
        listName: 'BriefStatus'
      }),
      this.sharepoint.getItems({
        listName: 'BriefDivision'
      })
    ]).pipe(
      concatMap(
        ([
          spBrief,
          spRecommendedDirection,
          spRecommendations,
          spBriefAttachments,
          spBriefStatus,
          spBriefDivision
        ]) => {
          const data = {
            brief: mapBrief(spBrief[0]),
            directions: recommendedDirections(spRecommendedDirection),
            recommendations: mapRecommendations(spRecommendations),
            attachments: mapAttachments(spBriefAttachments),
            statusLookups: mapLookups(spBriefStatus),
            divisionLookups: mapLookups(spBriefDivision)
          }
          // tslint:disable-next-line:no-console
          console.log(`🙈 - brief`, data)

          return of({
            data: data,
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
  }> {
    const relativeUrl = `${_spPageContextInfo.webAbsoluteUrl}/BriefHTML/${fileLeafRef}.aspx`

    return this.http.get(relativeUrl, { responseType: 'text' }).pipe(
      concatMap((result: any) =>
        of({
          data: result,
          loading: false
        }))
    )
  }

  constructor(
    private http: HttpClient,
    private settings: AppSettingsService,
    private sharepoint: SharepointJsomService
  ) {}
}
