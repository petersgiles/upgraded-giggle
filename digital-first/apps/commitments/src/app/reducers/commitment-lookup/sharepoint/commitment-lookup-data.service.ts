import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { Observable, of } from 'rxjs'
import { CommentsResult, DataResult } from '../../../models'
import { concatMap, tap, map } from 'rxjs/operators'
import { byCommitmentIdQuery } from '../../../services/sharepoint/caml'
import { CommitmentLookupDataService } from '../commitment-lookup-data.service'
import { mapWhoAnnouncedTypes, mapAnnouncementTypes, mapPortfolios, mapCriticalDates,
  mapParties, mapCommitmentTypes, mapLocations, mapPackageTypes, mapThemeTypes, mapStatuses, mapCommitmentPortfolios } from './maps'

@Injectable({
    providedIn: 'root'
})
export class CommitmentLookupDataSharePointService implements CommitmentLookupDataService {
  filterStatuses(filter?: any) {
        return this.sharepoint.getItems({ listName: 'Status' })
        .pipe(
          concatMap((result: any) =>
            of({
              data: { statuses: mapStatuses(result) },
              loading: false,
              error: null
            }))
        )
  }

  filterPackageTypes(filter: any) {
    return this.sharepoint.getItems({ listName: 'PackageType' })
    .pipe(
      concatMap((result: any) =>
        of({
          data: { packageTypes: mapPackageTypes(result) },
          loading: false,
          error: null
        }))
    )
}
  filterThemeTypes(filter: any) {
    return this.sharepoint.getItems({ listName: 'ThemeType' })
    .pipe(
      concatMap((result: any) =>
        of({
          data: { themeTypes: mapThemeTypes(result) },
          loading: false,
          error: null
        }))
    )
}
    filterWhoAnnouncedTypes(filter: any) {
        return this.sharepoint.getItems({ listName: 'WhoAnnouncedType' })
        .pipe(
          concatMap((result: any) =>
            of({
              data: { whoAnnouncedTypes: mapWhoAnnouncedTypes(result) },
              loading: false,
              error: null
            }))
        )
    }
    filterPortfolios(filter: any) {
        return this.sharepoint.getItems({ listName: 'Portfolio' })
        .pipe(
          concatMap((result: any) =>
            of({
              data: { portfolios: mapPortfolios(result) },
              loading: false,
              error: null
            }))
        )
    }
    filterPartys(filter: any) {
        return this.sharepoint.getItems({ listName: 'PoliticalParty' })
        .pipe(
          concatMap((result: any) =>
            of({
              data: { parties: mapParties(result) },
              loading: false,
              error: null
            }))
        )
    }
    filterLocations(filter: any) {
        return this.sharepoint.getItems({ listName: 'Electorate' })
        .pipe(
          concatMap((result: any) =>
            of({
              data: { locations: mapLocations(result) },
              loading: false,
              error: null
            }))
        )
    }
    filterCriticalDates(filter: any) {
        return this.sharepoint.getItems({ listName: 'CriticalDate' })
        .pipe(
          concatMap((result: any) =>
            of({
              data: { criticalDates: mapCriticalDates(result) },
              loading: false,
              error: null
            }))
        )
    }
    filterCommitmentTypes(filter: any) {
        return this.sharepoint.getItems({ listName: 'CommitmentType' })
        .pipe(
          concatMap((result: any) =>
            of({
              data: { commitmentTypes: mapCommitmentTypes(result) },
              loading: false,
              error: null
            }))
        )
    }
    filterAnnouncementTypes(filter: any) {
        return this.sharepoint.getItems({ listName: 'AnnouncementType' })
        .pipe(
          concatMap((result: any) =>
            of({
              data: { announcementTypes: mapAnnouncementTypes(result) },
              loading: false,
              error: null
            }))
        )
    }

    filterCommitmentPortfolios(filter: any) {
      return this.sharepoint.getItems({ listName: 'CommitmentPortfolio' })
      .pipe(
        concatMap((result: any) =>
          of({
            data: { commitmentPortfolios: mapCommitmentPortfolios(result) },
            loading: false,
            error: null
          }))
      )
  }

    constructor(private sharepoint: SharepointJsomService) { }
}
