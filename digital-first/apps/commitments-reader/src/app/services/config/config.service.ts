import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Config } from './config-model'

@Injectable({
  providedIn: 'root'
})
export abstract class AppConfigService {
  abstract getJSON(): Observable<any>
  abstract get config(): Observable<Config>
}
