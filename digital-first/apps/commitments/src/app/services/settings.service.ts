import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  get environment(): any {
    return environment
  }

  get datasource(): any {
    return environment.datasource
  }

  get assetsPath(): any {
    return environment.assetsPath
  }
}
