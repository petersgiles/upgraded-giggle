import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import { DataResult } from '../../models'
import { CommitmentThemeDataSharePointService as CommitmentThemeDataSharePointService } from './sharepoint/commitment-theme-data.service'
import { CommitmentThemeDataApolloService } from './apollo/commitment-theme-data.service'
import { CommitmentThemesResult } from '../../models/theme.model'

@Injectable({
  providedIn: 'root'
})
export abstract class CommitmentThemeDataService {
  abstract getThemesByCommitment(commitment: any): Observable<DataResult<CommitmentThemesResult>>
  abstract addThemeToCommitment(variables: { commitment: any, theme: any }): Observable<DataResult<{ commitment: number }>>
  abstract removeThemeFromCommitment(variables: { commitment: any, theme: any }): Observable<DataResult<{ commitment: number }>>
}

const commitmentThemeDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new CommitmentThemeDataSharePointService(sharepointlib)
    default:
      return new CommitmentThemeDataApolloService(apollo)
  }

}

export let commitmentThemesDataServiceProvider = {
  provide: CommitmentThemeDataService,
  useFactory: commitmentThemeDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}
