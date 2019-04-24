import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, map, switchMap, catchError } from 'rxjs/operators'
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

export const hashCode = str => {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export const pickColor = str =>
  `hsl(${hashCode(str) % 360}, 100%, 80%)`

export const mapComment = (item): any => {
  const brief = idFromLookup(item.Brief)
  const parent = idFromLookup(item.Parent)
  const user = fromUser(item.Author)
  const author = {
    ...user,
    color: pickColor(user.email)
  }

  return {
    id: item.ID,
    title: item.Title,
    created: item.Created,
    text: item.Comments,
    brief: brief,
    parent: parent,
    author: author
  }
}

export const mapComments = (items): any[] => (items || []).map(mapComment)

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
  getActiveBrief(
    briefId: string
  ): Observable<{
    data: any
    loading: boolean
  }> {
    const viewXml = byIdQuery({ id: briefId })
    const briefIdViewXml = byBriefIdQuery({ id: briefId })

    return forkJoin([
      this.sharepoint.getItems({
        listName: 'Brief',
        viewXml: viewXml
      }),
      this.sharepoint.getItems({
        listName: 'RecommendedDirection',
        viewXml: briefIdViewXml
      }),
      this.sharepoint.getItems({
        listName: 'Recommendation',
        viewXml: briefIdViewXml
      }),
      this.sharepoint.getItems({
        listName: 'Comment',
        viewXml: briefIdViewXml
      }),
      this.sharepoint.getItems({
        listName: 'BriefAttachments',
        viewXml: briefIdViewXml
      }),
      this.sharepoint.getItems({
        listName: 'BriefStatus'
      }),
      this.sharepoint.getItems({
        listName: 'BriefDivision'
      })
    ]).pipe(
      concatMap(
        ([
          spBrief,
          spRecommendedDirection,
          spRecommendations,
          spComments,
          spBriefAttachments,
          spBriefStatus,
          spBriefDivision
        ]) => {
          const data = {
            brief: mapBrief(spBrief[0]),
            directions: recommendedDirections(spRecommendedDirection),
            recommendations: mapRecommendations(spRecommendations),
            comments: mapComments(spComments),
            attachments: mapAttachments(spBriefAttachments),
            statusLookups: mapLookups(spBriefStatus),
            divisionLookups: mapLookups(spBriefDivision)
          }
          // tslint:disable-next-line:no-console
          console.log(`🙈 - brief`, data)

          return of({
            data: data,
            loading: false
          })
        }
      )
    )
  }

  getActiveBriefDocument(
    briefId: string,
    fileLeafRef: string
  ): Observable<{
    data: any
    loading: boolean
  }> {
    return forkJoin([
      this.sharepoint.getItems({
        listName: 'Brief'
      })
    ]).pipe(
      concatMap(([spBrief]) => {
        const data = {
          briefs: mapBrief(spBrief[0])
        }
        // tslint:disable-next-line:no-console
        console.log(`🙈 - brief`, data)

        return of({
          data: data,
          loading: false
        })
      })
    )
  }

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
    concatMap(action => this.getActiveBrief(action.payload.activeBriefId)),
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
    private sharepoint: SharepointJsomService
  ) {}
}
