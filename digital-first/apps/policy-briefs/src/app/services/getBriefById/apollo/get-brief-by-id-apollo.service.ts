import { Injectable } from '@angular/core'
import { GetBriefByIdService } from '../get-brief-by-id.service'
import { Apollo } from 'apollo-angular'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GetBriefByIdApolloService implements GetBriefByIdService {
  getBriefById(briefId: any): Observable<any> {
    return of(null)
  }
  constructor(private apollo: Apollo) {}
}
