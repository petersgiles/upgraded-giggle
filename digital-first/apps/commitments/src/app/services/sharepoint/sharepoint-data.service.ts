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
import { MapPoint } from '../../reducers/map-point/map-point.model'
import { byIdQuery, byCommitmentIdQuery, byMapPointPlaceIdQuery, byJoinTableQuery, byIdsQuery } from './caml'
import { mapContacts, mapCommitmentContacts } from './contact'
import { mapElectorates, mapCommitmentElectorates, mapMapPoints, mapCommitmentMapPoints } from './geo'
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
        const electorates = arrayToHash(mapElectorates(spElectorates))
        const commitmentElectorate = mapCommitmentElectorates(spCommitmentElectorates)
        const portfolios = arrayToHash(mapPortfolios(spPortfolios))
        const commitmentPortfolio = mapCommitmentPortfolios(spCommitmentPortfolios)
        const mapPoints = arrayToHash(mapMapPoints(spMapPoints))
        const commitmentMapPoints = mapCommitmentMapPoints(spCommitmentMapPoints)

        commitment.contacts = commitmentContact.map(c => ({ ...contacts[c.contact], ccid: c.id }))
        commitment.electorates = commitmentElectorate.map(c => ({ ...electorates[c.electorate] }))
        commitment.portfolios = commitmentPortfolio.map(c => ({ ...portfolios[c.portfolio] }))
        commitment.mapPoints = commitmentMapPoints.map(c => ({ ...mapPoints[c.mapPoint] }))

        return of({
          data: { commitment: commitment },
          loading: false
        })
      })
    )

  getMapPointsByCommitment(commitment: number): Observable<DataResult<MapPointsResult>> {

    const viewXml = byCommitmentIdQuery({ id: commitment })

    return this.sharepoint.getItems({
      listName: 'CommitmentMapPoint',
      viewXml: viewXml
    }).pipe(
      map(mapCommitmentMapPoints),
      concatMap((commitmentMapPoints: any) => {
        const mpIds = commitmentMapPoints.map(mp => mp.mapPoint)
        const mapPointViewXml = byIdsQuery(mpIds)

        return this.sharepoint.getItems({
          listName: 'MapPoint',
          viewXml: mapPointViewXml
        }).pipe(
          concatMap(mapPoints =>
            of({
              data: { mapPoints: mapMapPoints(mapPoints) },
              loading: false
            }))
        )

      })
    )
  }

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

  filterMapPoints(payload?: any): Observable<DataResult<MapPointsResult>> {
    return this.sharepoint.getItems({ listName: 'MapPoint' })
      .pipe(
        concatMap((result: any) =>
          of({
            data: { mapPoints: mapMapPoints(result) },
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

  // MAP POINTS

  storeMapPoint(mapPoint: MapPoint): Observable<any> {

    const LISTNAME = 'MapPoint'

    const spMapPoint = {
      Title: mapPoint.address,
      Latitude: mapPoint.latitude,
      Longitude: mapPoint.longitude,
      PlaceId: mapPoint.place_id,
    }

    const viewXml = byMapPointPlaceIdQuery({ placeId: spMapPoint.PlaceId })

    return this.sharepoint.getItems({
      listName: LISTNAME,
      viewXml: viewXml
    }).pipe(
      concatMap((found) => {
        if (found && found.length) {
          return of(found)
        }

        return this.sharepoint.storeItem({
          listName: 'MapPoint',
          data: spMapPoint,
        }).pipe(
          concatMap(_ => this.sharepoint.getItems({
            listName: LISTNAME,
            viewXml: byMapPointPlaceIdQuery({ placeId: spMapPoint.PlaceId })
          }))
        )
      }
      )
    )
  }

  removeMapPoint(placeId: any) {
    return this.sharepoint.removeItem({
      listName: 'MapPoint',
      id: placeId,
    })
  }

  addMapPointToCommitment(payload: { commitment: any, mapPoint: any }) {

    const viewXml = byMapPointPlaceIdQuery({ placeId: payload.mapPoint.place_id })

    return this.sharepoint.getItems({
      listName: 'MapPoint',
      viewXml: viewXml
    }).pipe(
      map(found => found[0]),
      concatMap((found: any) => {
        const spMapPoint = {
          Title: `${payload.commitment} ${found.ID}`,
          Commitment: payload.commitment,
          MapPoint: found.ID
        }

        return this.sharepoint.storeItem({
          listName: 'CommitmentMapPoint',
          data: spMapPoint,
        }).pipe(
          concatMap(_ => of({ commitment: { id: payload.commitment } }))
        )
      })
    )
  }

  removeMapPointFromCommitment(payload: { commitment: any, mapPoint: any }) {

    const LISTNAME = 'CommitmentMapPoint'

    const mapPointViewXml = byMapPointPlaceIdQuery({ placeId: payload.mapPoint })

    return this.sharepoint.getItems({
      listName: 'MapPoint',
      viewXml: mapPointViewXml
    }).pipe(
      map(result => result[0]),
      concatMap((result: any) => {
        const viewXml = byJoinTableQuery({ fieldA: { name: 'Commitment', id: payload.commitment }, fieldB: { name: 'MapPoint', id: result.ID } })

        return this.sharepoint.getItems({
          listName: LISTNAME,
          viewXml: viewXml
        }).pipe(
          map(mapCommitmentMapPoints),
          map(mapCommitmentPointsResult => mapCommitmentPointsResult[0]),
          concatMap(mapCommitmentPointsResult =>
            this.sharepoint.removeItem({
              listName: LISTNAME, id: mapCommitmentPointsResult.id
            }).pipe(
              concatMap(_ => of({ commitment: { id: payload.commitment } }))
            )
          )
        )
      })
    )
  }

  removeElectorateFromCommitment(payload: any): Observable<any> {

    const LISTNAME = 'CommitmentElectorate'

    return this.sharepoint.getItems({
      listName: LISTNAME,
      viewXml: byJoinTableQuery({ fieldA: { name: 'Commitment', id: payload.commitment }, fieldB: { name: 'Electorate', id: payload.electorate } })
    }).pipe(
      map(mapCommitmentElectorates),
      map(result => result[0]),
      concatMap(result =>
        this.sharepoint.removeItem({
          listName: LISTNAME, id: result.id
        }).pipe(
          concatMap(_ => of({ commitment: { id: result.commitment } }))
        )
      )
    )
  }

  addElectorateToCommitment(payload: any): Observable<any> {
    const spMapPoint = {
      Title: `${payload.commitment} ${payload.electorate}`,
      Commitment: payload.commitment,
      Electorate: payload.electorate
    }

    return this.sharepoint.storeItem({
      listName: 'CommitmentElectorate',
      data: spMapPoint,
    }).pipe(
      concatMap(_ =>
        of({ commitment: { id: payload.commitment } }))
    )
  }

  constructor(private sharepoint: SharepointJsomService) { }
}
