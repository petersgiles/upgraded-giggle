import { Observable } from 'rxjs'

export abstract class LookupDataService {
    abstract getPolicies(config?: any): Observable<any>
    abstract getSubPolicies(config?: any): Observable<any>
    abstract getCommitments(config?: any): Observable<any>
    abstract getClassifications(config?: any): Observable<any>
    abstract getDLMs(config?: any): Observable<any>
}
