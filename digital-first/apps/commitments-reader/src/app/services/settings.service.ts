import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() {}

  get environment(): any {
    return environment
  }

  get host(): any {
    return environment.host
  }

  get datasource(): any {
    return environment.datasource
  }

  get eventDatasource(): any {
    return environment.eventDatasource
  }

  get assetsPath(): any {
    return environment.assetsPath
  }
}
