import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { CommitmentThemeDataService } from '../commitment-theme-data.service'
import { Observable, of } from 'rxjs'
import {
  DataResult,
  ThemeTypesResult,
} from '../../../models'
import { concatMap, map } from 'rxjs/operators'
import {
  byJoinTableQuery,
  byCommitmentIdQuery,
  byIdsQuery
} from '../../../services/sharepoint/caml'
import { mapCommitmentThemes } from './maps'
import { mapThemeTypes } from '../../commitment-lookup/sharepoint/maps'

@Injectable({
  providedIn: 'root'
})
export class CommitmentThemeDataSharePointService
  implements CommitmentThemeDataService {
  getThemesByCommitment(
    commitment: any
  ): Observable<DataResult<ThemeTypesResult>> {
    const viewXml = byCommitmentIdQuery({ id: commitment })

    return this.sharepoint
      .getItems({
        listName: 'CommitmentTheme',
        viewXml: viewXml
      })
      .pipe(

        map(mapCommitmentThemes),

        concatMap((result: any) => {
          const ids = result.map(p => p.theme)
          const themeViewXml = byIdsQuery(ids)

          if (themeViewXml) {
            return this.sharepoint
              .getItems({
                listName: 'ThemeType',
                viewXml: themeViewXml
              })
              .pipe(

                concatMap(themes =>
                  of({
                    data: { themeTypes: mapThemeTypes(themes) },
                    loading: false
                  })
                )
              )
          } else {
            return of({
              data: { themeTypes: [] },
              loading: false
            })
          }
        })
      )
  }

  addThemeToCommitment(variables: {
    commitment: number
    theme: any
  }): Observable<DataResult<{ commitment: number }>> {

    const spComment = {
      Title: `${variables.commitment} ${variables.theme}`,
      Commitment: variables.commitment,
      Theme: variables.theme
    }

    return this.sharepoint
      .storeItem({
        listName: 'CommitmentTheme',
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

  removeThemeFromCommitment(variables: {
    commitment: number
    theme: any
  }) {
    const viewXml = byJoinTableQuery({
      fieldA: { name: 'Commitment', id: variables.commitment },
      fieldB: { name: 'Theme', id: variables.theme }
    })

    return this.sharepoint
      .getItems({
        listName: 'CommitmentTheme',
        viewXml: viewXml
      })
      .pipe(
        map(mapCommitmentThemes),
        map(result => result[0]),
        concatMap(result =>
          this.sharepoint
            .removeItem({
              listName: 'CommitmentTheme',
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
