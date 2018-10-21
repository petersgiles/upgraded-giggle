import { Injectable } from '@angular/core'

import { Observable, forkJoin, of } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import {
  DataResult,
  AnnouncementType,
  Party,
  Portfolio,
  Commitment
} from '../../models/commitment-models'
import {
  byIdQuery,
  byCommitmentIdQuery,
  mapLocations,
  mapCommitment,
  mapComments,
  mapCommitments,
  mapAnnouncementTypes,
  mapParties,
  mapPortfolios
} from './sharepoint-data-maps'

@Injectable({
  providedIn: 'root'
})
export class SharepointDataService {
  constructor(private sharepoint: SharepointJsomService) {}

  upsertCommitment(commitment: Commitment): Observable<DataResult<{}>> {
    const spCommitment = {
      CommitmentType: commitment.type.id,
      Contacts: commitment.contacts,
      Cost: commitment.cost,
      Date: commitment.date,
      Description: commitment.description,
      Location: commitment.location.id,
      PoliticalParty: commitment.party.id,
      Portfolio: commitment.portfolio.id,
      Title: commitment.title
    }

    return this.sharepoint
      .storeItem({
        listName: 'Commitment',
        data: spCommitment,
        id: commitment.id
      })
      .pipe(concatMap(_ => this.getCommitment({ id: commitment.id })))
  }

  upsertComment(comment: {
    commitment: any;
    parent: any;
    comment: any;
  }): Observable<any> {
    const spCommitment = {
      Title: comment.commitment,
      Commitment: comment.commitment,
      Parent: comment.parent,
      Text: comment.comment
    }

    return this.sharepoint
      .storeItem({
        listName: 'CommitmentComment',
        data: spCommitment
      })
      .pipe(concatMap(_ => this.getCommitment({ id: comment.commitment })))
  }

  getCommitment(criteria: {
    id: any;
  }): Observable<
    DataResult<{
      announcementTypes: AnnouncementType[];
      parties: Party[];
      portfolios: Portfolio[];
      commitment: Commitment;
      locations: Location[];
    }>
  > {
    return forkJoin([
      this.sharepoint.getItems({
        listName: 'Commitment',
        viewXml: byIdQuery(criteria)
      }),
      this.sharepoint.getItems({
        listName: 'CommitmentComment',
        viewXml: byCommitmentIdQuery(criteria)
      }),
      this.getLookupData()
    ]).pipe(
      concatMap(([spCommitment, spComments, spLookups]) => {
        let commitment = null
        if (spCommitment[0]) {
          commitment = mapCommitment({
            commitment: spCommitment[0],
            parties: spLookups.parties,
            portfolios: spLookups.portfolios,
            announcementTypes: spLookups.announcementTypes,
            locations: spLookups.electorates,
            comments: mapComments(spComments)
          })
        }

        const response: DataResult<{
          announcementTypes: AnnouncementType[];
          parties: Party[];
          portfolios: Portfolio[];
          commitment: Commitment;
          locations: Location[];
        }> = {
          data: {
            commitment: commitment,
            parties: spLookups.parties,
            portfolios: spLookups.portfolios,
            announcementTypes: spLookups.announcementTypes,
            locations: spLookups.electorates
          },
          loading: false
        }

        // tslint:disable-next-line:no-console
        console.log(response, spCommitment, spLookups)

        return of(response)
      })
    )
  }

  filterCommitments(filter?: {
    party?: string;
    type?: string;
    portfolio?: string;
  }): Observable<
    DataResult<{
      commitments: Commitment[];
      announcementTypes: AnnouncementType[];
      parties: Party[];
      portfolios: Portfolio[];
      locations: Location[];
    }>
  > {
    return forkJoin([
      this.sharepoint.getItems({ listName: 'Commitment' }),
      this.getLookupData()
    ]).pipe(
      concatMap(([spCommitments, spLookups]) => {
        const commitments = mapCommitments({
          commitments: spCommitments,
          parties: spLookups.parties,
          portfolios: spLookups.portfolios,
          announcementTypes: spLookups.announcementTypes,
          locations: spLookups.electorates
        })

        const response: DataResult<{
          commitments: Commitment[];
          announcementTypes: AnnouncementType[];
          parties: Party[];
          portfolios: Portfolio[];
          locations: Location[];
        }> = {
          data: {
            commitments: commitments,
            parties: spLookups.parties,
            portfolios: spLookups.portfolios,
            announcementTypes: spLookups.announcementTypes,
            locations: spLookups.electorates
          },
          loading: false
        }

        // tslint:disable-next-line:no-console
        console.log(response, spLookups)

        return of(response)
      })
    )
  }

  getLookupData(): Observable<{
    announcementTypes: AnnouncementType[];
    parties: Party[];
    portfolios: Portfolio[];
    electorates: Location[];
  }> {
    return forkJoin([
      this.sharepoint.getItems({ listName: 'Portfolio' }),
      this.sharepoint.getItems({ listName: 'PoliticalParty' }),
      this.sharepoint.getItems({ listName: 'AnnouncementType' }),
      this.sharepoint.getItems({ listName: 'Electorate' })
    ]).pipe(
      concatMap(
        ([spPortfolios, spParties, spAnnouncementTypes, spElectorates]) => {
          const announcementTypes = mapAnnouncementTypes(spAnnouncementTypes)
          const parties = mapParties(spParties)
          const portfolios = mapPortfolios(spPortfolios)
          const electorates = mapLocations(spElectorates)

          return of({
            announcementTypes,
            parties,
            portfolios,
            electorates
          })
        }
      )
    )
  }
}
