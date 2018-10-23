import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { Portfolio } from './portfolio.model'
import { DataResult, PortfoliosResult } from '../../models'

export enum PortfolioActionTypes {
  LoadPortfolios = '[Portfolio] Load Portfolios',
  AddPortfolio = '[Portfolio] Add Portfolio',
  UpsertPortfolio = '[Portfolio] Upsert Portfolio',
  AddPortfolios = '[Portfolio] Add Portfolios',
  UpsertPortfolios = '[Portfolio] Upsert Portfolios',
  UpdatePortfolio = '[Portfolio] Update Portfolio',
  UpdatePortfolios = '[Portfolio] Update Portfolios',
  DeletePortfolio = '[Portfolio] Delete Portfolio',
  DeletePortfolios = '[Portfolio] Delete Portfolios',
  ClearPortfolios = '[Portfolio] Clear Portfolios',

  SetCurrentPortfolio = '[Portfolio] Set Current Portfolio',
  GetPortfolios = '[Portfolio] Get Portfolios',
  GetAllPortfolios = '[Portfolio] Get All Portfolios',
  PortfoliosActionFailure = '[Portfolio] Portfolios Action Failure',
}

export class LoadPortfolios implements Action {
  readonly type = PortfolioActionTypes.LoadPortfolios

  constructor(public payload: DataResult<PortfoliosResult>) {}
}

export class AddPortfolio implements Action {
  readonly type = PortfolioActionTypes.AddPortfolio

  constructor(public payload: { portfolio: Portfolio }) {}
}

export class UpsertPortfolio implements Action {
  readonly type = PortfolioActionTypes.UpsertPortfolio

  constructor(public payload: { portfolio: Portfolio }) {}
}

export class AddPortfolios implements Action {
  readonly type = PortfolioActionTypes.AddPortfolios

  constructor(public payload: { portfolios: Portfolio[] }) {}
}

export class UpsertPortfolios implements Action {
  readonly type = PortfolioActionTypes.UpsertPortfolios

  constructor(public payload: { portfolios: Portfolio[] }) {}
}

export class UpdatePortfolio implements Action {
  readonly type = PortfolioActionTypes.UpdatePortfolio

  constructor(public payload: { portfolio: Update<Portfolio> }) {}
}

export class UpdatePortfolios implements Action {
  readonly type = PortfolioActionTypes.UpdatePortfolios

  constructor(public payload: { portfolios: Update<Portfolio>[] }) {}
}

export class DeletePortfolio implements Action {
  readonly type = PortfolioActionTypes.DeletePortfolio

  constructor(public payload: { id: string }) {}
}

export class DeletePortfolios implements Action {
  readonly type = PortfolioActionTypes.DeletePortfolios

  constructor(public payload: { ids: string[] }) {}
}

export class ClearPortfolios implements Action {
  readonly type = PortfolioActionTypes.ClearPortfolios
}

export class SetCurrentPortfolio implements Action {
  readonly type = PortfolioActionTypes.SetCurrentPortfolio
  constructor(public payload: { id: number }) {}
}
export class GetPortfolios implements Action {
  readonly type = PortfolioActionTypes.GetPortfolios
  constructor(public payload: { ids: number[] }) {}
}

export class GetAllPortfolios implements Action {
  readonly type = PortfolioActionTypes.GetAllPortfolios
  constructor(public payload?: { filter?: any }) {}
}

export class PortfoliosActionFailure implements Action {
  readonly type = PortfolioActionTypes.PortfoliosActionFailure

  constructor(public payload: any) {
  }
}
export type PortfolioActions =
 LoadPortfolios
 | AddPortfolio
 | UpsertPortfolio
 | AddPortfolios
 | UpsertPortfolios
 | UpdatePortfolio
 | UpdatePortfolios
 | DeletePortfolio
 | DeletePortfolios
 | ClearPortfolios
 | SetCurrentPortfolio
 | GetAllPortfolios
 | GetPortfolios
 | PortfoliosActionFailure