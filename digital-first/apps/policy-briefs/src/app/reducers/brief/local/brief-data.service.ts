import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { BriefDataService } from '../brief-data.service'
import {
  briefs,
  recommendations,
  recommendeddirections
} from '../../../../../../../devdata/data'
import { HttpClient } from '@angular/common/http'
import { AppSettingsService } from '@digital-first/df-app-core'
import { concatMap, catchError } from 'rxjs/operators'
import { BriefMapperService } from '../../../services/mappers/brief-mapper.service'

@Injectable({
  providedIn: 'root'
})
export class BriefDataLocalService implements BriefDataService {
  fakeBriefBackend: Subject<any[]> = new Subject()
  fakeBriefBackendSubscription$: Subscription
  briefItems: BehaviorSubject<any> = new BehaviorSubject(null)

  addBrief(item: any): Observable<any> {
    item.Id =
      Math.max.apply(
        Math,
        briefs.map(function(o) {
          return o.Id
        })
      ) + 1
    briefs.push(item)
    this.fakeBriefBackend.next(briefs)
    return of({ briefId: item.Id, loading: false })
  }

  updateBrief(id: string, changes: any, hint?: string): Observable<any> {
    var found = briefs.find(p => `${p.Id}` == id)

    var remapped = {}
    if (changes.Policy) {
      remapped = {
        ...remapped,
        Policy: { Id: changes.Policy }
      }
    }

    if (changes.SubPolicy) {
      remapped = {
        ...remapped,
        SubPolicy: { Id: changes.SubPolicy }
      }
    }

    if (changes.BriefStatus) {
      remapped = {
        ...remapped,
        BriefStatus: { Id: changes.BriefStatus }
      }
    }

    if (found) {
      let index = briefs.indexOf(found)
      briefs[index] = {
        ...found,
        ...remapped
      }
    }

    this.fakeBriefBackend.next(briefs)
    return of({ briefId: id, loading: false })
  }

  updateRecommendation(id: string, changes: any): Observable<any> {
    console.log('updateRecommendedDirection', id, changes)

    var found = recommendations.find(p => `${p.Brief.Id}` == id)
    let index = recommendations.length + 1
    if (found) {
      index = recommendations.indexOf(found)
    } else {
      found = {
        Id: index,
        Title: '',
        SortOrder: null,
        ID: index,
        Colour: null,
        Policy: {
          Id: null
        },
        SubPolicy: {
          Id: null
        },
        Brief: {
          Id: +id
        },
        Recommendation: '',
        Outcome1: 'Agree',
        Outcome2: 'Disagree',
        Outcome3: 'Clarification required'
      }
    }
    recommendations[index] = {
      ...found,
      Recommendation: changes.description,
      Outcome1: changes.outcome1,
      Outcome2: changes.outcome2,
      Outcome3: changes.outcome3
    }

    return of({ briefId: id, loading: false })
  }
  updateRecommendationResponse(id: string, changes: any): Observable<any> {
    throw new Error('Method not implemented.')
  }

  updateRecommendedDirection(id: string, changes: any): Observable<any> {
    console.log('updateRecommendedDirection', id, changes)

    var found = recommendeddirections.find(p => `${p.Brief.Id}` == id)
    let index = recommendeddirections.indexOf(found)
    recommendeddirections[index] = {
      ...found,
      Recommended: changes.recommendedDirection
    }

    return of({ briefId: id, loading: false })
  }

  removeBrief(item: { id: string }): Observable<any> {
    var found = briefs.find(p => `${p.Id}` == item.id)
    if (found) {
      let index = briefs.indexOf(found)
      briefs.splice(index, 1)
    }

    this.fakeBriefBackend.next(briefs)
    return of({ briefId: item.id, loading: false })
  }

  public getBriefs(): Observable<{
    data: any
    loading: boolean
  }> {
    return this.briefItems
  }

  public getActiveBrief(briefId): Observable<{ data: any; loading: boolean }> {
    let found = briefs.find(p => `${p.Id}` === `${briefId}`)
    const recommendedDirection = recommendeddirections.find(
      r => `${r.Brief.Id}` === `${briefId}`
    )
    const recommendedActions = recommendations.filter(
      r => `${r.Brief.Id}` === `${briefId}`
    )
    const m = {
      ...found,
      RecommendedDirection: recommendedDirection.Recommended,
      Recommendations: recommendedActions
    }

    const brief = this.briefMapperService.mapSingle(m)

    return of({
      data: brief,
      loading: false
    })
  }

  public getBriefHtml(
    fileLeafRef
  ): Observable<{
    data: any
    loading: boolean
    error?: any
  }> {
    const relativeUrl = `${this.settings.assetsPath}/docx/${fileLeafRef}.html`

    return this.http.get(relativeUrl, { responseType: 'text' }).pipe(
      concatMap((result: any) => {
        return of({
          data: result,
          loading: false
        })
      }),
      catchError(err =>
        of({
          data: null,
          error: err,
          loading: false
        })
      )
    )
  }

  constructor(
    private http: HttpClient,
    private settings: AppSettingsService,
    private briefMapperService: BriefMapperService
  ) {
    console.log(`BriefDataLocalService`)

    this.fakeBriefBackendSubscription$ = this.fakeBriefBackend.subscribe(
      next => {
        console.log(`Brief Data Local Service briefItems update`)
        this.briefItems.next({
          data: next,
          loading: false
        })
      }
    )

    this.fakeBriefBackend.next(briefs)
  }
}
