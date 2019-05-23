import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, BehaviorSubject, throwError, forkJoin, from, of } from 'rxjs'

import { SettingsService } from '../../settings.service'
import { catchError, tap, map, concatMap } from 'rxjs/operators'

declare var _spPageContextInfo: any

import { SharepointJsomService } from '@df/sharepoint'

declare var SP: any

const executeQueryAsyncPromise = context =>
  new Promise((resolve, reject) => {
    if (!context) {
      context = SP.ClientContext.get_current()
    }

    context.executeQueryAsync(resolve, (_, args) => reject(args.get_message()))
  })

const executeQueryAsObservable = context =>
  from(executeQueryAsyncPromise(context))

@Injectable({
  providedIn: 'root'
})
export class SharePointConfigService {


  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private sharepoint: SharepointJsomService
  ) {
  }

  public getConfig(): Observable<any> {
    let jsonURL = this.settings.environment.config

    if (_spPageContextInfo) {
      jsonURL = `${_spPageContextInfo.webAbsoluteUrl}${
        this.settings.environment.config
      }`
    }

    return forkJoin([
      this.http.get(jsonURL),
      this.sharepoint.getWebId(),
      this.sharepoint.getSiteId()
    ]).pipe(
      concatMap((result: any) => {
        const [data, webId, siteId] = result
        data.webId = webId
        data.siteId = siteId
        return of(data)
      }),

      catchError((err: HttpErrorResponse) => throwError(err))
    )
  }
}
