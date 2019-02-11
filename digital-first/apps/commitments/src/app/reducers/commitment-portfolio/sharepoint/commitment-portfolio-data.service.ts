import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { CommitmentPortfolioDataService } from '../commitment-portfolio-data.service'
import { Observable, of } from 'rxjs'
import {
  DataResult,
  PortfoliosResult,
  CommitmentPortfoliosResult
} from '../../../models'
import { concatMap, map, tap } from 'rxjs/operators'
import {
  byJoinTableQuery,
  byCommitmentIdQuery,
  byIdsQuery
} from '../../../services/sharepoint/caml'
import { mapCommitmentPortfolios } from './maps'
import { mapPortfolios } from '../../commitment-lookup/sharepoint/maps'

@Injectable({
  providedIn: 'root'
})
export class CommitmentPortfolioDataSharePointService
  implements CommitmentPortfolioDataService {
  getPortfoliosByCommitment(
    commitment: any
  ): Observable<DataResult<CommitmentPortfoliosResult>> {
    const viewXml = byCommitmentIdQuery({ id: commitment })

    return this.sharepoint
      .getItems({
        listName: 'CommitmentPortfolio',
        viewXml: viewXml
      })
      .pipe(
        // tslint:disable-next-line:no-console
        tap(result => console.log(result)),
        map(mapCommitmentPortfolios),
        // tslint:disable-next-line:no-console
        tap(result => console.log(result)),
        concatMap((result: any) => {
          const ids = result.map(p => p.portfolio)
          const portfolioViewXml = byIdsQuery(ids)
          // tslint:disable-next-line:no-console
          console.log('Portfolio', result, ids, portfolioViewXml)
          if (portfolioViewXml) {
            return this.sharepoint
              .getItems({
                listName: 'Portfolio',
                viewXml: portfolioViewXml
              })
              .pipe(
                // tslint:disable-next-line:no-console
                tap(presult => console.log(presult)),
                concatMap(portfolios =>
                  of({
                    data: { commitmentPortfolios: mapPortfolios(portfolios) },
                    loading: false
                  })
                )
              )
          } else {
            return of({
              data: { commitmentPortfolios: [] },
              loading: false
            })
          }
        })
      )
  }

  addPortfolioToCommitment(variables: {
    commitment: number
    portfolio: any
  }): Observable<DataResult<{ commitment: number }>> {
    const spComment = {
      Title: `${variables.commitment} ${variables.portfolio}`,
      Commitment: variables.commitment,
      Portfolio: variables.portfolio
    }

    return this.sharepoint
      .storeItem({
        listName: 'CommitmentPortfolio',
        data: spComment
      })
      .pipe(
        concatMap(_ =>
          of({
            loading: false,
            data: {
              commitment: variables.commitment
            }
          })
        )
      )
  }

  removePortfolioFromCommitment(variables: {
    commitment: number
    portfolio: any
  }) {
    const viewXml = byJoinTableQuery({
      fieldA: { name: 'Commitment', id: variables.commitment },
      fieldB: { name: 'Portfolio', id: variables.portfolio }
    })

    return this.sharepoint
      .getItems({
        listName: 'CommitmentPortfolio',
        viewXml: viewXml
      })
      .pipe(
        map(mapCommitmentPortfolios),
        map(result => result[0]),
        concatMap(result =>
          this.sharepoint
            .removeItem({
              listName: 'CommitmentPortfolio',
              id: result.id
            })
            .pipe(
              concatMap(_ =>
                of({
                  loading: false,
                  data: {
                    commitment: result.commitment
                  }
                })
              )
            )
        )
      )
  }

  constructor(private sharepoint: SharepointJsomService) {}
}
