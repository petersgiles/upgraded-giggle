import * as moment from 'moment'
import {
  BehaviorSubject,
  Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { toTree } from '@digital-first/df-utils'

import { AppDataService } from './app-data.service'
import { AnnouncementType } from '../reducers/announcement-type/announcement-type.model'
import { Party } from '../reducers/party/party.model'
import { Portfolio } from '../reducers/portfolio/portfolio.model'
import { Commitment } from '../reducers/commitment/commitment.model'
import { Comment } from '../reducers/comment/comment.model'
import { Contact } from '../reducers/contact/contact.model'
import { Location } from '../reducers/location/location.model'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducers'
import { GetLocations } from '../reducers/location/location.actions'
import { GetCommitments, GetAllCommitments } from '../reducers/commitment/commitment.actions'
import { GetAllAnnouncementTypes } from '../reducers/announcement-type/announcement-type.actions'
import { GetAllContacts } from '../reducers/contact/contact.actions'
import { GetAllPartys } from '../reducers/party/party.actions'
import { GetAllPortfolios } from '../reducers/portfolio/portfolio.actions'
import { GetAllCommitmentTypes } from '../reducers/commitment-type/commitment-type.actions'
import { CommitmentType } from '../reducers/commitment-type/commitment-type.model'
import { GetCommentsByCommitment } from '../reducers/comment/comment.actions'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDataService {

  private announcementTypesSubject = new BehaviorSubject<AnnouncementType[]>([])
  private partysSubject = new BehaviorSubject<Party[]>([])
  private locationsSubject = new BehaviorSubject<Location[]>([])
  private portfoliosSubject = new BehaviorSubject<Portfolio[]>([])

  private commitmentSubject = new BehaviorSubject<Commitment>(null)
  private commitmentsSubject = new BehaviorSubject<Commitment[]>([])

  constructor(private store: Store<fromRoot.State>, private appDataService: AppDataService) { }

  /// AnnouncementTypes

  public getAllAnnouncementTypes(filter?: any) {
    this.store.dispatch(new GetAllAnnouncementTypes({ filter: filter }))
  }

  get AnnouncementTypes(): Observable<AnnouncementType[]> {
    return this.store.select(fromRoot.getAllAnnouncementTypes)
  }

  get AnnouncementTypesLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getCommitmentLoading)
  }

  get AnnouncementTypesError(): Observable<any> {
    return this.store.select(fromRoot.getCommitmentError)
  }

  /// Comments

  public getCommentsByCommitment(commitment: number) {
    this.store.dispatch(new GetCommentsByCommitment({ commitment: commitment }))
  }

  get Comments(): Observable<Comment[]> {
    return this.store.select(fromRoot.getAllComments)
  }

  get CommentsLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getCommentLoading)
  }

  get CommentsError(): Observable<any> {
    return this.store.select(fromRoot.getCommentError)
  }

  /// Commitments
  public getAllCommitments(filter?: any) {
    this.store.dispatch(new GetAllCommitments({ filter: filter }))
  }

  public getCommitments(ids: number[]) {
    this.store.dispatch(new GetCommitments({ ids: ids }))
  }

  get Commitment(): Observable<Commitment> {
    return this.commitmentSubject.asObservable()
  }

  get Commitments(): Observable<Commitment[]> {
    return this.store.select(fromRoot.getAllCommitments)
  }

  get CommitmentLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getCommitmentLoading)
  }

  get CommitmentError(): Observable<any> {
    return this.store.select(fromRoot.getCommitmentError)
  }

  /// Commitment Types

  public getAllCommitmentTypes(filter?: any) {
    this.store.dispatch(new GetAllCommitmentTypes({ filter: filter }))
  }

  get CommitmentTypes(): Observable<CommitmentType[]> {
    return this.store.select(fromRoot.getAllCommitmentTypes)
  }

  get CommitmentTypesLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getCommitmentTypeLoading)
  }

  get CommitmentTypesError(): Observable<any> {
    return this.store.select(fromRoot.getCommitmentTypeError)
  }

  // Contacts

  public getAllContacts(filter?: any) {
    this.store.dispatch(new GetAllContacts({ filter: filter }))
  }

  get Contacts(): Observable<Contact[]> {
    return this.store.select(fromRoot.getAllContacts)
  }

  get ContactsLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getContactLoading)
  }

  get ContactsError(): Observable<any> {
    return this.store.select(fromRoot.getContactError)
  }

  // Locations

  public getAllLocations({ filter: filter }) {
    this.store.dispatch(new GetLocations(filter))
  }

  get Locations(): Observable<Location[]> {
    return this.store.select(fromRoot.getAllLocations)
  }

  get LocationsLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getLocationLoading)
  }

  get LocationsError(): Observable<any> {
    return this.store.select(fromRoot.getLocationError)
  }

  // Partys

  public getAllPartys(filter?: any) {
    this.store.dispatch(new GetAllPartys({ filter: filter }))
  }

  get Parties(): Observable<Party[]> {
    return this.partysSubject.asObservable()
  }

  get PartiesLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getPartyLoading)
  }

  get PartiesError(): Observable<any> {
    return this.store.select(fromRoot.getPartyError)
  }

  // Portfolios

  public getAllPortfolios(filter?: any) {
    this.store.dispatch(new GetAllPortfolios({ filter: filter }))
  }

  get Portfolios(): Observable<Portfolio[]> {
    return this.portfoliosSubject.asObservable()
  }

  get PortfoliosLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getPortfolioLoading)
  }

  get PortfoliosError(): Observable<any> {
    return this.store.select(fromRoot.getPortfolioError)
  }

  upsertCommitment(commitment: {
    id?: number,
    title: string,
    description: string,
    party?: string
    cost?: string
    location?: string,
    type?: string,
    date?: string,
    announcedby?: string,
    portfolio?: string
  }) {

    this.commitmentSubject.next(null)

    this.appDataService.upsertCommitment(commitment).subscribe((result: any) => {
      if (result.data) {

        const r = result.data.commitment
        if (r) {
          const found = {
            ...r,
            date: moment(r.date),

            discussion: toTree(r.comments, {
              id: 'id',
              parentId: 'parent',
              children: 'children',
              level: 'level',
              firstParentId: null
            })
          }

          this.commitmentSubject.next(found)
        }
      }

    })
  }

  getCommitment(criteria: { id: number; }) {

    this.commitmentSubject.next(null)

    this.appDataService.getCommitment(criteria).subscribe(this.processCommitment)
  }

  filterCommitments(filter?: {
    party?: string,
    type?: string,
    portfolio?: string,
    location?: string,
    daterange: {
      start: string,
      end?: string
    }
  }) {

    this.appDataService.filterCommitments(filter)
      .subscribe((result: any) => {
        if (result.data) {

          this.announcementTypesSubject.next([{ id: null, title: '' }, ...result.data.announcementTypes].map(r => ({ ...r })))
          this.partysSubject.next([{ id: null, title: '' }, ...result.data.parties].map(r => ({ ...r })))
          this.portfoliosSubject.next([{ id: null, title: '' }, ...result.data.portfolios].map(r => ({ ...r })))
          this.locationsSubject.next([{ id: null, title: '' }, ...result.data.locations].map(location => ({ ...location })))

          this.commitmentsSubject.next(result.data.commitments.map(r =>
            ({
              ...r,
              date: moment(r.date)
            })))
        }
      })
  }

  createComment(comment: { commitment: any; parent: any; comment: any; author: any }) {

    this.commitmentSubject.next(null)
    this.appDataService.upsertComment(comment).subscribe(this.processCommitment)

  }

  deleteComment(comment: { id: any; commitment: any; }): any {
    this.commitmentSubject.next(null)

    this.appDataService.deleteComment(comment).subscribe(this.processCommitment)
  }

  processCommitment = (result: any) => {

    // tslint:disable-next-line:no-console
    console.log(result)

    if (result.data) {

      const r = result.data.commitment

      this.announcementTypesSubject.next([{ id: null, title: '' }, ...result.data.announcementTypes].map(type => ({ ...type })))
      this.partysSubject.next([{ id: null, title: '' }, ...result.data.parties].map(party => ({ ...party })))
      this.portfoliosSubject.next([{ id: null, title: '' }, ...result.data.portfolios].map(portfolio => ({ ...portfolio })))
      this.locationsSubject.next([{ id: null, title: '' }, ...result.data.locations].map(location => ({ ...location })))

      if (r) {
        const found = {
          ...r,
          date: moment(r.date),
          discussion: toTree(r.comments, {
            id: 'id',
            parentId: 'parent',
            children: 'children',
            level: 'level',
            firstParentId: null
          })
        }
        // tslint:disable-next-line:no-console
        console.log('processCommitment', r, found)
        this.commitmentSubject.next(found)
      }
    }

  }

}
