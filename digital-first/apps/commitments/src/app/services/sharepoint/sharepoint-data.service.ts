import { Injectable } from '@angular/core'

import { Observable, of } from 'rxjs'
import { concatMap, map } from 'rxjs/operators'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { AppDataService } from '../app-data.service'

import {
  byIdQuery,
  byCommitmentIdQuery,
  mapLocations,
  mapCommitment,
  mapComments,
  mapCommitments,
  mapAnnouncementTypes,
  mapParties,
  mapPortfolios,
  mapContacts,
  mapCommitmentTypes,
  mapWhoAnnouncedTypes
} from './sharepoint-data-maps'

import {
  DataResult,
  CommitmentResult,
  CommitmentsResult,
  AnnouncementTypesResult,
  CommentsResult,
  PortfoliosResult,
  PartysResult,
  ContactsResult,
  LocationsResult,
  CommitmentTypesResult,
  WhoAnnouncedTypesResult
} from '../../models'
import { Commitment } from '../../reducers/commitment'

@Injectable({
  providedIn: 'root'
})
export class SharepointDataService implements AppDataService {

  getCommitment(criteria: { id: any; }): Observable<DataResult<CommitmentResult>> {

    return this.sharepoint.getItems({
      listName: 'Commitment',
      viewXml: byIdQuery(criteria)
    }).pipe(
      map(result => result[0]),
      concatMap((commitment: any) =>
        of({
          data: { commitment: mapCommitment(commitment) },
          loading: false
        }))
    )
  }

  getCommentsByCommitment(commitment: number): Observable<DataResult<CommentsResult>> {
    return this.sharepoint.getItems({
      listName: 'CommitmentComment',
      viewXml: byCommitmentIdQuery({ id: commitment })
    }).pipe(
      concatMap((comments: any) =>
        of({
          data: { comments: mapComments(comments) },
          loading: false
        }))
    )
  }

  filterCommitments(filter?: { party?: string; type?: string; portfolio?: string; }): Observable<DataResult<CommitmentsResult>> {
    return this.sharepoint.getItems({ listName: 'Commitment' })
      .pipe(
        concatMap((result: any) =>
          of({
            data: { commitments: mapCommitments(result) },
            loading: false,
            error: null
          }))
      )
  }

  filterWhoAnnouncedTypes(filter?: any): Observable<DataResult<WhoAnnouncedTypesResult>> {
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

  filterAnnouncementTypes(filter?: any): Observable<DataResult<AnnouncementTypesResult>> {
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

  filterPortfolios(filter?: any): Observable<DataResult<PortfoliosResult>> {
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

  filterPartys(filter?: any): Observable<DataResult<PartysResult>> {
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

  filterParties(filter?: any): Observable<DataResult<PartysResult>> {
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

  filterContacts(filter?: any): Observable<DataResult<ContactsResult>> {
    return this.sharepoint.getItems({ listName: 'Contact' })
      .pipe(
        concatMap((result: any) =>
          of({
            data: { contacts: mapContacts(result) },
            loading: false,
            error: null
          }))
      )
  }

  filterLocations(filter?: any): Observable<DataResult<LocationsResult>> {
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

  filterCommitmentTypes(filter?: any): Observable<DataResult<CommitmentTypesResult>> {

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

  storeCommitment(commitment: Commitment): Observable<DataResult<CommitmentResult>> {

    const spCommitment = {
      WhoAnnouncedType: commitment.whoAnnouncedType,
      AnnouncementType: commitment.announcementType,
      CommitmentType: commitment.commitmentType,
      Contacts: commitment.contacts,
      Cost: commitment.cost,
      Date: commitment.date,
      Description: commitment.description,
      Location: commitment.location,
      PoliticalParty: commitment.party,
      Portfolio: commitment.portfolio,
      Title: commitment.title
    }

    return this.sharepoint
      .storeItem({
        listName: 'Commitment',
        data: spCommitment,
        id: commitment.id
      }).pipe(
        concatMap(result => {
          const cdr: DataResult<CommitmentResult> = { data: {
            commitment: mapCommitment(result)
          }, loading: false }
          return of(cdr)
        })
      )
  }

  storeComment(comment: { commitment: any; parent: any; comment: any; }): Observable<any> {

    const spComment = {
      Title: comment.commitment,
      Commitment: comment.commitment,
      Parent: comment.parent,
      Text: comment.comment
    }

    return this.sharepoint.storeItem({
      listName: 'CommitmentComment',
      data: spComment,
    })
  }

  deleteComment(comment: { id: any }) {
    return this.sharepoint.removeItem({
      listName: 'CommitmentComment',
      id: comment.id,
    })
  }

  constructor(private sharepoint: SharepointJsomService) { }

  // upsertCommitment(commitment: Commitment): Observable<DataResult<{}>> {
  //   const spCommitment = {
  //     AnnouncementType: commitment.announcementType.id,
  //     CommitmentType: commitment.commitmentType.id,
  //     Contacts: commitment.contacts,
  //     Cost: commitment.cost,
  //     Date: commitment.date,
  //     Description: commitment.description,
  //     Location: commitment.location.id,
  //     PoliticalParty: commitment.party.id,
  //     Portfolio: commitment.portfolio.id,
  //     Title: commitment.title
  //   }

  //   return this.sharepoint
  //     .storeItem({
  //       listName: 'Commitment',
  //       data: spCommitment,
  //       id: commitment.id
  //     })
  //     .pipe(concatMap(_ => this.getCommitment({ id: commitment.id })))
  // }

  // upsertComment(comment: {
  //   commitment: any;
  //   parent: any;
  //   comment: any;
  // }): Observable<any> {
  //   const spCommitment = {
  //     Title: comment.commitment,
  //     Commitment: comment.commitment,
  //     Parent: comment.parent,
  //     Text: comment.comment
  //   }

  //   return this.sharepoint
  //     .storeItem({
  //       listName: 'CommitmentComment',
  //       data: spCommitment
  //     })
  //     .pipe(concatMap(_ => this.getCommitment({ id: comment.commitment })))
  // }

  // getCommitment(criteria: {
  //   id: any;
  // }): Observable<
  //   DataResult<{
  //     announcementTypes: AnnouncementType[];
  //     parties: Party[];
  //     portfolios: Portfolio[];
  //     commitment: Commitment;
  //     locations: Location[];
  //   }>
  // > {
  //   return forkJoin([
  //     this.sharepoint.getItems({
  //       listName: 'Commitment',
  //       viewXml: byIdQuery(criteria)
  //     }),
  //     this.sharepoint.getItems({
  //       listName: 'CommitmentComment',
  //       viewXml: byCommitmentIdQuery(criteria)
  //     }),
  //     this.getLookupData()
  //   ]).pipe(
  //     concatMap(([spCommitment, spComments, spLookups]) => {
  //       let commitment = null
  //       if (spCommitment[0]) {
  //         commitment = mapCommitment({
  //           commitment: spCommitment[0],
  //           parties: spLookups.parties,
  //           portfolios: spLookups.portfolios,
  //           announcementTypes: spLookups.announcementTypes,
  //           locations: spLookups.electorates,
  //           comments: mapComments(spComments)
  //         })
  //       }

  //       const response: DataResult<{
  //         announcementTypes: AnnouncementType[];
  //         parties: Party[];
  //         portfolios: Portfolio[];
  //         commitment: Commitment;
  //         locations: Location[];
  //       }> = {
  //         data: {
  //           commitment: commitment,
  //           parties: spLookups.parties,
  //           portfolios: spLookups.portfolios,
  //           announcementTypes: spLookups.announcementTypes,
  //           locations: spLookups.electorates
  //         },
  //         loading: false
  //       }

  //       // tslint:disable-next-line:no-console
  //       console.log(response, spCommitment, spLookups)

  //       return of(response)
  //     })
  //   )
  // }

  // filterCommitments(filter?: {
  //   party?: string;
  //   type?: string;
  //   portfolio?: string;
  // }): Observable<
  //   DataResult<{
  //     commitments: Commitment[];
  //     announcementTypes: AnnouncementType[];
  //     parties: Party[];
  //     portfolios: Portfolio[];
  //     locations: Location[];
  //   }>
  // > {
  //   return forkJoin([
  //     this.sharepoint.getItems({ listName: 'Commitment' }),
  //     this.getLookupData()
  //   ]).pipe(
  //     concatMap(([spCommitments, spLookups]) => {
  //       const commitments = mapCommitments({
  //         commitments: spCommitments,
  //         parties: spLookups.parties,
  //         portfolios: spLookups.portfolios,
  //         announcementTypes: spLookups.announcementTypes,
  //         locations: spLookups.electorates
  //       })

  //       const response: DataResult<{
  //         commitments: Commitment[];
  //         announcementTypes: AnnouncementType[];
  //         parties: Party[];
  //         portfolios: Portfolio[];
  //         locations: Location[];
  //       }> = {
  //         data: {
  //           commitments: commitments,
  //           parties: spLookups.parties,
  //           portfolios: spLookups.portfolios,
  //           announcementTypes: spLookups.announcementTypes,
  //           locations: spLookups.electorates
  //         },
  //         loading: false
  //       }

  //       // tslint:disable-next-line:no-console
  //       console.log(response, spLookups)

  //       return of(response)
  //     })
  //   )
  // }

  // getLookupData(): Observable<{
  //   announcementTypes: AnnouncementType[];
  //   parties: Party[];
  //   portfolios: Portfolio[];
  //   electorates: Location[];
  // }> {
  //   return forkJoin([
  //     this.sharepoint.getItems({ listName: 'Portfolio' }),
  //     this.sharepoint.getItems({ listName: 'PoliticalParty' }),
  //     this.sharepoint.getItems({ listName: 'AnnouncementType' }),
  //     this.sharepoint.getItems({ listName: 'Electorate' })
  //   ]).pipe(
  //     concatMap(
  //       ([spPortfolios, spParties, spAnnouncementTypes, spElectorates]) => {
  //         const announcementTypes = mapAnnouncementTypes(spAnnouncementTypes)
  //         const parties = mapParties(spParties)
  //         const portfolios = mapPortfolios(spPortfolios)
  //         const electorates = mapLocations(spElectorates)

  //         return of({
  //           announcementTypes,
  //           parties,
  //           portfolios,
  //           electorates
  //         })
  //       }
  //     )
  //   )
  // }
}
