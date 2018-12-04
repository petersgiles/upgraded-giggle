import {
  Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'

import { Store, select } from '@ngrx/store'
import { RefinerGroup, RefinerType, DataTableConfig, MapPoint } from '@digital-first/df-components'

import { WhoAnnouncedType } from '../models/who-announced-type.model'
import { AnnouncementType } from '../models/announcement-type.model'
import { Party } from '../models/party.model'
import { Portfolio } from '../models/portfolio.model'
import { Commitment } from '../reducers/commitment/commitment.model'

import { Contact } from '../reducers/contact/contact.model'
import { Location } from '../models/location.model'
import { CommitmentType } from '../models/commitment-type.model'
import { CriticalDate } from '../models/critical-date.model'
import { CommitmentSubscriptionActionTypes, UnsubscribeFromCommitment, GetCommitmentSubscriptionForUser, SubscriptionActionFailure,
  SubscribeToCommitment, LoadSubscriptions} from './../reducers/commitment-subscription/commitment-subscription.actions'

import {
  GetCommitments,
  GetAllCommitments,
  SetCurrentCommitment,
  StoreCommitment,
  AddContactToCommitment,
  RemoveContactFromCommitment,
  AddElectorateToCommitment,
  RemoveElectorateFromCommitment,
  AddMapPointToCommitment,
  RemoveMapPointFromCommitment,
  AddCommitmentToCommitment,
  RemoveCommitmentFromCommitment
} from '../reducers/commitment/commitment.actions'
import { GetAllContacts, StoreContact } from '../reducers/contact/contact.actions'
import { AddRefiner, RemoveRefiner, ClearAllRefiners, ExpandRefinerGroup, CollapseRefinerGroup, SetTextRefiner } from '../reducers/commitment-overview/commitment-overview.actions'
import { ChangeTimeFormat, CollapsePanel, ExpandPanel, ChangeAutoSave } from '../reducers/commitment-edit/commitment-edit.actions'

import * as fromRoot from '../reducers'
import { SetLayoutDrawState } from '../reducers/app.actions'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDataService {
  changeCommitmentEditAutosave(val: boolean): any {
    this.store.dispatch(new ChangeAutoSave(val))
  }

  get CommitmentEditAutosave(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentEditAutosave))
  }

  getDrawState(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getDrawerOpen))
  }
  setDrawState(appdrawerOpen: any): any {
    this.store.dispatch(new SetLayoutDrawState(appdrawerOpen))
  }

  getBusy(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentLoading))
  }

  constructor(private store: Store<fromRoot.State>) { }

  // Notification

  get Notification(): Observable<string> {
    return this.store.pipe(select(fromRoot.getNotification))
  }

  getCurrentUser(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCurrentUserProfile))
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

  public addMapPointToCommitment(commitment: string | number, mapPoint: MapPoint): any {
    this.store.dispatch(new AddMapPointToCommitment({ commitment, mapPoint }))
  }
  public removeMapPointFromCommitment(commitment: string | number, mapPoint: MapPoint): any {
    this.store.dispatch(new RemoveMapPointFromCommitment({ commitment, mapPoint }))
  }

  public addCommitmentToCommitment(commitment: string | number, relatedTo: string | number): any {
    this.store.dispatch(new AddCommitmentToCommitment({ commitment, relatedTo }))
  }
  public removeCommitmentFromCommitment(commitment: string | number, relatedTo: string | number): any {
    this.store.dispatch(new RemoveCommitmentFromCommitment({ commitment, relatedTo }))
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

  get RelatedCommitmentsTableData(): Observable<DataTableConfig> {
    return this.store.pipe(select(fromRoot.getRelatedCommitmentsTableData))
  }

  get CommitmentDataTable(): Observable<DataTableConfig> {
    return this.store.pipe(select(fromRoot.getAllOverviewCommitmentDataTables))
  }

  get CommitmentSubscription(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getIsSubscribed))
  }

  get CommitmentActivity(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCommitmentActivity))
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

  subscribeToCommitment(commitment: string | number) {
    const currentUser = this.getCurrentUserValue()
    return this.store.dispatch(new SubscribeToCommitment({commitment: commitment, user: currentUser}))
  }

  unsubscibeFromCommitment(commitment: string | number) {
    const currentUser = this.getCurrentUserValue()
    return this.store.dispatch(new UnsubscribeFromCommitment({commitment: commitment, user: currentUser}))
  }

  getUserSubscriptionStatus(commitment: string | number) {
    const currentUser = this.getCurrentUserValue()
    this.store.dispatch(new GetCommitmentSubscriptionForUser({commitment: commitment, user: currentUser}))
  }

  getCurrentUserValue(): any {
    let currentUser: any
    this.store.pipe(select(fromRoot.getUserCurrentUser)).subscribe(user => currentUser = user)

    return currentUser
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

  setTextRefiner(text) {
    this.store.dispatch(new SetTextRefiner(text))
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

  upsertCommitment(commitment: Commitment) {
    this.store.dispatch(new StoreCommitment(commitment))
  }
}
