import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, BehaviorSubject, throwError } from 'rxjs'

import { SettingsService } from '../../settings.service'
import { catchError } from 'rxjs/operators'

import { Config, defaults } from '../config-model'

@Injectable({
  providedIn: 'root'
})
export class DevelopConfigService {
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
