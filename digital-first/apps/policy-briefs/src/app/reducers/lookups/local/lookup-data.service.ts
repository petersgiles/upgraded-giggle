import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { LookupDataService } from '../lookup-data.service'
import { policies, subpolicies, commitments, classifications, dlms, briefstatuses, activityList } from 'devdata/data';
import { DocumentStatus } from '@df/components';


interface LookupValue {
  caption: string
  value: string
}

const policyMap = policies.map(p => ({ caption: p.Title, value: `${p.Id}` }))
const subpolicyMap = subpolicies.map(p => ({
  caption: p.Title,
  value: `${p.Id}`,
  policy: p.Policy.Id,
}))

const commitmentMap = commitments.map(p => ({
  caption: p.Title,
  value: `${p.ID}`
}))


const statusMap: DocumentStatus[] = briefstatuses.map(p => ({
  id: `${p.ID}`,
  icon: p.Icon,
  caption: p.Title,
  colour: p.Colour,
  order: p.SortOrder
}))

const activityListMap = activityList.map(p => ({ caption: p.caption, value: `${p.id}` }))
@Injectable({
  providedIn: 'root'
})
export class LookupDataLocalService implements LookupDataService {


  private policies$: BehaviorSubject<LookupValue[]> = new BehaviorSubject(policyMap)
  private subpolicies$: BehaviorSubject<LookupValue[]> = new BehaviorSubject(subpolicyMap)
  private commitment$: BehaviorSubject<LookupValue[]> = new BehaviorSubject(commitmentMap)
  private classifications$: BehaviorSubject<LookupValue[]> = new BehaviorSubject(classifications)
  private dlms$: BehaviorSubject<LookupValue[]> = new BehaviorSubject(dlms)
  private divisions$: BehaviorSubject<LookupValue[]> = new BehaviorSubject(dlms)
  private activities$: BehaviorSubject<any[]> = new BehaviorSubject(activityList)
  private statuses$: BehaviorSubject<DocumentStatus[]> = new BehaviorSubject(statusMap)
  private subscriptionTypes$: BehaviorSubject<LookupValue[]> = new BehaviorSubject(activityListMap)

  getPolicies = (config?: any): Observable<any> => this.policies$
  getSubPolicies = (config?: any): Observable<any> => this.subpolicies$
  getCommitments = (config?: any): Observable<any> => this.commitment$
  getClassifications = (config?: any): Observable<any> => this.classifications$
  getDLMs = (config?: any): Observable<any> => this.dlms$
  getLookupDivisions = (config?: any): Observable<any> => this.divisions$
  getLookupActivities = (config?: any): Observable<any> => this.activities$
  getLookupStatuses = (config?: any): Observable<any> => this.statuses$
  getLookupSubscriptionTypes = (config?: any): Observable<any> => this.subscriptionTypes$
  constructor() {}
}
