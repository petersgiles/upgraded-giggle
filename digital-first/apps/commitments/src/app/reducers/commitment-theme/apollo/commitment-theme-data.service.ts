import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, ThemeTypesResult } from '../../../models'
import { REMOVE_COMMITMENT_THEME, STORE_COMMITMENT_THEME, GET_COMMITMENT_THEMES } from './queries'
import { CommitmentThemeDataService as CommitmentThemeDataService } from '../commitment-theme-data.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommitmentThemeDataApolloService implements CommitmentThemeDataService {

  getThemesByCommitment = (commitment: any): Observable<DataResult<ThemeTypesResult>> =>
    callQuery<ThemeTypesResult>(this.apollo, { query: GET_COMMITMENT_THEMES, variables: { commitment: commitment } }
      , result => ({ data: {themeTypes: result.data.commitmentThemes } })
    )

  addThemeToCommitment = (variables: { commitment: any, theme: any }): Observable<DataResult<{ commitment: number }>> =>
    callMutate<any>(this.apollo,
      { mutation: STORE_COMMITMENT_THEME, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.storeCommitmentTheme.id } })
    )

  removeThemeFromCommitment = (variables: { commitment: any, theme: any }): Observable<DataResult<{ commitment: number }>> =>
    callMutate<any>(this.apollo,
      { mutation: REMOVE_COMMITMENT_THEME, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.deleteCommitmentTheme.id } })
    )

  constructor(private apollo: Apollo) { }
}
