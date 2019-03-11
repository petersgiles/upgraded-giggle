import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import {
  ExpandPanel,
  CollapsePanel,
  AddThemeToCommitment,
  RemoveThemeFromCommitment,
  GetThemesByCommitment
} from './commitment-theme.actions'
import { DataTableConfig } from '@digital-first/df-datatable'
import { Theme } from '../../models'
import { GetPortfoliosByCommitment } from '../commitment-portfolio/commitment-portfolio.actions';

@Injectable({
  providedIn: 'root'
})
export class CommitmentThemeService {
  constructor(private store: Store<fromRoot.State>) {}

  get UserOperation(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCurrentUserOperations))
  }

  addThemeToCommitment(commitment: any, theme: any): any {
    this.store.dispatch(new AddThemeToCommitment({ commitment, theme }))
  }

  removeThemeFromCommitment(commitment: any, theme: any): any {
    this.store.dispatch(
      new RemoveThemeFromCommitment({ commitment, theme })
    )
  }

  getThemesByCommitment(commitment: number): any {
    console.log("Get Themes by commitment")
    this.store.dispatch(new GetThemesByCommitment({ commitment }))
    // this.store.dispatch(new GetPortfoliosByCommitment({ commitment }))
  }

  get Themes(): Observable<Theme[]> {
    // return this.store.pipe(select(fromRoot.getAllThemes))

    return this.store.pipe(select(fromRoot.getAllPortfolios))
  }

  get CommitmentThemes(): Observable<Theme[]> {
    return this.store.pipe(select(fromRoot.getAllCommitmentThemes))
    // return this.store.pipe(select(fromRoot.getAllCommitmentPortfolios))
  }

  get Expanded(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentThemePanelExpanded))
  }

  expandPanel() {
    this.store.dispatch(new ExpandPanel())
  }

  collapsePanel() {
    this.store.dispatch(new CollapsePanel())
  }
}
