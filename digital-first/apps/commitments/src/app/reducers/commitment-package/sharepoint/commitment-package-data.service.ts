import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { CommitmentPackageDataService } from '../commitment-package-data.service'
import { Observable, of } from 'rxjs'
import {
  DataResult,
  PackagesResult,
  CommitmentPackagesResult
} from '../../../models'
import { concatMap, map, tap } from 'rxjs/operators'
import {
  byJoinTableQuery,
  byCommitmentIdQuery,
  byIdsQuery
} from '../../../services/sharepoint/caml'
import { mapCommitmentPackages } from './maps'
import { mapPackages } from '../../commitment-lookup/sharepoint/maps'

@Injectable({
  providedIn: 'root'
})
export class CommitmentPackageDataSharePointService
  implements CommitmentPackageDataService {
  getPackagesByCommitment(
    commitment: any
  ): Observable<DataResult<CommitmentPackagesResult>> {
    const viewXml = byCommitmentIdQuery({ id: commitment })

    return this.sharepoint
      .getItems({
        listName: 'CommitmentPackage',
        viewXml: viewXml
      })
      .pipe(

        map(mapCommitmentPackages),

        concatMap((result: any) => {
          const ids = result.map(p => p.package)
          const packageViewXml = byIdsQuery(ids)

          if (packageViewXml) {
            return this.sharepoint
              .getItems({
                listName: 'PackageType',
                viewXml: packageViewXml
              })
              .pipe(

                concatMap(packages =>
                  of({
                    data: { commitmentPackages: mapPackages(packages) },
                    loading: false
                  })
                )
              )
          } else {
            return of({
              data: { commitmentPackages: [] },
              loading: false
            })
          }
        })
      )
  }

  addPackageToCommitment(variables: {
    commitment: number
    mypackage: any
  }): Observable<DataResult<{ commitment: number }>> {
    const spComment = {
      Title: `${variables.commitment} ${variables.mypackage}`,
      Commitment: variables.commitment,
      Package: variables.mypackage
    }

    return this.sharepoint
      .storeItem({
        listName: 'CommitmentPackage',
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

  removePackageFromCommitment(variables: {
    commitment: number
    mypackage: any
  }) {
    const viewXml = byJoinTableQuery({
      fieldA: { name: 'Commitment', id: variables.commitment },
      fieldB: { name: 'Package', id: variables.mypackage }
    })

    return this.sharepoint
      .getItems({
        listName: 'CommitmentPackage',
        viewXml: viewXml
      })
      .pipe(
        map(mapCommitmentPackages),
        map(result => result[0]),
        concatMap(result =>
          this.sharepoint
            .removeItem({
              listName: 'CommitmentPackage',
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
