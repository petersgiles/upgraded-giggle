import { Observable } from 'rxjs'
import { DiscussionType } from '../../models';
export abstract class DiscussionDataService {
  abstract addDiscussion(item: any): Observable<any>
  abstract updateDiscussion(item: any): Observable<any>
  abstract removeDiscussion(item: any): Observable<any>
  abstract getDiscussions(item: {
    id: string,
    channel: DiscussionType
  }): Observable<{ data: any; loading: boolean }>
}
