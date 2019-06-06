import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { AppSettingsService } from '@digital-first/df-app-core'

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements AppSettingsService {

  constructor() {}

  get apiKey(): string {
    return environment.apiKey
  }
  
  get commithash(){
    return environment.commithash
  }

  get loggingSource(): any {
    return environment.loggingSource
  }

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
