import { Injectable } from '@angular/core'
import { GetPackNavigationService } from '../get-pack-navigation.service'

import { Observable, of } from 'rxjs'
import { Apollo } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class GetPackNavigationApolloService implements GetPackNavigationService {
  constructor(private apollo: Apollo) { }
  getPackNavigation(briefId: any): Observable<any> {
    return of(null)
  }
}
