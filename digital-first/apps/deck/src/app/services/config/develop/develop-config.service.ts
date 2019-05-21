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

  constructor(private http: HttpClient, private settings: SettingsService) { }

  public getConfig(): Observable<any> {
    return this.http.get(this.settings.environment.config).pipe(
      catchError((err: HttpErrorResponse) => throwError(err))
    )
  }
}
