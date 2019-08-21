import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { LookupDataService } from '../lookup-data.service'
import { LookupMapperService } from '../../../services/mappers/lookup-mapper.service'
import { SharepointJsomService, fromLookup, idFromLookup } from '@df/sharepoint'
import { concatMap, tap, switchMap } from 'rxjs/operators'

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
    return of([
      {
        id: '1',
        icon: 'people',
        colour: 'Pink',
        order: 1,
        caption: `Decision`
      },
      {
        id: '2',
        icon: 'people',
        colour: 'Pink',
        order: 2,
        caption: `New Comments`
      },
      {
        id: '3',
        icon: 'people',
        colour: 'Pink',
        order: 3,
        caption: `New Documents`
      },
      {
        id: '4',
        icon: 'people',
        colour: 'Pink',
        order: 4,
        caption: `Updates and Changes`
      }
    ])
  }
  getLookupStatuses(config?: any): Observable<any> {
    console.log('getLookupStatuses', config)

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
      .pipe(
        concatMap(result => this.mapLookup(result)),
      )
  }
  getSubPolicies(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'SubPolicy'
      })
      .pipe(
        concatMap(result => {
          

          var data = result.map(r => {
            var policy = idFromLookup(r.Policy)
            return {
              caption: r.Title,
              value: r.ID,
              policy: policy
            }
          })

          return of(
            data
          )
        })
      )
  }
  getCommitments(config?: any): Observable<any> {
    return this.sharepoint
      .getItems({
        listName: 'Commitments'
      })
      .pipe(concatMap(result => this.mapLookup(result)))
  }

  getClassifications(config?: any): Observable<any> {
    return of([
      {
        caption: 'UNCLASSIFIED',
        value: 'UNCLASSIFIED'
      },
      {
        caption: 'IN CONFIDENCE',
        value: 'IN CONFIDENCE'
      },
      {
        caption: 'PROTECTED',
        value: 'PROTECTED'
      }
    ])
  }

  getDLMs(config?: any): Observable<any> {
    return of([
      {
        caption: 'Not for tabling - For Official Use Only',
        value: 'Not for tabling - For Official Use Only'
      },
      {
        caption: 'For Official Use Only',
        value: 'For Official Use Only'
      },
      {
        caption: 'Sensitive',
        value: 'Sensitive'
      },
      {
        caption: 'Sensitive Cabinet',
        value: 'Sensitive Cabinet'
      },
      {
        caption: 'Sensitive Legal',
        value: 'Sensitive Legal'
      },
      {
        caption: 'Sensitive Personal',
        value: 'Sensitive Personal'
      }
    ])
  }

  mapLookup = list => {
    const data = this.lookupMapper.mapMany(list)
    return of(data)
  }

  constructor(
    private sharepoint: SharepointJsomService,
    private lookupMapper: LookupMapperService
  ) {}
}
