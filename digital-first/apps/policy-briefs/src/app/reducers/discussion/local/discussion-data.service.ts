import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { DiscussionDataService } from '../discussion-data.service'
import { discussions } from './data'

@Injectable({
  providedIn: 'root'
})
export class DiscussionDataLocalService implements DiscussionDataService {
  fakeDiscussionBackend: Subject<any[]> = new Subject()
  fakeDiscussionBackendSubscription$: Subscription
  discussionItems: BehaviorSubject<any> = new BehaviorSubject(null)

  addDiscussion(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  updateDiscussion(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  removeDiscussion(item: { id: string }): Observable<any> {
    throw new Error('Method not implemented.')
  }

  public getDiscussions(): Observable<{
    data: any
    loading: boolean
  }> {
    return this.discussionItems
  }

  constructor() {
    this.fakeDiscussionBackendSubscription$ = this.fakeDiscussionBackend.subscribe(next =>
      this.discussionItems.next({
        data: next,
        loading: false
      })
    )

    this.fakeDiscussionBackend.next(discussions)
  }
}
