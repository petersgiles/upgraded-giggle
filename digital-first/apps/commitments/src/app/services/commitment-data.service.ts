import * as moment from 'moment'
import {
  BehaviorSubject,
  Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { toTree } from '@digital-first/df-utils'
import { AnnouncementType, Party, Portfolio, Commitment } from '../models/commitment-models'
import { AppDataService } from './app-data.service'

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
  private loadingSubject = new BehaviorSubject<boolean>(false)
  private errorSubject = new BehaviorSubject<any>(null)

  constructor(private appDataService: AppDataService) { }

  get AnnouncementTypes(): Observable<AnnouncementType[]> {
    return this.announcementTypesSubject.asObservable()
  }

  get Locations(): Observable<Location[]> {
    return this.locationsSubject.asObservable()
  }

  get Parties(): Observable<Party[]> {
    return this.partysSubject.asObservable()
  }

  get Portfolios(): Observable<Portfolio[]> {
    return this.portfoliosSubject.asObservable()
  }

  get Commitment(): Observable<Commitment> {
    return this.commitmentSubject.asObservable()
  }

  get Commitments(): Observable<Commitment[]> {
    return this.commitmentsSubject.asObservable()
  }

  get CommitmentLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable()
  }

  get CommitmentError(): Observable<any> {
    return this.errorSubject.asObservable()
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
    this.errorSubject.next(null)
    this.loadingSubject.next(true)

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

      this.loadingSubject.next(result.loading)
      this.errorSubject.next(result.error)
    })
  }

  getCommitment(criteria: { id: number; }) {

    this.commitmentSubject.next(null)
    this.errorSubject.next(null)
    this.loadingSubject.next(true)

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
    this.errorSubject.next(null)
    this.loadingSubject.next(true)

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

        this.loadingSubject.next(result.loading)
        this.errorSubject.next(result.error)
      })
  }

  createComment(comment: { commitment: any; parent: any; comment: any; author: any }) {

    this.commitmentSubject.next(null)
    this.errorSubject.next(null)
    this.loadingSubject.next(true)
    this.appDataService.upsertComment(comment).subscribe(this.processCommitment)

  }

  deleteComment(comment: { id: any; commitment: any; }): any {
    this.commitmentSubject.next(null)
    this.errorSubject.next(null)
    this.loadingSubject.next(true)

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

    this.loadingSubject.next(result.loading)
    this.errorSubject.next(result.error)
  }

}
