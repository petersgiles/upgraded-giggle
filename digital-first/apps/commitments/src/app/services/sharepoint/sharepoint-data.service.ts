import { Injectable } from '@angular/core'

import { Observable, of, forkJoin } from 'rxjs'
import { concatMap, map, tap } from 'rxjs/operators'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { AppDataService } from '../app-data.service'

import {
  mapCommitmentPortfolios,
} from './sharepoint-data-maps'

import {
  DataResult,
  CommitmentResult,
  CommitmentsResult,
  ContactsResult,
  MapPointsResult,
} from '../../models'
import { Commitment } from '../../reducers/commitment'
import { arrayToHash } from '@digital-first/df-utils'
import { byIdQuery, byCommitmentIdQuery } from './caml'
import { mapContacts, mapCommitmentContacts } from './contact'
import { mapCommitment, mapCommitments } from './commitment'
import { AppUserProfile } from '@digital-first/df-layouts'
import { mapPortfolios } from '../../reducers/commitment-lookup/sharepoint/maps'
import { Contact } from '../../reducers/contact/contact.model'
@Injectable({
  providedIn: 'root'
})
export class SharepointDataService implements AppDataService {

  getCurrentUser(): Observable<AppUserProfile> {
    return this.sharepoint.getCurrentUser()
  }

  getCurrentUserOperations(roles: any): Observable<any> {

    return of({
      'commitment': 'write',
      'location': 'write',
      'contacts': 'write',
      'costing': 'write',
      'relatedLinks': 'write',
      'relatedCommitments': 'write',
      'discussion': 'write',
    })
  }

  storeCommitment = (commitment: Commitment): Observable<DataResult<CommitmentResult>> => {

    const spCommitment = {
      WhoAnnouncedType: commitment.whoAnnouncedType,
      AnnouncementType: commitment.announcementType,
      ThemeType: commitment.themeType,
      PackageType: commitment.packageType,
      CriticalDate: commitment.criticalDate,
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
        listName: 'Electorate'
      }),
      this.sharepoint.getItems({
        listName: 'CommitmentElectorate',
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
        listName: 'MapPoint'
      }),
      this.sharepoint.getItems({
        listName: 'CommitmentMapPoint',
        viewXml: byCommitmentIdQuery(criteria)
      })
    ]).pipe(
      concatMap(([spCommitment, spContacts, spCommitmentContacts,
        spElectorates, spCommitmentElectorates, spPortfolios, spCommitmentPortfolios, spMapPoints, spCommitmentMapPoints]) => {

        const commitment = mapCommitment(spCommitment[0])

        // tslint:disable-next-line:no-console
        console.log('Commitment =>', commitment)

        const contacts = arrayToHash(mapContacts(spContacts))
        const commitmentContact = mapCommitmentContacts(spCommitmentContacts)
        // const electorates = arrayToHash(mapElectorates(spElectorates))
        // const commitmentElectorate = mapCommitmentElectorates(spCommitmentElectorates)
        const portfolios = arrayToHash(mapPortfolios(spPortfolios))
        const commitmentPortfolio = mapCommitmentPortfolios(spCommitmentPortfolios)
        // const mapPoints = arrayToHash(mapMapPoints(spMapPoints))
        // const commitmentMapPoints = mapCommitmentMapPoints(spCommitmentMapPoints)

        commitment.contacts = commitmentContact.map(c => ({ ...contacts[c.contact], ccid: c.id }))
        // commitment.electorates = commitmentElectorate.map(c => ({ ...electorates[c.electorate] }))
        commitment.portfolios = commitmentPortfolio.map(c => ({ ...portfolios[c.portfolio] }))
        // commitment.mapPoints = commitmentMapPoints.map(c => ({ ...mapPoints[c.mapPoint] }))

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
