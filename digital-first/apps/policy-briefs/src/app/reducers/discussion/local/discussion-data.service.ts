import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { DiscussionDataService } from '../discussion-data.service'
import { comments } from '../../../../devdata/data'
import { DiscussionMapperService } from '../../../services/mappers/discussion-mapper.service';
import { DiscussionType } from '../../../models';

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

  public getDiscussions(item: {
    id: string,
    channel: DiscussionType
  }): Observable<{
    data: any
    loading: boolean
  }> {
    const discussions = comments.filter(p => `${p.Brief.Id}` === `${item.id}`)

    return of({
      data: this.discussionMapperService.mapMany(discussions),
      loading: false
    })
  }

  constructor(private discussionMapperService: DiscussionMapperService) {}
}
