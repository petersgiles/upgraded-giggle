import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { RelatedLink } from './related-link.model'
import { DataResult, RelatedLinksResult } from '../../models'

export enum RelatedLinkActionTypes {
  LoadRelatedLinks = '[RelatedLink] Load RelatedLinks',
  AddRelatedLink = '[RelatedLink] Add RelatedLink',
  UpsertRelatedLink = '[RelatedLink] Upsert RelatedLink',
  AddRelatedLinks = '[RelatedLink] Add RelatedLinks',
  UpsertRelatedLinks = '[RelatedLink] Upsert RelatedLinks',
  UpdateRelatedLink = '[RelatedLink] Update RelatedLink',
  UpdateRelatedLinks = '[RelatedLink] Update RelatedLinks',
  DeleteRelatedLink = '[RelatedLink] Delete RelatedLink',
  DeleteRelatedLinks = '[RelatedLink] Delete RelatedLinks',
  ClearRelatedLinks = '[RelatedLink] Clear RelatedLinks',

  ExpandPanel = '[RelatedLink] Expand Panel',
  CollapsePanel = '[RelatedLink] Collapse Panel',
  SetCurrentRelatedLink = '[RelatedLink] Set Current RelatedLink',
  GetRelatedLinks = '[RelatedLink] Get RelatedLinks',
  GetAllRelatedLinks = '[RelatedLink] Get All RelatedLinks',
  GetRelatedLinksByCommitment = '[RelatedLink] Get Map Points By Commitment',
  StoreRelatedLink = '[RelatedLink] Store RelatedLink',
  RemoveRelatedLink = '[RelatedLink] Remove RelatedLink',
  RelatedLinksActionFailure = '[RelatedLink] RelatedLinks Action Failure'
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

export class StoreRelatedLink implements Action {
  readonly type = RelatedLinkActionTypes.StoreRelatedLink

  constructor(public payload: RelatedLink) {}
}

export class RemoveRelatedLink implements Action {
  readonly type = RelatedLinkActionTypes.RemoveRelatedLink

  constructor(public payload: { id: number }) {}
}

export class LoadRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.LoadRelatedLinks

  constructor(public payload: DataResult<RelatedLinksResult>) {}
}

export class AddRelatedLink implements Action {
  readonly type = RelatedLinkActionTypes.AddRelatedLink

  constructor(public payload: { location: RelatedLink }) {}
}

export class UpsertRelatedLink implements Action {
  readonly type = RelatedLinkActionTypes.UpsertRelatedLink

  constructor(public payload: { location: RelatedLink }) {}
}

export class AddRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.AddRelatedLinks

  constructor(public payload: { locations: RelatedLink[] }) {}
}

export class UpsertRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.UpsertRelatedLinks

  constructor(public payload: { locations: RelatedLink[] }) {}
}

export class UpdateRelatedLink implements Action {
  readonly type = RelatedLinkActionTypes.UpdateRelatedLink

  constructor(public payload: { location: Update<RelatedLink> }) {}
}

export class UpdateRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.UpdateRelatedLinks

  constructor(public payload: { locations: Update<RelatedLink>[] }) {}
}

export class DeleteRelatedLink implements Action {
  readonly type = RelatedLinkActionTypes.DeleteRelatedLink

  constructor(public payload: { id: string }) {}
}

export class DeleteRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.DeleteRelatedLinks

  constructor(public payload: { ids: string[] }) {}
}

export class ClearRelatedLinks implements Action {
  readonly type = RelatedLinkActionTypes.ClearRelatedLinks
}

export class SetCurrentRelatedLink implements Action {
  readonly type = RelatedLinkActionTypes.SetCurrentRelatedLink
  constructor(public payload: { id: number }) {}
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

export type RelatedLinkActions =
  | CollapsePanel
  | ExpandPanel
  | LoadRelatedLinks
  | AddRelatedLink
  | UpsertRelatedLink
  | AddRelatedLinks
  | UpsertRelatedLinks
  | UpdateRelatedLink
  | UpdateRelatedLinks
  | DeleteRelatedLink
  | DeleteRelatedLinks
  | ClearRelatedLinks
  | SetCurrentRelatedLink
  | GetAllRelatedLinks
  | GetRelatedLinks
  | GetRelatedLinksByCommitment
  | StoreRelatedLink
  | RemoveRelatedLink
  | RelatedLinksActionFailure
