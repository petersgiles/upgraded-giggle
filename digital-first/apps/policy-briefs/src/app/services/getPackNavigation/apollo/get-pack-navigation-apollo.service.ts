import { Injectable } from '@angular/core'
import { GetPackNavigationService } from '../get-pack-navigation.service'

import { Observable, of } from 'rxjs'
import { GetPackNavigationGQL, ActivatePackNavigationNodeGQL, ToggleExpandPackNavigationNodeGQL } from '../../../generated/graphql'
import { first, tap, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GetPackNavigationApolloService implements GetPackNavigationService {
  constructor(
    private getPackNavigationGQL: GetPackNavigationGQL,
    private toggleExpandPackNavigationNodeGQL: ToggleExpandPackNavigationNodeGQL,
    private activatePackNavigationNodeGQL: ActivatePackNavigationNodeGQL
    ) { }

  public getPackNavigation(input): Observable<any> {
    return this.getPackNavigationGQL
    .watch()
      .valueChanges
        .pipe(
          tap((result: any) => console.log(`🐸`, result.data.navigatorTree)),
          map((result: any) => result.data.navigatorTree)
        )
  }

  public toggleExpandPackNavigationNode(input: {id: string, isExpanded: boolean}): Observable<any> {
    return  this.toggleExpandPackNavigationNodeGQL.mutate({input})
  }

  public activatePackNavigationNode(input: {id: string, isActive: boolean}): Observable<any> {
    return  this.activatePackNavigationNodeGQL.mutate({input})
  }

}
