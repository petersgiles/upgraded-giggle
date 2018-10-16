import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class FullLayoutService {

  get version(): string {
    return '0.0.0.0'
  }

  get title(): string {
    return 'New Application'
  }

  constructor() { }

}
