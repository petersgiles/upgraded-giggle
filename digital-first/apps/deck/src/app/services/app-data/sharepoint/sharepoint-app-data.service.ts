import { Observable, of } from 'rxjs'

import {
  SharepointJsomService,
  SPAppUserProfile,
  fromLookup
} from '@df/sharepoint'
import { concatMap } from 'rxjs/operators'
import { DataResult, GroupPermissionsResult } from '../../../models'
import { AppDataService } from '@digital-first/df-app-core'
import { Injectable } from '@angular/core';

export const mapGroupPermission = (item): any => ({
  id: item.ID,
  rights: item.Rights,
  component: item.Component,
  group: fromLookup(item.Group).title
})

export const mapGroupPermissions = (items): any[] =>
  items.map(mapGroupPermission)

  @Injectable({
    providedIn: 'root'
  })
export class SharePointAppDataService implements AppDataService {
  getCurrentUserOperations(): Observable<DataResult<GroupPermissionsResult>> {
    return this.sharepoint
      .getItems({ listName: 'CommitmentsReaderGroupPermission' })
      .pipe(
        concatMap((result: any) =>
          of({
            data: { groupPermissions: mapGroupPermissions(result) },
            loading: false,
            error: null
          })
        )
      )
  }
  get UserOperation(): Observable<any> {
    return of(null)
  }

  getBusy(): Observable<boolean> {
    return of(false)
  }

  getCurrentUser(): Observable<SPAppUserProfile> {
    return this.sharepoint.getCurrentUser()
  }

  removeItem(listName: string, id: string ) {

    let item

    const context = this.sharepoint.removeItem({listName: 'j', id: '1'})
   
  }

  constructor(private sharepoint: SharepointJsomService) {}
}
