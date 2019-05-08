import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { environment } from '../../environments/environment.prod'

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
  webId: string,
  header: Header
}

const defaults: Config = {
    'webId': null,
    'header': {
        'title': 'Unconfigured Application',
        'classification': 'UNCLASSIFIED',
        'logo': {
           'image': 'assets/crest.png',
           'url': '/'
        },
        'apps': []
    }
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _jsonURL = environment.config
  _config: BehaviorSubject<Config> = new BehaviorSubject(defaults)

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this._config.next(data)
      // tslint:disable-next-line:no-console
      console.log(`🦄 `, data)
    })
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL)
  }

  public get config(): Observable<Config> {
    return this._config
  }
}
