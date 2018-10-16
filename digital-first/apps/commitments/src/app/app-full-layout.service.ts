import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService {

  get version(): string {
    return environment.version
  }

  get title(): string {
    return 'Election Commitments'
  }

  constructor() { }

}