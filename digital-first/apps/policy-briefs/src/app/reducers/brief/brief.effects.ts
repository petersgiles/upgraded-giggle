import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, map, switchMap, catchError, tap } from 'rxjs/operators'
import { EMPTY, Observable, forkJoin, of } from 'rxjs'
import {
  BriefActionTypes,
  BriefActions,
  SetActiveBrief,
  LoadBrief,
  GetActiveBriefFailure
} from './brief.actions'
import {
  SharepointJsomService,
  idFromLookup,
  fromLookup,
  fromUser
} from '@df/sharepoint'
import { byIdQuery, byBriefIdQuery } from '../../services/sharepoint/caml'
import { BriefDataService } from './brief-data.service'

export const mapBrief = (item): any => {
  const editor = fromLookup(item.Editor)
  const subPolicy = fromLookup(item.SubPolicy)
  const policy = fromLookup(item.Policy)
  const briefStatus = fromLookup(item.BriefStatus)
  const briefDivision = fromLookup(item.BriefStatus)

  return {
    id: item.ID,
    fileLeafRef: item.FileLeafRef,
    title: item.Title,
    reference: item.Reference,
    securityClassification: item.SecurityClassification,
    dLM: item.DLM,
    policyDirection: item.PolicyDirection,
    order: item.SortOrder,
    modified: item.Modified,
    dueDate: item.DueDate,
    editor: editor,
    subPolicy: subPolicy,
    policy: policy,
    briefStatus: briefStatus,
    briefDivision: briefDivision
  }
}

export const mapBriefs = (items): any[] => (items || []).map(mapBrief)

export const recommendedDirection = (item): any => {
  const brief = idFromLookup(item.Brief)
  const recommendation = idFromLookup(item.Recommendation)

  return {
    id: item.ID,
    title: item.Title,
    recommendation: recommendation,
    brief: brief
  }
}

export const recommendedDirections = (items): any[] =>
  (items || []).map(recommendedDirection)

export const mapAttachment = (item): any => {
  const brief = idFromLookup(item.Brief)

  return {
    id: item.ID,
    FileLeafRef: item.FileLeafRef,
    notes: item.Notes0,
    title: item.Title,
    briefId: brief,
    order: item.SortOrder
  }
}

export const mapAttachments = (items): any[] => (items || []).map(mapAttachment)

export const mapRecommendation = (item): any => {
  const brief = idFromLookup(item.Brief)
  const subPolicy = idFromLookup(item.SubPolicy)
  const policy = idFromLookup(item.Policy)

  return {
    id: item.ID,
    title: item.Title,
    recommendation: item.Recommendation,
    order: item.SortOrder,
    outcome1: item.Outcome1,
    outcome2: item.Outcome2,
    outcome3: item.Outcome3,
    colour: item.Colour,
    brief: brief,
    subPolicy: subPolicy,
    policy: policy
  }
}

export const mapRecommendations = (items): any[] =>
  (items || []).map(mapRecommendation)

export const mapLookup = (item): any => ({
  id: item.ID,
  title: item.Title,
  order: item.SortOrder
})

export const mapLookups = (items): any[] => (items || []).map(mapLookup)

@Injectable()
export class BriefEffects {
  @Effect()
  loadBriefs$ = this.actions$.pipe(
    ofType(BriefActionTypes.LoadBrief),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  )

  @Effect()
  setActiveBrief$ = this.actions$.pipe(
    ofType(BriefActionTypes.SetActiveBrief),
    map((action: SetActiveBrief) => action),
    concatMap(action =>
      this.service.getActiveBrief(action.payload.activeBriefId)
    ),
    switchMap((result: { data: any; loading: boolean }) => [
      new LoadBrief({
        data: result.data,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetActiveBriefFailure(error)))
  )

  constructor(
    private actions$: Actions<BriefActions>,
    private service: BriefDataService
  ) {}
}
