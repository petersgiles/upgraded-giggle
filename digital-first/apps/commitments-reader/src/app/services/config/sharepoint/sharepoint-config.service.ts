import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, BehaviorSubject, throwError, forkJoin, from } from 'rxjs'

import { SettingsService } from '../../settings.service'
import { catchError, tap, map } from 'rxjs/operators'

declare var _spPageContextInfo: any

import { Config, defaults } from '../config-model'
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
  private _jsonURL
  _config: BehaviorSubject<Config> = new BehaviorSubject(defaults)

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private sharepoint: SharepointJsomService
  ) {
    forkJoin([this.getJSON(), sharepoint.getWebId(), sharepoint.getSiteId()])
      .pipe(
        // tslint:disable-next-line: no-console
        tap(result => console.log(`🐵 app config and siteId got => `, result))
      )
      .subscribe(([data, webId, siteId]) => {
        data.webId = webId
        data.siteId = siteId
        this._config.next(data)
        // tslint:disable-next-line:no-console
        console.log(`🐵 app config changed => `, data)
      })
  }

  public getJSON(): Observable<any> {
    this._jsonURL = this.settings.environment.config

    if (_spPageContextInfo) {
      this._jsonURL = `${_spPageContextInfo.webAbsoluteUrl}${
        this.settings.environment.config
      }`
    }

    // tslint:disable-next-line:no-console
    console.log(`🐵 config url => `, this._jsonURL)

    // tslint:disable-next-line:no-console
    console.log(`🤔 getting config from here => `, this._jsonURL)
    return this.http.get(this._jsonURL).pipe(
      catchError((err: HttpErrorResponse) => {
        // tslint:disable-next-line:no-console
        console.log(`💥 error => `, this._jsonURL, err)
        return throwError(err)
      })
    )
  }

  public get config(): Observable<Config> {
    return this._config
  }
}
