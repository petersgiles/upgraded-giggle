import { Observable } from 'rxjs'

export abstract class LookupDataService {
  abstract getLookupDivisions(config?: any): Observable<any>
  abstract getLookupActivities(config?: any): Observable<any>
  abstract getLookupStatuses(config?: any): Observable<any>
  abstract getPolicies(config?: any): Observable<any>
  abstract getSubPolicies(config?: any): Observable<any>
  abstract getCommitments(config?: any): Observable<any>
  abstract getClassifications(config?: any): Observable<any>
  abstract getDLMs(config?: any): Observable<any>
  abstract getLookupSubscriptionTypes(config?: any): Observable<any>
}
