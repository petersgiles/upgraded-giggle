export abstract class AppSettingsService {
  abstract get environment(): any
  abstract get datasources(): any
  abstract get host(): string
  abstract get datasource(): any
  abstract get eventDatasource(): any
  abstract get appConfigDataSource(): any
  abstract get assetsPath(): any

}
