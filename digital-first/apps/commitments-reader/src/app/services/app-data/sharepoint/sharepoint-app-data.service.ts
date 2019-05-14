import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { AppDataService } from '../app-data.service'
import {
  SharepointJsomService,
  SPAppUserProfile,
  fromLookup
} from '@df/sharepoint'
import { concatMap, tap, map } from 'rxjs/operators'
import { DataResult, GroupPermissionsResult } from '../../../models'

export const mapGroupPermission = (item): any => ({
  id: item.ID,
  rights: item.Rights,
  component: item.Component,
  group: fromLookup(item.Group).title
})

export const mapGroupPermissions = (items): any[] =>
  items.map(mapGroupPermission)

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

  constructor(private sharepoint: SharepointJsomService) {}
}
