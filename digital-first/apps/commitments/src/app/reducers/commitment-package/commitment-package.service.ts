import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import {
  ExpandPanel,
  CollapsePanel,
  AddPackageToCommitment,
  RemovePackageFromCommitment,
  GetPackagesByCommitment
} from './commitment-package.actions'
import { DataTableConfig } from '@digital-first/df-datatable'
import { Package } from '../../models'

@Injectable({
  providedIn: 'root'
})
export class CommitmentPackageService {
  constructor(private store: Store<fromRoot.State>) {}

  get UserOperation(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCurrentUserOperations))
  }

  addPackageToCommitment(commitment: any, mypackage: any): any {
    this.store.dispatch(new AddPackageToCommitment({ commitment, mypackage }))
  }

  removePackageFromCommitment(commitment: any, mypackage: any): any {
    this.store.dispatch(
      new RemovePackageFromCommitment({ commitment, mypackage })
    )
  }

  getPackagesByCommitment(commitment: number): any {
    this.store.dispatch(new GetPackagesByCommitment({ commitment }))
  }

  get Packages(): Observable<Package[]> {
    return this.store.pipe(select(fromRoot.getAllPackages))
  }

  get CommitmentPackages(): Observable<Package[]> {
    return this.store.pipe(select(fromRoot.getAllCommitmentPackages))
  }

  get Expanded(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentPackagePanelExpanded))
  }

  expandPanel() {
    this.store.dispatch(new ExpandPanel())
  }

  collapsePanel() {
    this.store.dispatch(new CollapsePanel())
  }
}
