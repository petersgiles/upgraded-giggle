import { Injectable } from '@angular/core'
import { GetPackNavigationService } from '../get-pack-navigation.service'
import { SharepointJsomService } from '@df/sharepoint'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GetPackNavigationSharepointService implements GetPackNavigationService {
  constructor(private sharepointlib: SharepointJsomService) {}

  getPackNavigation(briefId: any): Observable<any> {
    return of(null)
  }
}
