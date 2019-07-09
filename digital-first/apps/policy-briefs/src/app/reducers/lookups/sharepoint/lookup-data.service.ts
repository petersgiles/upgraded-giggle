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
    return of([])
  }
  getLookupActivities(config?: any): Observable<any> {
    return of([])
  }
  getLookupStatuses(config?: any): Observable<any> {
    return of([])
  }
  getPolicies(config?: any): Observable<any> {
    return of([])
  }
  getSubPolicies(config?: any): Observable<any> {
    return of([])
  }
  getCommitments(config?: any): Observable<any> {
    return of([])
  }
  getClassifications(config?: any): Observable<any> {
    return of([])
  }
  getDLMs(config?: any): Observable<any> {
    return of([])
  }

  constructor(private sharepointJsomService: SharepointJsomService) {}
}
