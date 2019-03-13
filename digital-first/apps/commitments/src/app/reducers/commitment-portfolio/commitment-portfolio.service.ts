import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import {
  ExpandPanel,
  CollapsePanel,
  AddPortfolioToCommitment,
  RemovePortfolioFromCommitment,
  GetPortfoliosByCommitment
} from './commitment-portfolio.actions'
import { Portfolio } from '../../models'
import { MegaTag } from '@df/components'

@Injectable({
  providedIn: 'root'
})
export class CommitmentPortfolioService {
  constructor(private store: Store<fromRoot.State>) {}

  get UserOperation(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCurrentUserOperations))
  }

  addPortfolioToCommitment(commitment: any, portfolio: any): any {
    this.store.dispatch(new AddPortfolioToCommitment({ commitment, portfolio }))
  }

  removePortfolioFromCommitment(commitment: any, portfolio: any): any {
    this.store.dispatch(
      new RemovePortfolioFromCommitment({ commitment, portfolio })
    )
  }

  getPortfoliosByCommitment(commitment: number): any {
    this.store.dispatch(new GetPortfoliosByCommitment({ commitment }))
  }

  get Portfolios(): Observable<Portfolio[]> {
    return this.store.pipe(select(fromRoot.getAllPortfolios))
  }

  get CommitmentPortfolios(): Observable<Portfolio[]> {
    return this.store.pipe(select(fromRoot.getAllCommitmentPortfolios))
  }

  get SelectedMegaTags(): Observable<MegaTag[]> {
    return this.store.pipe(select(fromRoot.getRelatedCommitmentPortfolios))
  }

  get Expanded(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentPortfolioPanelExpanded))
  }

  expandPanel() {
    this.store.dispatch(new ExpandPanel())
  }

  collapsePanel() {
    this.store.dispatch(new CollapsePanel())
  }
}
