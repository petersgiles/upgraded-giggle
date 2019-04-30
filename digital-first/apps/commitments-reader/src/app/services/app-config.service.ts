import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { AppConfig } from '../models'
import { map } from 'rxjs/operators'
import { of } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AppConfigService {
  abstract init()
  abstract getBookType()
}

@Injectable({
  providedIn: 'root'
})
export class SPAppConfigService implements AppConfigService {
  private config: AppConfig

  constructor(private sharepoint: SharepointJsomService) {}

  init() {
    console.log('init app-config')
    return this.sharepoint.getFromWeb('AppConfig/commitments-reader.txt').pipe(
      map(data => {
        console.log('config loaded for SharePoint')
        this.config = JSON.parse(data)
      })
    )
  }

  getBookType = () => {
    console.log('getting booktype', this.config.bookType)
    return this.config && this.config.bookType
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocalAppConfigService implements AppConfigService {
  private config: AppConfig

  constructor() {}

  init() {
    console.log('init app-config')
    return of('{"bookType":  "blue"}').pipe(
        map(data => {
        console.log('config loaded for local')
        this.config = JSON.parse(data)
      })
    )
  }

  public getBookType = () => {
    // tslint:disable-next-line:no-console
    console.log('getting booktype', this.config.bookType)
    return of('red')
  }
}

const appConfigServiceFactory = (
  settings: SettingsService,
  sharepointlib: SharepointJsomService
) => {
  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new SPAppConfigService(sharepointlib)
    default:
      return new LocalAppConfigService()
  }
}
export let appConfigServiceProvider = {
  provide: AppConfigService,
  useFactory: appConfigServiceFactory,
  deps: [SettingsService, SharepointJsomService]
}

