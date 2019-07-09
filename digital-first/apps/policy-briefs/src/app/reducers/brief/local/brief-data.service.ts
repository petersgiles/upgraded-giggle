import { Injectable } from '@angular/core'
import {
  Observable,
  of,
  BehaviorSubject,
  Subject,
  Subscription
} from 'rxjs'
import { BriefDataService } from '../brief-data.service'
import { briefs } from '../../../../../../../devdata/data'
import { HttpClient } from '@angular/common/http'
import { AppSettingsService } from '@digital-first/df-app-core'
import { concatMap, catchError } from 'rxjs/operators'
import { BriefMapperService } from '../../../services/mappers/brief-mapper.service';

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

  setActiveBriefStatus(activeBriefId: string, status: string): Observable<{ briefId: any; loading: boolean; }> {
    throw new Error("Method not implemented.");
  }

  public getBriefs(): Observable<{
    data: any
    loading: boolean
  }> {
    return this.briefItems
  }

  public getActiveBrief(briefId): Observable<{ data: any; loading: boolean }> {
    const found = briefs.find(p => `${p.Id}` === `${briefId}`)
    const brief = this.briefMapperService.mapSingle(found)

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
      concatMap((result: any) => {
        return of({
          data: result,
          loading: false
        })}),
        catchError(err => of({
          data: null,
          error: err,
          loading: false
        }))
    )
  }

  constructor(private http: HttpClient, private settings: AppSettingsService, private briefMapperService: BriefMapperService) {
console.log(`BriefDataLocalService`)

    this.fakeBriefBackendSubscription$ = this.fakeBriefBackend.subscribe(next =>
      this.briefItems.next({
        data: next,
        loading: false
      })
    )

    this.fakeBriefBackend.next(briefs)
  }
}
