import { Injectable } from '@angular/core'
import { GetPackNavigationService } from '../get-pack-navigation.service'

import { Observable, of } from 'rxjs'
import { GetPackNavigationGQL, ExpandNavNodeGQL } from '../../../generated/graphql'
import { first, tap, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GetPackNavigationApolloService implements GetPackNavigationService {
  constructor(
    private getPackNavigationGQL: GetPackNavigationGQL,
    private expandNavNodeGQL: ExpandNavNodeGQL
    ) { }

  public getPackNavigation(input): Observable<any> {
    return this.getPackNavigationGQL
    .watch()
      .valueChanges
        .pipe(
          map((result: any) => result.data.navigatorTree)
        )
  }

  public expandNavNode(input): Observable<any> {
    // tslint:disable-next-line:no-console
    console.log('say cheese')
    return  this.expandNavNodeGQL.mutate({input: '1'})
    .pipe(
      // tslint:disable-next-line:no-console
      tap(r => console.log('expandNavNode', r))
    )
  }

}
