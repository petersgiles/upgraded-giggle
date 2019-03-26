import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import {
  GetRefinerTagsGQL,
  CommitmentsMapPointSearchGQL,
  CommitmentsSearchGQL
} from '../generated/graphql'
import { first, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CommitmentRefinerService {
  public columns: { prop: string; name: string }[]
  public mapPoints$: BehaviorSubject<any[]> = new BehaviorSubject(null)
  public selectedMapPoint$: BehaviorSubject<any> = new BehaviorSubject(null)
  public mapPointCommitments$: BehaviorSubject<any[]> = new BehaviorSubject(
    null
  )
  public commitments$: BehaviorSubject<any[]> = new BehaviorSubject(null)
  public refinerGroups$: BehaviorSubject<any[]> = new BehaviorSubject(null)

  constructor(
    private getRefinerTagsGQL: GetRefinerTagsGQL,
    private commitmentsSearchGQL: CommitmentsSearchGQL,
    private commitmentsMapPointSearchGQL: CommitmentsMapPointSearchGQL
  ) {
    this.columns = [
      { prop: 'id', name: 'Id' },
      { prop: 'title', name: 'Title' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'type', name: 'Type of Commitment' },
      { prop: 'criticalDate', name: 'Critical Date' }
    ]

    this.refinerGroups$.subscribe(
      rg => {
        this.getRefinedMapPoints(rg)
        this.getRefinedCommitments(rg)
      }
    )

    this.selectedMapPoint$.subscribe(
      mp => this.getMapPointCommitments(mp)
    )

    this.getRefiners()
  }

  private getRefinedCommitments(refinerGroups) {

    this.commitmentsSearchGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        map(result => result.data.commitments)
      )
      .subscribe(result => this.commitments$.next(result))
  }

  private getMapPointCommitments(mapPoints) {

    this.commitmentsSearchGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        map(result => result.data.commitments)
      )
      .subscribe(result => this.commitments$.next(result))
  }

  private getRefinedMapPoints(refinerGroups) {
    this.commitmentsMapPointSearchGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        map(result => result.data.mappoints)
      )
      .subscribe(result => this.mapPoints$.next(result))
  }

  private getRefiners() {
    this.getRefinerTagsGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        map(result => result.data.refiners)
      )
      .subscribe(result => this.refinerGroups$.next(result))
  }

  public handleRefinerGroupSelected(item) {
    const data = this.refinerGroups$.getValue()
    const group = data.findIndex(p => p.id === item.id)
    data[group].expanded = !data[group].expanded
    this.refinerGroups$.next(data)
  }

  public handleRefinerSelected(item) {
    const data = this.refinerGroups$.getValue()
    const group = data.findIndex(p => p.id === item.groupId)
    data[group].expanded = true
    const refiner = data[group].children.findIndex(p => p.id === item.id)

    data[group].children[refiner].selected = !data[group].children[refiner]
      .selected
    this.refinerGroups$.next(data)
  }
}
