import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription, EMPTY } from 'rxjs'
import { LookupDataService } from '../lookup-data.service'
import { LookupMapperService } from '../../../services/mappers/lookup-mapper.service';
import { SharepointJsomService } from '@df/sharepoint';

@Injectable({
  providedIn: 'root'
})
export class LookupDataSharepointService implements LookupDataService {
  getLookupDivisions(config?: any): Observable<any> {
    return of(EMPTY)
  }
  getLookupActivities(config?: any): Observable<any> {
    return of(EMPTY)
  }
  getLookupStatuses(config?: any): Observable<any> {
    return of(EMPTY)
  }
  getPolicies(config?: any): Observable<any> {
    return of(EMPTY)
  }
  getSubPolicies(config?: any): Observable<any> {
    return of(EMPTY)
  }
  getCommitments(config?: any): Observable<any> {
    return of(EMPTY)
  }
  getClassifications(config?: any): Observable<any> {
    return of(EMPTY)
  }
  getDLMs(config?: any): Observable<any> {
    return of(EMPTY)
  }

  constructor(private sharepointJsomService: SharepointJsomService) {}
}
