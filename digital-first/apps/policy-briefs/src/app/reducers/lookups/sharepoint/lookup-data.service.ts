import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { LookupDataService } from '../lookup-data.service'
import { LookupMapperService } from '../../../services/mappers/lookup-mapper.service';
import { SharepointJsomService } from '@df/sharepoint';

@Injectable({
  providedIn: 'root'
})
export class LookupDataSharepointService implements LookupDataService {
  getLookupDivisions(config?: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  getLookupActivities(config?: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  getLookupStatuses(config?: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  getPolicies(config?: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  getSubPolicies(config?: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  getCommitments(config?: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  getClassifications(config?: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  getDLMs(config?: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  fakeLookupBackend: Subject<any[]> = new Subject()
  fakeLookupBackendSubscription$: Subscription
 
  constructor(private harepointJsomService: SharepointJsomService) {}
}
