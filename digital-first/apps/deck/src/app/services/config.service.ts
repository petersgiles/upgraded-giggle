import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, BehaviorSubject, throwError } from 'rxjs'
import { environment } from '../../environments/environment.prod'
import { SettingsService } from './settings.service'
import { catchError } from 'rxjs/operators'

declare var _spPageContextInfo: any

export interface Logo {
  image: string
  url: string
  title?: string
}

export interface App {
  caption: string
  icon: string
  url: string
  target?: string
}

export interface Header {
  title?: string
  classification?: string
  bookType?: string
  logo?: Logo
  apps?: App[]
}

export interface Config {
  header: Header
}

const defaults: Config = {
  header: {
    title: 'Deck',
    classification: 'UNCLASSIFIED',
    logo: {
      image: 'assets/crest.png',
      url: '/'
    },
    apps: []
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _jsonURL
  _config: BehaviorSubject<Config> = new BehaviorSubject(defaults)

  constructor(private http: HttpClient, private settings: SettingsService) {
    this.getJSON().subscribe(data => {
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
