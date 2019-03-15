import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import { DataResult } from '../../models'
import { CommitmentPackageDataSharePointService } from './sharepoint/commitment-package-data.service'
import { CommitmentPackageDataApolloService } from './apollo/commitment-package-data.service'
import { CommitmentPackagesResult } from '../../models/package.model'

@Injectable({
  providedIn: 'root'
})
export abstract class CommitmentPackageDataService {
  abstract getPackagesByCommitment(commitment: any): Observable<DataResult<CommitmentPackagesResult>>
  abstract addPackageToCommitment(variables: { commitment: any, mypackage: any }): Observable<DataResult<{ commitment: number }>>
  abstract removePackageFromCommitment(variables: { commitment: any, mypackage: any }): Observable<DataResult<{ commitment: number }>>
}

const commitmentPackagesDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new CommitmentPackageDataSharePointService(sharepointlib)
    default:
      return new CommitmentPackageDataApolloService(apollo)
  }

}

export let commitmentPackagesDataServiceProvider = {
  provide: CommitmentPackageDataService,
  useFactory: commitmentPackagesDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}
