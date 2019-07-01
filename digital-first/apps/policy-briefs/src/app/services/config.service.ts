import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { environment } from '../../environments/environment.prod'
import { Config } from '@digital-first/df-app-core'

const defaults: Config = {
  webId: null,
  siteId: null,
  header: {
    title: 'Policy Briefs',
    classification: 'UNCLASSIFIED',
    backgroundColour: '#455a64',
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
  private _jsonURL = environment.config
  _config: BehaviorSubject<Config> = new BehaviorSubject(defaults)

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this._config.next(data)
      // tslint:disable-next-line:no-console
      console.log(data)
    })
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL)
  }

  public get config(): Observable<Config> {
    return this._config
  }
}
