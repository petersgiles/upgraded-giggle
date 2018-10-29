import * as moment from 'moment'
import {
  BehaviorSubject,
  Observable,
  of,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { AnnouncementType } from '../reducers/announcement-type/announcement-type.model'
import { Party } from '../reducers/party/party.model'
import { Portfolio } from '../reducers/portfolio/portfolio.model'
import { Commitment } from '../reducers/commitment/commitment.model'
import { Comment } from '../reducers/comment/comment.model'
import { Contact } from '../reducers/contact/contact.model'
import { Location } from '../reducers/location/location.model'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducers'
import { GetAllLocations } from '../reducers/location/location.actions'
import { GetCommitments, GetAllCommitments, SetCurrentCommitment, StoreCommitment } from '../reducers/commitment/commitment.actions'
import { GetAllAnnouncementTypes } from '../reducers/announcement-type/announcement-type.actions'
import { GetAllContacts } from '../reducers/contact/contact.actions'
import { GetAllPartys } from '../reducers/party/party.actions'
import { GetAllPortfolios } from '../reducers/portfolio/portfolio.actions'
import { GetAllCommitmentTypes } from '../reducers/commitment-type/commitment-type.actions'
import { CommitmentType } from '../reducers/commitment-type/commitment-type.model'
import { GetCommentsByCommitment, StoreComment, RemoveComment, DeleteComment, ClearComments } from '../reducers/comment/comment.actions'
import { tap } from 'rxjs/operators'
import { AddRefiner, RemoveRefiner, ClearAllRefiners, ExpandRefinerGroup, CollapseRefinerGroup } from '../reducers/commitment-overview/commitment-overview.actions'
import { RefinerGroup, RefinerType } from '@digital-first/df-components'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDataService {

  constructor(private store: Store<fromRoot.State>) { }

  /// AnnouncementTypes

  public getAllAnnouncementTypes(filter?: any) {
    this.store.dispatch(new GetAllAnnouncementTypes({ filter: filter }))
  }

  get AnnouncementTypesLookup(): Observable<AnnouncementType[]> {
    return this.store.select(fromRoot.getAllAnnouncementTypes)
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log('AnnouncementTypes => ', result)),
      )
  }

  get AnnouncementTypes(): Observable<AnnouncementType[]> {
    return this.store.select(fromRoot.getAllAnnouncementTypes)
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log('AnnouncementTypes => ', result)),
      )
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
    // .pipe(
    //   // tslint:disable-next-line:no-console
    //   tap((result: any) => console.log('Comments => ', result)),
    // )
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

  public setCurrentCommitment(id: number) {
    this.store.dispatch(new SetCurrentCommitment({ id: id }))
    this.store.dispatch(new ClearComments())
    this.store.dispatch(new GetCommentsByCommitment({ commitment: id }))
  }

  get Commitment(): Observable<Commitment> {
    return this.store.select(fromRoot.getCurrentCommitment)
    // .pipe(
    //   // tslint:disable-next-line:no-console
    //   tap((result: any) => console.log('Current Commitment =>', result)),
    // )
  }

  get Commitments(): Observable<Commitment[]> {

    // return this.store.select(fromRoot.getFilteredOverviewCommitments)

    return this.store.select(fromRoot.getAllOverviewCommitments)
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
    // .pipe(
    //   // tslint:disable-next-line:no-console
    //   tap((result: any) => console.log('CommitmentTypes => ', result)),
    // )
  }

  get CommitmentTypesLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getCommitmentTypeLoading)
  }

  get CommitmentTypesError(): Observable<any> {
    return this.store.select(fromRoot.getCommitmentTypeError)
  }

  // RefinerGroups

  get RefinerGroups(): Observable<RefinerGroup[]> {
    return this.store.select(fromRoot.getRefinerGroups)
  }

  expandRefinerGroup(refiner: RefinerGroup): any {
    this.store.dispatch(new ExpandRefinerGroup(refiner.id))
  }

  collapseRefinerGroup(refiner: RefinerGroup): any {
    this.store.dispatch(new CollapseRefinerGroup(refiner.id))
  }

  addRefiner(refiner: RefinerType) {
    this.store.dispatch(new AddRefiner(refiner))
  }

  removeRefiner(refiner: RefinerType) {
    this.store.dispatch(new RemoveRefiner(refiner))
  }

  clearAllRefiners() {
    this.store.dispatch(new ClearAllRefiners())
  }

  // Contacts

  public getAllContacts(filter?: any) {
    this.store.dispatch(new GetAllContacts({ filter: filter }))
  }

  get Contacts(): Observable<Contact[]> {
    return this.store.select(fromRoot.getAllContacts)
    // .pipe(
    //   // tslint:disable-next-line:no-console
    //   tap((result: any) => console.log('Contacts => ', result)),
    // )
  }

  get ContactsLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getContactLoading)
  }

  get ContactsError(): Observable<any> {
    return this.store.select(fromRoot.getContactError)
  }

  // Locations

  public getAllLocations(filter?: any) {
    this.store.dispatch(new GetAllLocations(filter))
  }

  get Locations(): Observable<Location[]> {
    return this.store.select(fromRoot.getAllLocations)
    // .pipe(
    //   // tslint:disable-next-line:no-console
    //   tap((result: any) => console.log('Locations => ', result)),
    // )
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
    return this.store.select(fromRoot.getAllPartys)
    // .pipe(
    //   // tslint:disable-next-line:no-console
    //   tap((result: any) => console.log('Parties => ', result)),
    // )
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
    return this.store.select(fromRoot.getAllPortfolios)
    // .pipe(
    //   // tslint:disable-next-line:no-console
    //   tap((result: any) => console.log('Portfolios => ', result)),
    // )
  }

  get PortfoliosLoading(): Observable<boolean> {
    return this.store.select(fromRoot.getPortfolioLoading)
  }

  get PortfoliosError(): Observable<any> {
    return this.store.select(fromRoot.getPortfolioError)
  }

  upsertCommitment(commitment: Commitment) {
    // this.appDataService.upsertCommitment(commitment)
    this.store.dispatch(new StoreCommitment(commitment))
  }

  createComment(comment: { commitment: any; parent: any; comment: any; }) {
    this.store.dispatch(new StoreComment(comment))
  }

  deleteComment(comment: { id: any }): any {
    this.store.dispatch(new DeleteComment(comment))
    this.store.dispatch(new RemoveComment(comment))
  }
}
