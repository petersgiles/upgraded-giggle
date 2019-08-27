import { Injectable, Inject } from '@angular/core'

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, forkJoin, from, of } from 'rxjs'

import { AppSettingsService } from '../../app-settings.service'
import { catchError, tap, map, concatMap } from 'rxjs/operators'

declare var _spPageContextInfo: any
declare var window: any
declare var SP: any

import { SharepointJsomService } from '@df/sharepoint'
import { AppConfigService } from '../config.service'

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
export class SharePointConfigService implements AppConfigService {
  constructor(
    private http: HttpClient,
    private settings: AppSettingsService,
    private sharepoint: SharepointJsomService
  ) {}

  public getConfig(): Observable<any> {
    let jsonURL = this.settings.environment.config

    if (_spPageContextInfo) {
      jsonURL = `${_spPageContextInfo.webAbsoluteUrl}${this.settings.environment.config}`
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

        var context = {
          ...data,
          appName: _spPageContextInfo.webTitle,
          userId: _spPageContextInfo.userId,
          siteCollectionUrl: _spPageContextInfo.siteAbsoluteUrl,
          relativeWebUrl: _spPageContextInfo.webServerRelativeUrl.replace(/\/$/, ''),
          webUrl: _spPageContextInfo.webAbsoluteUrl,
          siteUrl: _spPageContextInfo.siteAbsoluteUrl,
          appUrl: `${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/apps/${window.appName}`,
          siteAssetsUrl: `${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/apps/`,
          appSharedUrl: `${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/apps/shared`,
          appPageUrl: `${_spPageContextInfo.webAbsoluteUrl}/SitePages/index.aspx`,
          briefPageUrl: `${_spPageContextInfo.webAbsoluteUrl}/SitePages/index.aspx`,
          adminPageUrl: `${_spPageContextInfo.webAbsoluteUrl}/SitePages/admin.aspx`,
          deckPageUrl: `${_spPageContextInfo.webAbsoluteUrl}/SitePages/deck.aspx`,
          invitationsPageUrl: `${_spPageContextInfo.webAbsoluteUrl}/SitePages/invitations.aspx`,
          sharedAppUrl: `${_spPageContextInfo.webAbsoluteUrl}/SiteAssets/apps/shared`,
          pagesUrl: `${_spPageContextInfo.webAbsoluteUrl}/SitePages`,
          appConfigRootUrl: `${_spPageContextInfo.webAbsoluteUrl}/AppConfig/` + window.appName,
          isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
        }
        return of(context)
      }),
      catchError((err: HttpErrorResponse) => throwError(err))
    )
  }
}
