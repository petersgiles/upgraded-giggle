import { Observable } from 'rxjs'

export abstract class BriefDataService {
  abstract addBrief(item: any): Observable<any>
  abstract updateBrief(id: string, changes: any, hint?: string): Observable<any>

  abstract updateRecommendedDirection(id: string, changes: any): Observable<any>
  abstract updateRecommendation(id: string, changes: any): Observable<any>
  abstract updateRecommendationResponse(id: string, changes: any): Observable<any>

  abstract removeBrief(item: { id: string }): Observable<any>
  abstract getBriefs(parent: any): Observable<{data: any, loading: boolean }>
  abstract getActiveBrief(activeBriefId): Observable<{data: any, loading: boolean }>
  abstract getActiveBriefSubscriptions(briefId): Observable<{ data: any; loading: boolean }>
  abstract toggleBriefSubscription(payload: { briefId: any; userId: any; data: { type: "activity" | "status"; id: any; on: boolean; }; name?: string }):Observable<any>
 
  abstract getBriefHtml(fileLeafRef): Observable<{data: any, loading: boolean, error?: any }>

}
