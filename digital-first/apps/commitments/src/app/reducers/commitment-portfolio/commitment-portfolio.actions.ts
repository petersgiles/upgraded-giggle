import { Action } from '@ngrx/store'

export enum CommitmentPortfolioActionTypes {
  ExpandPanel = '[CommitmentPortfolio] Expand Panel',
  CollapsePanel = '[CommitmentPortfolio] Collapse Panel',
  ClearCommitmentPortfolios = '[CommitmentPortfolio] Clear Commitment Portfolios',
  LoadCommitmentPortfolios = '[CommitmentPortfolio] Load Commitment Portfolios',
  GetPortfoliosByCommitment = '[CommitmentPortfolio] Get Portfolios By Commitment',
  AddPortfolioToCommitment = '[CommitmentPortfolio] Add Portfolio To Commitment',
  RemovePortfolioFromCommitment = '[CommitmentPortfolio] Remove Portfolio To Commitment',
  CommitmentPortfolioActionFailure = '[CommitmentPortfolio] Commitment Portfolio Action Failure',
}

export class CollapsePanel implements Action {
  readonly type = CommitmentPortfolioActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = CommitmentPortfolioActionTypes.ExpandPanel
}

export class AddPortfolioToCommitment implements Action {
  readonly type = CommitmentPortfolioActionTypes.AddPortfolioToCommitment
  constructor(public payload: { commitment: any, portfolio: any }) { }
}

export class RemovePortfolioFromCommitment implements Action {
  readonly type = CommitmentPortfolioActionTypes.RemovePortfolioFromCommitment
  constructor(public payload: { commitment: any, portfolio: any }) { }
}

export class CommitmentPortfolioActionFailure implements Action {
  readonly type = CommitmentPortfolioActionTypes.CommitmentPortfolioActionFailure
  constructor(public payload: any) { }
}

export class GetPortfoliosByCommitment implements Action {
  readonly type = CommitmentPortfolioActionTypes.GetPortfoliosByCommitment
  constructor(public payload: { commitment: any }) { }
}

export class LoadCommitmentPortfolios implements Action {
  readonly type = CommitmentPortfolioActionTypes.LoadCommitmentPortfolios
  constructor(public payload: { portfolios: any[] }) { }
}

export class ClearCommitmentPortfolios implements Action {
  readonly type = CommitmentPortfolioActionTypes.ClearCommitmentPortfolios
}

export type CommitmentPortfolioActions =
    CollapsePanel
  | ExpandPanel
  | GetPortfoliosByCommitment
  | AddPortfolioToCommitment
  | RemovePortfolioFromCommitment
  | CommitmentPortfolioActionFailure
  | ClearCommitmentPortfolios
  | LoadCommitmentPortfolios
