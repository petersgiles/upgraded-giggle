import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export abstract class AppDataService {

  abstract upsertCommitment(commitment: {
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
  }): Observable<any>

  abstract getCommitment(criteria: { id: number; }): Observable<any>
  abstract filterCommitments(filter: { party?: string; type?: string; portfolio?: string; }): Observable<any>
  abstract upsertComment(comment: { commitment: any; parent: any; comment: any; author: any }): Observable<any>
  abstract deleteComment(comment: { id: any, commitment: any }): any
}
