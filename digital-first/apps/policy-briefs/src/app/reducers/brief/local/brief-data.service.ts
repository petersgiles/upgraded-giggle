import { Injectable } from '@angular/core'
import {
  Observable,
  of,
  BehaviorSubject,
  Subject,
  Subscription,
  throwError,
  EMPTY
} from 'rxjs'
import { BriefDataService } from '../brief-data.service'
import { briefs } from '../../../../devdata/data'
import { HttpClient } from '@angular/common/http'
import { AppSettingsService } from '@digital-first/df-app-core'
import { concatMap, first, tap, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BriefDataLocalService implements BriefDataService {
  fakeBriefBackend: Subject<any[]> = new Subject()
  fakeBriefBackendSubscription$: Subscription
  briefItems: BehaviorSubject<any> = new BehaviorSubject(null)

  addBrief(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  updateBrief(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  removeBrief(item: { id: string }): Observable<any> {
    throw new Error('Method not implemented.')
  }

  public getBriefs(): Observable<{
    data: any
    loading: boolean
  }> {
    return this.briefItems
  }

  public getActiveBrief(briefId): Observable<{ data: any; loading: boolean }> {
    const brief = briefs.find(p => `${p.Id}` === `${briefId}`)
    return of({
      data: brief,
      loading: false
    })
  }

  public getBriefHtml(
    fileLeafRef
  ): Observable<{
    data: any
    loading: boolean,
    error?: any
  }> {
    const relativeUrl = `${this.settings.assetsPath}/docx/${fileLeafRef}.html`

    return this.http.get(relativeUrl, { responseType: 'text' }).pipe(
        // tslint:disable-next-line: no-console
      tap(result => console.log(`👹 `, result)),
      concatMap((result: any) =>
        of({
          data: result,
          loading: false
        })),
        catchError(err => of({
          data: null,
          error: err,
          loading: false
        }))
    )
  }

  constructor(private http: HttpClient, private settings: AppSettingsService) {
    this.fakeBriefBackendSubscription$ = this.fakeBriefBackend.subscribe(next =>
      this.briefItems.next({
        data: next,
        loading: false
      })
    )

    this.fakeBriefBackend.next(briefs)
  }
}
