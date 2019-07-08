import { Injectable } from '@angular/core'
import { Observable, of, forkJoin, EMPTY } from 'rxjs'
import { SharepointJsomService } from '@df/sharepoint'
import { BriefDataService } from '../brief-data.service'
import { concatMap, map, tap } from 'rxjs/operators'
import { sortBy } from '../../../utils'
import { HttpClient } from '@angular/common/http'
import { AppSettingsService } from '@digital-first/df-app-core'
import { byIdQuery, byBriefIdQuery } from '../../../services/sharepoint/caml'
import { BriefMapperService } from '../../../services/mappers/brief-mapper.service';
import { RecommendedDirectionMapperService } from '../../../services/mappers/recommended-direction-mapper.service';
import { RecommendationMapperService } from '../../../services/mappers/recommendation-mapper.service';
import { AttachmentMapperService } from '../../../services/mappers/attachment-mapper.service';
import { LookupMapperService } from '../../../services/mappers/lookup-mapper.service';

declare var _spPageContextInfo: any

const BRIEF_ITEM_LIST_NAME = 'Brief'

@Injectable({
  providedIn: 'root'
})
export class BriefDataSharepointService implements BriefDataService {
  setActiveBriefStatus(activeBriefId: string, status: string): Observable<{ briefId: any; loading: boolean; }> {
    throw new Error("Method not implemented.");
  }
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
            brief: this.briefMapperService.mapSingle(spBrief[0]),
            directions: this.recommendedDirectionMapperService.mapMany(spRecommendedDirection),
            recommendations: this.recommendationMapperService.mapMany(spRecommendations),
            attachments: this.attachmentMapperService.mapMany(spBriefAttachments),
            statusLookups: this.lookupMapperService.mapMany(spBriefStatus),
            divisionLookups: this.lookupMapperService.mapMany(spBriefDivision)
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
    loading: boolean,
    error?: any
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
    private sharepoint: SharepointJsomService,
    private briefMapperService: BriefMapperService,
    private recommendedDirectionMapperService: RecommendedDirectionMapperService,
    private recommendationMapperService: RecommendationMapperService,
    private attachmentMapperService: AttachmentMapperService,
    private lookupMapperService: LookupMapperService,
  ) {}
}
