import { Observable } from 'rxjs'
import { DiscussionType } from '../../models';
export abstract class DiscussionDataService {
  abstract addDiscussion(item: any): Observable<any>
  abstract updateDiscussion(item: any): Observable<any>
  abstract removeDiscussion(item: { id: string }): Observable<any>
  abstract getDiscussions(item: {
    id: string,
    channel: DiscussionType
  }): Observable<{ data: any; loading: boolean }>
}
