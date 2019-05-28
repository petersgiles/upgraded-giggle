import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, BehaviorSubject, throwError } from 'rxjs'

import { AppSettingsService } from '../../app-settings.service'
import { catchError } from 'rxjs/operators'

import { Config, defaults } from '../config-model'

@Injectable({
  providedIn: 'root'
})
export class DevelopConfigService {

  constructor(private http: HttpClient, private settings: AppSettingsService) {
    console.log('DevelopConfigService')
   }

  public getConfig(): Observable<any> {
    return this.http.get(this.settings.environment.config).pipe(
      // tslint:disable-next-line: no-unnecessary-callback-wrapper
      catchError((err: HttpErrorResponse) => throwError(err))
    )
  }
}
