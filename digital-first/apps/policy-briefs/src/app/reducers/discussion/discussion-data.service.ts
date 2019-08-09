import { Observable } from 'rxjs'
import { DiscussionType } from '../../models';
export abstract class DiscussionDataService {
  abstract removeComment(payload: { id: string; brief: string; }): Observable<any>
  abstract addComment(payload: { brief: any; text: any; channel: DiscussionType, parent: any; }): Observable<any>
  abstract addDiscussion(item: any): Observable<any>
  abstract updateDiscussion(item: any): Observable<any>
  abstract removeDiscussion(item: { id: string }): Observable<any>
  abstract getDiscussions(item: {
    id: string,
    channel: DiscussionType
  }): Observable<{ data: any; loading: boolean }>
}
