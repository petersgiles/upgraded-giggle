import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import { DataResult } from '../../models'
import { CommitmentPortfolioDataSharePointService } from './sharepoint/commitment-portfolio-data.service'
import { CommitmentPortfolioDataApolloService } from './apollo/commitment-portfolio-data.service'
import { CommitmentPortfoliosResult } from '../../models/portfolio.model'

@Injectable({
  providedIn: 'root'
})
export abstract class CommitmentPortfolioDataService {
  abstract getPortfoliosByCommitment(commitment: any): Observable<DataResult<CommitmentPortfoliosResult>>
  abstract addPortfolioToCommitment(variables: { commitment: any, portfolio: any }): Observable<DataResult<{ commitment: number }>>
  abstract removePortfolioFromCommitment(variables: { commitment: any, portfolio: any }): Observable<DataResult<{ commitment: number }>>
}

const commitmentPortfoliosDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new CommitmentPortfolioDataSharePointService(sharepointlib)
    default:
      return new CommitmentPortfolioDataApolloService(apollo)
  }

}

export let commitmentPortfoliosDataServiceProvider = {
  provide: CommitmentPortfolioDataService,
  useFactory: commitmentPortfoliosDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}