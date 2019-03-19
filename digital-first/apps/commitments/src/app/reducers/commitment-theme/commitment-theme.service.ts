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
import { ThemeType } from '../../models'
import { MegaTag } from '@df/components';

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
    this.store.dispatch(new GetThemesByCommitment({ commitment }))
  }

  get CommitmentThemes(): Observable<ThemeType[]> {
    return this.store.pipe(select(fromRoot.getAllCommitmentThemes))
  }

  get SelectedMegaTags(): Observable<MegaTag[]> {
    return this.store.pipe(select(fromRoot.getRelatedCommitmentThemes))
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
