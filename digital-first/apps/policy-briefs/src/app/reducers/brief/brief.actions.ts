import { Action } from '@ngrx/store'

export enum BriefActionTypes {
  GetActiveBriefFailure = '[Brief] Get Active Brief Failure',
  LoadBrief = '[Brief] Load Brief',
  SetActiveBrief = '[Brief] Set Active Brief',
  SetActiveBriefStatus = '[Brief] Set Active Brief Status',
  
  SetBriefSecurityClassification = '[Brief] Set Active Brief Security Classification',
  SetBriefSecurityClassificationSuccess = '[Brief] Set Active Brief Security Classification Success',
  SetBriefSecurityClassificationFail = '[Brief] Set Active Brief Security Classification Fail',
  
  SetBriefDLM = '[Brief] Set Active Brief DLM',
  SetBriefDLMSuccess = '[Brief] Set Active Brief DLM Success',
  SetBriefDLMFail = '[Brief] Set Active Brief DLM Fail',
  
  SetBriefPolicy = '[Brief] Set Brief Policy',
  SetBriefPolicyFail = '[Brief] Set Brief Policy Fail',
  SetBriefPolicySuccess = '[Brief] Set Brief Policy Success',

  SetBriefProcessingInstruction = '[Brief] Set Brief Processing Instruction',
  SetBriefRecommendedDirection = '[Brief] Set Brief Recommended Direction',
  SetBriefRecommendedDirectionFail = '[Brief] Set Brief Recommended Direction Fail',
  SetBriefRecommendedDirectionSuccess = '[Brief] Set Brief Recommended Direction Success',


  SetBriefAction = '[Brief] Set Brief Action',
  SetBriefActionFail = '[Brief] Set Brief Action Fail',
  SetBriefActionSuccess = '[Brief] Set Brief Action Success',

  SetBriefRelatedComments = '[Brief] Set Brief Related Comments',
}

export class SetActiveBriefStatus implements Action {
  readonly type = BriefActionTypes.SetActiveBriefStatus
  constructor(public payload: { activeBriefId: string; status: string }) {}
}


export class SetBriefPolicy implements Action {
  readonly type = BriefActionTypes.SetBriefPolicy
  constructor(
    public payload: {
      activeBriefId: string
      policy: string
      subpolicy: string
    }
  ) {}
}

export class SetBriefPolicySuccess implements Action {
  readonly type = BriefActionTypes.SetBriefPolicySuccess
}

export class SetBriefPolicyFail implements Action {
  readonly type = BriefActionTypes.SetBriefPolicyFail
}


export class SetBriefSecurityClassification implements Action {
  readonly type = BriefActionTypes.SetBriefSecurityClassification
  constructor(
    public payload: {
      activeBriefId: string
      securityClassification: string
    }
  ) {}
}

export class SetBriefSecurityClassificationSuccess implements Action {
  readonly type = BriefActionTypes.SetBriefSecurityClassificationSuccess
}

export class SetBriefSecurityClassificationFail implements Action {
  readonly type = BriefActionTypes.SetBriefSecurityClassificationFail
}



export class SetBriefRecommendedDirectionSuccess implements Action {
  readonly type = BriefActionTypes.SetBriefRecommendedDirectionSuccess
}

export class SetBriefRecommendedDirectionFail implements Action {
  readonly type = BriefActionTypes.SetBriefRecommendedDirectionFail
}

export class SetBriefRecommendedDirection implements Action {
  readonly type = BriefActionTypes.SetBriefRecommendedDirection
  constructor(
    public payload: {
      activeBriefId: string
      text: string
    }
  ) {}
}

export class SetBriefActionSuccess implements Action {
  readonly type = BriefActionTypes.SetBriefActionSuccess
}

export class SetBriefActionFail implements Action {
  readonly type = BriefActionTypes.SetBriefActionFail
}

export class SetBriefAction implements Action {
  readonly type = BriefActionTypes.SetBriefAction
  constructor(
    public payload: {
      id: string
      activeBriefId: string
      description: string
      outcome1: string
      outcome2: string
      outcome3: string
    }
  ) {}
}


export class SetBriefDLM implements Action {
  readonly type = BriefActionTypes.SetBriefDLM
  constructor(
    public payload: {
      activeBriefId: string
      dLM: string
    }
  ) {}
}

export class SetBriefDLMSuccess implements Action {
  readonly type = BriefActionTypes.SetBriefDLMSuccess
}

export class SetBriefDLMFail implements Action {
  readonly type = BriefActionTypes.SetBriefDLMFail
}

export class SetActiveBrief implements Action {
  readonly type = BriefActionTypes.SetActiveBrief
  constructor(public payload: { activeBriefId: string }) {}
}

export class LoadBrief implements Action {
  readonly type = BriefActionTypes.LoadBrief
  constructor(public payload: { data: any; loading: boolean }) {}
}

export class GetActiveBriefFailure implements Action {
  readonly type = BriefActionTypes.GetActiveBriefFailure
  constructor(public payload: any) {}
}

export type BriefActions =
  | LoadBrief
  | SetActiveBrief
  | GetActiveBriefFailure
  | SetActiveBriefStatus
  | SetBriefPolicy
  | SetBriefPolicyFail
  | SetBriefPolicySuccess
  | SetBriefSecurityClassification
  | SetBriefSecurityClassificationFail
  | SetBriefSecurityClassificationSuccess
  | SetBriefDLM
  | SetBriefDLMFail
  | SetBriefDLMSuccess
  | SetBriefRecommendedDirection
  | SetBriefRecommendedDirectionFail
  | SetBriefRecommendedDirectionSuccess
  | SetBriefAction
  | SetBriefActionFail
  | SetBriefActionSuccess
