import { Injectable } from '@angular/core'
import { Observable, of, forkJoin, EMPTY } from 'rxjs'
import {
  SharepointJsomService,
  fromLookup,
  idFromLookup,
  fromUser
} from '@df/sharepoint'
import { BriefDataService } from '../brief-data.service'
import { concatMap, map } from 'rxjs/operators'
import { sortBy } from '../../../utils'
import { HttpClient } from '@angular/common/http'
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

  updateRecommendation(briefId: string, changes: any): Observable<any> {
    return this.sharepoint
      .storeItem({
        listName: RECOMMENDATION_ITEM_LIST_NAME,
        data: {
          Title: '',
          SortOrder: null,
          Colour: null,
          Brief: +briefId,
          Recommendation: changes.description,
          Outcome1: changes.outcome1,
          Outcome2: changes.outcome2,
          Outcome3: changes.outcome3
        },
        id: changes.id
      })
      .pipe(concatMap(_ => of({ briefId: briefId, loading: false })))
  }
  updateRecommendationResponse(briefId: string, changes: any): Observable<any> {
    console.log('updateRecommendationResponse', briefId, changes)
    return this.sharepoint
      .storeItem({
        listName: RESPONSE_ITEM_LIST_NAME,
        data: {
          Title: changes.response,
          Brief: +briefId,
          Recommendation: +changes.recommendation
        },
        id: changes.responseid
      })
      .pipe(concatMap(_ => of({ briefId: briefId, loading: false })))
  }

  updateRecommendedDirection(briefId: string, changes: any): Observable<any> {
    const briefIdViewXml = byBriefIdQuery({ id: briefId })

    return this.sharepoint
      .getItems({
        listName: RECOMMENDED_DIRECTION_ITEM_LIST_NAME,
        viewXml: briefIdViewXml
      })
      .pipe(
        concatMap(result => {
          let direction = null
          if (result && result.length > 0) {
            direction = result[0].ID
          }

          console.log(`🕊️ updateRecommendedDirection`, result, changes)

          return this.sharepoint
            .storeItem({
              listName: RECOMMENDED_DIRECTION_ITEM_LIST_NAME,
              data: {
                Title: briefId,
                Brief: +briefId,
                Recommended: changes
              },
              id: direction
            })
            .pipe(concatMap(_ => of({ briefId: briefId, loading: false })))
        })
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
          let recommendedActions = spRecommendations || []

          const responses = spResponses.map(rsp => ({
            ...rsp,
            RecommendationId: idFromLookup(rsp.Recommendation)
          }))

          recommendedActions = recommendedActions.map(ra => ({
            ...ra,
            Response: responses.find(rsp => rsp.RecommendationId === ra.ID)
          }))

          console.log(
            'getActiveBrief ==> ',
            recommendedDirection,
            recommendedActions,
            spResponses,
            responses
          )

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

          return of({
            data: brief,
            loading: false
          })
        }
      )
    )
  }

  public getActiveBriefSubscriptions(
    briefId
  ): Observable<{ data: any; loading: boolean }> {
    const briefIdViewXml = byBriefIdQuery({ id: briefId })
    return forkJoin([
      this.sharepoint.getItems({
        listName: 'InvitationPMOContacts'
      }),
      this.sharepoint.getItems({
        listName: 'BriefSubscriptions',
        viewXml: briefIdViewXml
      })
    ]).pipe(
      concatMap(([spContacts, spSubscriptions]) => {
        var subscriptions = spContacts.map(contact => {
          const pmcUser = fromUser(contact.PMCUser)
          console.log('getActiveBriefSubscriptions', pmcUser)

          if (spSubscriptions && spSubscriptions.length > 0) {
            const userSubscriptions = spSubscriptions.filter(sub => {
              const subscriber = fromUser(sub.Subscriber)
              return subscriber.id == pmcUser.id
            })

             return userSubscriptions.reduce(
              (sacc, item) => {
                const userActivities = item.SubscriptionTypes.map(st => {
                  const id = idFromLookup(st)
                  return { id: id}
                })
                const userStatuses = item.BriefStatus.map(st => {
                  const id = idFromLookup(st)
                  return { id: id}
                })

                sacc.activity = [...userActivities]
                sacc.status = [...userStatuses]
                return sacc
              },
              {
                
                user_id: pmcUser.id,
                name:  pmcUser.title,
                brief_id: briefId,                
                activity: [],
                status: []
              }
            )
          }
        })

        return of({
          data: subscriptions,
          loading: false
        })
      })
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
