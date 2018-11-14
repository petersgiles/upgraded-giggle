import {
  Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
import { RefinerGroup, RefinerType, DataTableConfig } from '@digital-first/df-components'

import { WhoAnnouncedType } from '../reducers/who-announced-type/who-announced-type.model'
import { AnnouncementType } from '../reducers/announcement-type/announcement-type.model'
import { Party } from '../reducers/party/party.model'
import { Portfolio } from '../reducers/portfolio/portfolio.model'
import { Commitment } from '../reducers/commitment/commitment.model'
import { Comment } from '../reducers/comment/comment.model'
import { Contact } from '../reducers/contact/contact.model'
import { Location } from '../reducers/location/location.model'
import { CommitmentType } from '../reducers/commitment-type/commitment-type.model'

import { GetAllLocations } from '../reducers/location/location.actions'
import {
  GetCommitments,
  GetAllCommitments,
  SetCurrentCommitment,
  StoreCommitment,
  AddContactToCommitment,
  RemoveContactFromCommitment,
  AddElectorateToCommitment,
  RemoveElectorateFromCommitment
} from '../reducers/commitment/commitment.actions'
import { GetAllAnnouncementTypes } from '../reducers/announcement-type/announcement-type.actions'
import { GetAllContacts, StoreContact } from '../reducers/contact/contact.actions'
import { GetAllPartys } from '../reducers/party/party.actions'
import { GetAllPortfolios } from '../reducers/portfolio/portfolio.actions'
import { GetAllCommitmentTypes } from '../reducers/commitment-type/commitment-type.actions'
import { GetCommentsByCommitment, StoreComment, RemoveComment, DeleteComment, ClearComments } from '../reducers/comment/comment.actions'
import { AddRefiner, RemoveRefiner, ClearAllRefiners, ExpandRefinerGroup, CollapseRefinerGroup } from '../reducers/commitment-overview/commitment-overview.actions'
import { GetAllWhoAnnouncedTypes } from '../reducers/who-announced-type/who-announced-type.actions'
import { ChangeTimeFormat, CollapsePanel, ExpandPanel } from '../reducers/commitment-edit/commitment-edit.actions'

import * as fromRoot from '../reducers'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDataService {

  constructor(private store: Store<fromRoot.State>) { }

  // Notification

  get Notification(): Observable<string> {
    return this.store.pipe(select(fromRoot.getNotification))
  }

  /// WhoAnnouncedTypes

  public getAllWhoAnnouncedTypes(filter?: any) {
    this.store.dispatch(new GetAllWhoAnnouncedTypes({ filter: filter }))
  }

  get WhoAnnouncedTypesLookup(): Observable<WhoAnnouncedType[]> {
    return this.store.pipe(select(fromRoot.getAllWhoAnnouncedTypes))
  }

  get WhoAnnouncedTypes(): Observable<WhoAnnouncedType[]> {
    return this.store.pipe(select(fromRoot.getAllWhoAnnouncedTypes))
  }

  get WhoAnnouncedTypesLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentLoading))
  }

  get WhoAnnouncedTypesError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCommitmentError))
  }

  /// AnnouncementTypes

  public getAllAnnouncementTypes(filter?: any) {
    this.store.dispatch(new GetAllAnnouncementTypes({ filter: filter }))
  }

  get AnnouncementTypesLookup(): Observable<AnnouncementType[]> {
    return this.store.pipe(select(fromRoot.getAllAnnouncementTypes))
  }

  get AnnouncementTypes(): Observable<AnnouncementType[]> {
    return this.store.pipe(select(fromRoot.getAllAnnouncementTypes))
  }

  get AnnouncementTypesLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentLoading))
  }

  get AnnouncementTypesError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCommitmentError))
  }

  /// Comments

  public getCommentsByCommitment(commitment: number) {
    this.store.dispatch(new GetCommentsByCommitment({ commitment: commitment }))
  }

  get Comments(): Observable<Comment[]> {
    return this.store.pipe(select(fromRoot.getAllComments))
  }

  get CommentsLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommentLoading))
  }

  get CommentsError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCommentError))
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

  public addContactToCommitment(commitment: string | number, contact: string | number): any {
    this.store.dispatch(new AddContactToCommitment({ commitment, contact }))
  }

  public removeContactFromCommitment(commitmentContact: any): any {
    this.store.dispatch(new RemoveContactFromCommitment({ id: commitmentContact.id }))
  }

  public addElectorateToCommitment(commitment: string | number, electorate: string | number): any {
    this.store.dispatch(new AddElectorateToCommitment({ commitment, electorate }))
  }
  public removeElectorateFromCommitment(commitment: string | number, electorate: string | number): any {
    this.store.dispatch(new RemoveElectorateFromCommitment({ commitment, electorate }))
  }

  get Commitment(): Observable<Commitment> {
    return this.store.pipe(select(fromRoot.getCurrentCommitment))
  }

  get Commitments(): Observable<Commitment[]> {

    // return this.store.select(fromRoot.getFilteredOverviewCommitments)

    return this.store.pipe(select(fromRoot.getAllOverviewCommitments))
  }

  get CommitmentContactsTableData(): Observable<DataTableConfig> {
    return this.store.pipe(select(fromRoot.getCommitmentContactsTableData))
  }

  get CommitmentDataTable(): Observable<DataTableConfig> {
    return this.store.pipe(select(fromRoot.getAllOverviewCommitmentDataTables))
  }

  get CommitmentActivity(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCommitmentActivity))
  }

  /// Commitment Types

  public getAllCommitmentTypes(filter?: any) {
    this.store.dispatch(new GetAllCommitmentTypes({ filter: filter }))
  }

  get CommitmentTypes(): Observable<CommitmentType[]> {
    return this.store.pipe(select(fromRoot.getAllCommitmentTypes))
  }

  get CommitmentTypesLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentTypeLoading))
  }

  get CommitmentTypesError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCommitmentTypeError))
  }

  // Commitment Edit

  get CommitmentEditExpandedPanels(): Observable<(string | number)[]> {
    return this.store.pipe(select(fromRoot.getCommitmentEditExpandedPanels))
  }

  get CommitmentEditDiscussionTimeFormat(): Observable<'dateFormat' | 'timeAgo' | 'calendar'> {
    return this.store.pipe(select(fromRoot.getCommitmentEditDiscussionTimeFormat))
  }

  expandCommitmentEditPanel(id: string): any {
    this.store.dispatch(new ExpandPanel(id))
  }

  collapseCommitmentEditPanel(id: string): any {
    this.store.dispatch(new CollapsePanel(id))
  }

  changeCommitmentEditDiscussionTimeFormat(format: 'dateFormat' | 'timeAgo' | 'calendar'): any {
    this.store.dispatch(new ChangeTimeFormat(format))
  }

  // RefinerGroups

  get RefinerGroups(): Observable<RefinerGroup[]> {
    return this.store.pipe(select(fromRoot.getRefinerGroups))
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

  upsertContact(contact: any): any {
    this.store.dispatch(new StoreContact({ contact: contact }))
  }

  get Contacts(): Observable<Contact[]> {
    return this.store.pipe(select(fromRoot.getAllContacts))
  }

  get ContactsLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getContactLoading))
  }

  get ContactsError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getContactError))
  }

  // Locations

  public getAllLocations(filter?: any) {
    this.store.dispatch(new GetAllLocations(filter))
  }

  get Locations(): Observable<Location[]> {
    return this.store.pipe(select(fromRoot.getAllLocations))
  }

  get LocationsLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getLocationLoading))
  }

  get LocationsError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getLocationError))
  }

  // Partys

  public getAllPartys(filter?: any) {
    this.store.dispatch(new GetAllPartys({ filter: filter }))
  }

  get Parties(): Observable<Party[]> {
    return this.store.pipe(select(fromRoot.getAllPartys))
  }

  get PartiesLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getPartyLoading))
  }

  get PartiesError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getPartyError))
  }

  // Portfolios

  public getAllPortfolios(filter?: any) {
    this.store.dispatch(new GetAllPortfolios({ filter: filter }))
  }

  get Portfolios(): Observable<Portfolio[]> {
    return this.store.pipe(select(fromRoot.getAllPortfolios))
  }

  get PortfoliosLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getPortfolioLoading))
  }

  get PortfoliosError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getPortfolioError))
  }

  upsertCommitment(commitment: Commitment) {
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
