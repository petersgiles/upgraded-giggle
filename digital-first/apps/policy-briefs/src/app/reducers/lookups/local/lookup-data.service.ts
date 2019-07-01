import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { LookupDataService } from '../lookup-data.service'
import { policies, subpolicies, commitments, classifications, dlms } from 'apps/policy-briefs/src/devdata/data';


const policyMap = policies.map(p => ({ caption: p.Title, value: `${p.Id}` }))
const subpolicyMap = subpolicies.map(p => ({
  caption: p.Title,
  value: `${p.Id}`
}))

const commitmentMap = commitments.map(p => ({
  caption: p.Title,
  value: `${p.ID}`
}))

@Injectable({
  providedIn: 'root'
})
export class LookupDataLocalService implements LookupDataService {

  private policies$: BehaviorSubject<
    {
      caption: string
      value: string
    }[]
  > = new BehaviorSubject(policyMap)

  private subpolicies$: BehaviorSubject<
    {
      caption: string
      value: string
    }[]
  > = new BehaviorSubject(subpolicyMap)

  private commitment$: BehaviorSubject<
    {
      caption: string
      value: string
    }[]
  > = new BehaviorSubject(commitmentMap)

  private classifications$: BehaviorSubject<
    {
      caption: string
      value: string
    }[]
  > = new BehaviorSubject(classifications)

  private dlms$: BehaviorSubject<
    {
      caption: string
      value: string
    }[]
  > = new BehaviorSubject(dlms)


  getPolicies = (config?: any): Observable<any> => this.policies$
  getSubPolicies = (config?: any): Observable<any> => this.subpolicies$
  getCommitments = (config?: any): Observable<any> => this.commitment$
  getClassifications = (config?: any): Observable<any> => this.classifications$
  getDLMs = (config?: any): Observable<any> => this.dlms$

  constructor() {}
}
