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

  get datasources(): any {
    return environment.datasources
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
  get appConfigDataSource(): any {
    return environment.appConfigDataSource
  }
  get assetsPath(): any {
    return environment.assetsPath
  }

}
