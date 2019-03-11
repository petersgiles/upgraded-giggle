import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, PackagesResult, CommitmentPackagesResult } from '../../../models'
import { REMOVE_COMMITMENT_PACKAGE, STORE_COMMITMENT_PACKAGE, GET_COMMITMENT_PACKAGES } from './queries'
import { CommitmentPackageDataService } from '../commitment-package-data.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommitmentPackageDataApolloService implements CommitmentPackageDataService {

  getPackagesByCommitment = (commitment: any): Observable<DataResult<CommitmentPackagesResult>> =>
    callQuery<CommitmentPackagesResult>(this.apollo, { query: GET_COMMITMENT_PACKAGES, variables: { commitment: commitment } }
      , result => ({ data: {commitmentPackages: result.data.commitmentPackages } })
    )

  addPackageToCommitment = (variables: { commitment: any, mypackage: any }): Observable<DataResult<{ commitment: number }>> =>
    callMutate<any>(this.apollo,
      { mutation: STORE_COMMITMENT_PACKAGE, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.storeCommitmentPackage.id } })
    )

  removePackageFromCommitment = (variables: { commitment: any, mypackage: any }): Observable<DataResult<{ commitment: number }>> =>
    callMutate<any>(this.apollo,
      { mutation: REMOVE_COMMITMENT_PACKAGE, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.deleteCommitmentPackage.id } })
    )

  constructor(private apollo: Apollo) { }
}
