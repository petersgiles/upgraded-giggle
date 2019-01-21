import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { RelatedLink } from './related-link.model'
import { DataResult, RelatedLinksResult } from '../../models'

export enum RelatedLinkActionTypes {
  LoadRelatedLinks = '[RelatedLink] Load RelatedLinks',
  ClearRelatedLinks = '[RelatedLink] Clear RelatedLinks',

  ExpandPanel = '[RelatedLink] Expand Panel',
  CollapsePanel = '[RelatedLink] Collapse Panel',

  GetRelatedLinks = '[RelatedLink] Get RelatedLinks',
  GetAllRelatedLinks = '[RelatedLink] Get All RelatedLinks',
  GetRelatedLinksByCommitment = '[RelatedLink] Get Related Links By Commitment',

  RelatedLinksActionFailure = '[RelatedLink] RelatedLinks Action Failure',
  AddLinkToCommitment = '[RelatedLink] Add link ToCommitment',
  RemoveLinkFromCommitment = '[RelatedLink] Remove link From Commitment',
}

export class CollapsePanel implements Action {
  readonly type = RelatedLinkActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = RelatedLinkActionTypes.ExpandPanel
}
export class GetRelatedLinksByCommitment implements Action {
  readonly type = RelatedLinkActionTypes.GetRelatedLinksByCommitment
  constructor(public payload: { commitment: number | string }) {}
}

export class LoadRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.LoadRelatedLinks

  constructor(public payload: DataResult<RelatedLinksResult>) {}
}

export class ClearRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.ClearRelatedLinks
}

export class GetRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.GetRelatedLinks
  constructor(public payload?: { ids?: number[] }) {}
}

export class GetAllRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.GetAllRelatedLinks
  constructor(public payload?: { filter?: any }) {}
}

export class RelatedLinksActionFailure implements Action {
  readonly type = RelatedLinkActionTypes.RelatedLinksActionFailure

  constructor(public payload: any) {}
}

export class AddLinkToCommitment implements Action {
  readonly type = RelatedLinkActionTypes.AddLinkToCommitment

  constructor(public payload: { commitment: number | string, url: string }) { }
}

export class RemoveLinkFromCommitment implements Action {
  readonly type = RelatedLinkActionTypes.RemoveLinkFromCommitment

  constructor(public payload: { commitment: number | string , id: number | string }) { }
}

export type RelatedLinkActions =
  | CollapsePanel
  | ExpandPanel
  | LoadRelatedLinks
  | ClearRelatedLinks
  | GetAllRelatedLinks
  | GetRelatedLinks
  | GetRelatedLinksByCommitment
  | RelatedLinksActionFailure
  | AddLinkToCommitment
  | RemoveLinkFromCommitment
