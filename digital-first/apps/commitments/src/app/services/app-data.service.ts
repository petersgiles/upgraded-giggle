import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  upsertCommitment(commitment: {
    id?: number;
    title: string;
    description: string;
    party?: string;
    cost?: string;
    location?: string;
    type?: string;
    date?: string;
    announcedby?: string;
    portfolio?: string;
  }): Observable<any> {
    throw new Error('Method not implemented.')
  }
  getCommitment(criteria: { id: number; }): Observable<any> {
    throw new Error('Method not implemented.')
  }
  filterCommitments(filter: { party?: string; type?: string; portfolio?: string; }): Observable<any> {
    throw new Error('Method not implemented.')
  }
  upsertComment(comment: { commitment: any; parent: any; comment: any; author: any  }): Observable<any> {
    throw new Error('Method not implemented.')
  }
  deleteComment(comment: { id: any, commitment: any }): any {
    throw new Error('Method not implemented.')
  }
  constructor() { }
}
