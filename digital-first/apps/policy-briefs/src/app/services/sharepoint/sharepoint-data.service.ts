import { Injectable } from '@angular/core'

import { Observable, of, forkJoin } from 'rxjs'
import { concatMap, map, tap } from 'rxjs/operators'
import { SharepointJsomService, fromLookup } from '@df/sharepoint'
import { AppDataService } from '../app-data.service'

import {
  byIdQuery,
  mapContacts,
} from './sharepoint-data-maps'

import {
  DataResult,
  CommentsResult,
  ContactsResult,
} from '../../models'
import { arrayToHash } from '@df/utils'

@Injectable({
  providedIn: 'root'
})
export class SharepointDataService implements AppDataService {

  filterContacts(filter?: any): Observable<DataResult<ContactsResult>> {
    return this.sharepoint.getItems({ listName: 'Contact' })
      .pipe(
        concatMap((result: any) =>
          of({
            data: { contacts: mapContacts(result) },
            loading: false,
            error: null
          }))
      )
  }

  storeComment(comment: { artifact: any; parent: any; comment: any; }): Observable<any> {

    const spComment = {
      Title: comment.artifact,
      Commitment: comment.artifact,
      Parent: comment.parent,
      Text: comment.comment
    }

    return this.sharepoint.storeItem({
      listName: 'CommitmentComment',
      data: spComment,
    })
  }

  deleteComment(comment: { id: any }) {
    return this.sharepoint.removeItem({
      listName: 'CommitmentComment',
      id: comment.id,
    })
  }

  constructor(private sharepoint: SharepointJsomService) { }
}
