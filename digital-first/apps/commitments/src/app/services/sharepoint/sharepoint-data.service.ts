import { Injectable } from '@angular/core'

import { Observable, of, forkJoin } from 'rxjs'
import { concatMap, map, tap } from 'rxjs/operators'
import { SharepointJsomService } from '@df/sharepoint'
import { AppDataService } from '../app-data.service'

import {
  mapCommitmentPortfolios, mapGroupPermissions, mapCommitmentPackages
} from './sharepoint-data-maps'

import {
  DataResult,
  CommitmentResult,
  CommitmentsResult,
  Contact, ContactsResult,
  GroupPermissionsResult,
} from '../../models'
import { Commitment } from '../../reducers/commitment'
import { arrayToHash } from '@df/utils'
import { byIdQuery, byCommitmentIdQuery } from './caml'
import { mapContacts, mapCommitmentContacts } from './contact'
import { mapCommitment, mapCommitments } from './commitment'
import { SPAppUserProfile } from '@df/sharepoint'
import { mapPortfolios, mapPackageTypes } from '../../reducers/commitment-lookup/sharepoint/maps'

@Injectable({
  providedIn: 'root'
})
export class SharepointDataService implements AppDataService {

  getCurrentUser(): Observable<SPAppUserProfile> {
    return this.sharepoint.getCurrentUser()
  }

  getCurrentUserOperations(roles: any): Observable<DataResult<GroupPermissionsResult>> {
    return this.sharepoint.getItems({ listName: 'GroupPermission' })
      .pipe(
        concatMap((result: any) =>
          of({
            data: { groupPermissions: mapGroupPermissions(result) },
            loading: false,
            error: null
          }))
      )
  }

  storeCommitment = (commitment: Commitment): Observable<DataResult<CommitmentResult>> => {

    const spCommitment = {
      WhoAnnouncedType: commitment.whoAnnouncedType,
      AnnouncementType: commitment.announcementType,
      PackageType: commitment.packageType,
      CriticalDate: commitment.criticalDate,
      CommitmentType: commitment.commitmentType,
      Contacts: commitment.contacts,
      Status: commitment.status,
      Cost: commitment.cost,
      CostingRequired: commitment.costingRequired,
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

  getCommitment = (criteria: { id: any; }): Observable<DataResult<CommitmentResult>> =>
    forkJoin([
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
      }),
      this.sharepoint.getItems({
        listName: 'Portfolio'
      }),
      this.sharepoint.getItems({
        listName: 'CommitmentPortfolio',
        viewXml: byCommitmentIdQuery(criteria)
      }),
      this.sharepoint.getItems({
        listName: 'PackageType'
      }),
      this.sharepoint.getItems({
        listName: 'CommitmentPackage',
        viewXml: byCommitmentIdQuery(criteria)
      })
    ]).pipe(
      concatMap(([spCommitment, spContacts, spCommitmentContacts, spPortfolios, spCommitmentPortfolios, spPackages, spCommitmentPackages]) => {

        const commitment = mapCommitment(spCommitment[0])
        const contacts = arrayToHash(mapContacts(spContacts))
        const commitmentContact = mapCommitmentContacts(spCommitmentContacts)
        const portfolios = arrayToHash(mapPortfolios(spPortfolios))
        const packages = arrayToHash(mapPackageTypes(spPackages))
        const commitmentPortfolio = mapCommitmentPortfolios(spCommitmentPortfolios)
        const commitmentPackage = mapCommitmentPackages(spCommitmentPackages)
        commitment.contacts = commitmentContact.map(c => ({ ...contacts[c.contact], ccid: c.id }))
        commitment.portfolios = commitmentPortfolio.map(c => ({ ...portfolios[c.portfolio] }))
        commitment.packages = commitmentPackage.map(c => ({ ...packages[c.package] }))
        return of({
          data: { commitment: commitment },
          loading: false
        })
      })
    )

  filterCommitments(payload?: { party?: string; type?: string; portfolio?: string; }): Observable<DataResult<CommitmentsResult>> {
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

  filterContacts(payload?: any): Observable<DataResult<ContactsResult>> {
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

  storeContact(contact: Contact): Observable<any> {
    const spContact = {
      Title: contact.name,
      FirstName: contact.firstName,
      JobTitle: contact.jobTitle,
      Email: contact.email,
      WorkPhone: contact.phone,
      Portfolio: contact.portfolio,
      Party: contact.party
    }

    return this.sharepoint.storeItem({
      listName: 'Contact',
      data: spContact,
    })
  }

  constructor(private sharepoint: SharepointJsomService) { }
}
