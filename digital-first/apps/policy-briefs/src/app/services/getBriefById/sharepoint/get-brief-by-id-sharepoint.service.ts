import { Injectable } from '@angular/core'
import { GetBriefByIdService } from '../get-brief-by-id.service'
import { SharepointJsomService } from '@df/sharepoint'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GetBriefByIdSharepointService implements GetBriefByIdService {
  constructor(private sharepointlib: SharepointJsomService) {}

  getBriefById(briefId: any): Observable<any> {
    return of(null)
  }
}
