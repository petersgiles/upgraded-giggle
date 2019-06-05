import { Observable } from 'rxjs'

export abstract class NavigationDataService {
  abstract addNavigation(item: any): Observable<any>
  abstract updateNavigation(item: any): Observable<any>
  abstract removeNavigation(item: { id: string }): Observable<any>
  abstract getNavigations(): Observable<{data: any, loading: boolean }>
}
