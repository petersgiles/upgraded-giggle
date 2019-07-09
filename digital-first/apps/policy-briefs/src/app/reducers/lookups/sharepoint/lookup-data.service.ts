import { Injectable } from '@angular/core'
import {
  Observable,
  of
} from 'rxjs'
import { LookupDataService } from '../lookup-data.service'
import { LookupMapperService } from '../../../services/mappers/lookup-mapper.service'
import { SharepointJsomService } from '@df/sharepoint'
import { concatMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LookupDataSharepointService implements LookupDataService {
  getLookupDivisions(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'BriefDivision'
      })
      .pipe(concatMap(result => this.mapLookup(result)))
  }
  getLookupActivities(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'BriefStatus'
      })
      .pipe(concatMap(result => this.mapLookup(result)))
  }
  getLookupStatuses(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'BriefStatus'
      })
      .pipe(concatMap(result => this.mapLookup(result)))
  }
  getPolicies(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'Policy'
      })
      .pipe(concatMap(result => this.mapLookup(result)))
  }
  getSubPolicies(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'SubPolicy'
      })
      .pipe(concatMap(result => this.mapLookup(result)))
  }
  getCommitments(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'Commitments'
      })
      .pipe(concatMap(result => this.mapLookup(result)))
  }
  getClassifications(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'BriefClassifications'
      })
      .pipe(concatMap(result => this.mapLookup(result)))
  }
  getDLMs(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'BriefDLMs'
      })
      .pipe(
        concatMap(result => this.mapLookup(result))
      )
  }

  mapLookup = (list) => {
    const data = this.lookupMapper.mapMany(list)
    return of(data)
  }

  constructor(private sharepoint: SharepointJsomService, private lookupMapper: LookupMapperService) {}
}
