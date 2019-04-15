import { Injectable } from '@angular/core'
import { GetPackNavigationService } from '../get-pack-navigation.service'
import { SharepointJsomService } from '@df/sharepoint'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GetPackNavigationSharepointService implements GetPackNavigationService {
  expandNavNode(input: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  constructor(private sharepointlib: SharepointJsomService) {}

  getPackNavigation(briefId: any): Observable<any> {
    return of(null)
  }
}
