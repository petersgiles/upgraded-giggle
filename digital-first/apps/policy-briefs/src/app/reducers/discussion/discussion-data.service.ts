import { Observable } from 'rxjs'

export abstract class DiscussionDataService {
  abstract addDiscussion(item: any): Observable<any>
  abstract updateDiscussion(item: any): Observable<any>
  abstract removeDiscussion(item: { id: string }): Observable<any>
  abstract getDiscussions(item: { id: string }): Observable<{data: any, loading: boolean }>
}
