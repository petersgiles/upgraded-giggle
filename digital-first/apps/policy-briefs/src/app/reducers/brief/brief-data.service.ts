import { Observable } from 'rxjs'

export abstract class BriefDataService {
  abstract addBrief(item: any): Observable<any>
  abstract updateBrief(id: string, changes: any): Observable<any>
  abstract removeBrief(item: { id: string }): Observable<any>
  abstract getBriefs(parent: any): Observable<{data: any, loading: boolean }>
  abstract getActiveBrief(activeBriefId): Observable<{data: any, loading: boolean }>
  abstract getBriefHtml(fileLeafRef): Observable<{data: any, loading: boolean, error?: any }>
}
