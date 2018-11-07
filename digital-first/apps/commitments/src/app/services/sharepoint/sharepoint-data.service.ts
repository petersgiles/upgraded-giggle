import { Injectable } from '@angular/core'

import { Observable, of, forkJoin } from 'rxjs'
import { concatMap, map, tap } from 'rxjs/operators'
import { SharepointJsomService, fromLookup } from '@digital-first/df-sharepoint'
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
  mapWhoAnnouncedTypes,
  mapCommitmentContacts,
  mapCommitmentContact
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
import { arrayToHash } from '@digital-first/df-utils'

@Injectable({
  providedIn: 'root'
})
export class SharepointDataService implements AppDataService {

  _getCommitment(criteria: { id: any; }): Observable<DataResult<CommitmentResult>> {

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

  getCommitment(criteria: { id: any; }): Observable<DataResult<CommitmentResult>> {
    return forkJoin([
      this.sharepoint.getItems({
        listName: 'Commitment',
        viewXml: byIdQuery(criteria)
      }),
      this.sharepoint.getItems({
        listName: 'Contact'
      }),
      this.sharepoint.getItems({
        listName: 'CommitmentContact',
        viewXml: byCommitmentIdQuery(criteria)
      })
    ]).pipe(
      concatMap(([spCommitment, spContacts, spCommitmentContacts]) => {
        const commitment = mapCommitment(spCommitment[0])
        const contacts = arrayToHash(mapContacts(spContacts))
        const commitmentContact = mapCommitmentContacts(spCommitmentContacts)

        commitment.contacts = commitmentContact.map(c => ({...contacts[c.contact], ccid: c.id}))

        return of({
          data: { commitment: commitment },
          loading: false
        })
      })
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
          const cdr: DataResult<CommitmentResult> = {
            data: {
              commitment: mapCommitment(result)
            }, loading: false
          }
          return of(cdr)
        })
      )
  }

  storeContact(contact: any): Observable<any> {
    throw new Error('Method not implemented.')
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

  addContactToCommitment(contact: { commitment: any, contact: any }) {
    const spComment = {
      Title: `${contact.commitment} ${contact.contact}`,
      Commitment: contact.commitment,
      Contact: contact.contact
    }

    return this.sharepoint.storeItem({
      listName: 'CommitmentContact',
      data: spComment,
    }).pipe(
      concatMap(_ =>
        of({ commitment: { id: contact.commitment } }))
    )
  }

  removeContactFromCommitment(commitmentcontact: { id: any }) {
    return  this.sharepoint.getItems({
      listName: 'CommitmentContact',
      viewXml: byIdQuery(commitmentcontact)
    }).pipe(
      map(mapCommitmentContacts),
      map(result => result[0]),
      concatMap(result =>
        this.sharepoint.removeItem({
          listName: 'CommitmentContact', id: commitmentcontact.id
        }).pipe(
          concatMap(_ => of({ commitment: { id: result.commitment } }))
        )
      )
    )
  }

  constructor(private sharepoint: SharepointJsomService) { }
}
