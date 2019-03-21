import { Injectable } from '@angular/core'
import { UrlSegment } from '@angular/router'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppRouterService {
  constructor() {}

  public segments: BehaviorSubject<string> = new BehaviorSubject(null)

}
