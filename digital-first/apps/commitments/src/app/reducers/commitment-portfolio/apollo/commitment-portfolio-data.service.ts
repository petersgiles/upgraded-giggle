import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, PortfoliosResult, CommitmentPortfoliosResult } from '../../../models'
import { REMOVE_COMMITMENT_PORTFOLIO, STORE_COMMITMENT_PORTFOLIO, GET_COMMITMENT_PORTFOLIOS } from './queries'
import { CommitmentPortfolioDataService } from '../commitment-portfolio-data.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommitmentPortfolioDataApolloService implements CommitmentPortfolioDataService {

  getPortfoliosByCommitment = (commitment: any): Observable<DataResult<CommitmentPortfoliosResult>> =>
    callQuery<CommitmentPortfoliosResult>(this.apollo, { query: GET_COMMITMENT_PORTFOLIOS, variables: { commitment: commitment } }
      , result => ({ data: {relatedPortfolios: result.data.commitmentPortfolios } })
    )

  addPortfolioToCommitment = (variables: { commitment: any, portfolio: any }): Observable<DataResult<{ commitment: number }>> =>
    callMutate<any>(this.apollo,
      { mutation: STORE_COMMITMENT_PORTFOLIO, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.storeCommitmentPortfolio.id } })
    )

  removePortfolioFromCommitment = (variables: { commitment: any, portfolio: any }): Observable<DataResult<{ commitment: number }>> =>
    callMutate<any>(this.apollo,
      { mutation: REMOVE_COMMITMENT_PORTFOLIO, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.deleteCommitmentPortfolio.id } })
    )

  constructor(private apollo: Apollo) { }
}
