import gql from 'graphql-tag'
import { Injectable } from '@angular/core'
import * as Apollo from 'apollo-angular'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Guid: any
  DateTimeOffset: any
  UInt32: any
  Json: any
  Date: any
  DateTime: any
  Decimal: any
  Milliseconds: any
  Seconds: any
}

export type AccessControlEntryGraph = {
  __typename?: 'AccessControlEntryGraph'
  id: Scalars['String']
  rights: Scalars['String']
  rowVersion: Scalars['String']
  accessControlGroup?: Maybe<AccessControlGroupGraph>
}

export type AccessControlGroupGraph = {
  __typename?: 'AccessControlGroupGraph'
  id: Scalars['Guid']
  rowVersion: Scalars['String']
  title: Scalars['String']
  members?: Maybe<Array<Maybe<UserGraph>>>
  roles?: Maybe<Array<Maybe<RoleGraph>>>
}

export type AccessControlGroupGraphMembersArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type AccessControlGroupGraphRolesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type AccessControlGroupUserGraph = {
  __typename?: 'AccessControlGroupUserGraph'
  userId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
}

export type AccessControlListGraph = {
  __typename?: 'AccessControlListGraph'
  id: Scalars['Guid']
  accessControlEntries?: Maybe<Array<Maybe<AccessControlEntryGraph>>>
}

export type AccessControlListGraphAccessControlEntriesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export enum AccessRights {
  None = 'NONE',
  Read = 'READ',
  Write = 'WRITE'
}

export type AgencyGraph = {
  __typename?: 'AgencyGraph'
  metadata?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  portfolio?: Maybe<PortfolioGraph>
  users?: Maybe<Array<Maybe<UserGraph>>>
  agencyMappings?: Maybe<Array<Maybe<AgencyMappingGraph>>>
  agencyMapping?: Maybe<Array<Maybe<AgencyMappingGraph>>>
  id: Scalars['Guid']
  title: Scalars['String']
  portfolioId: Scalars['Guid']
}

export type AgencyGraphUsersArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type AgencyGraphAgencyMappingsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type AgencyGraphAgencyMappingArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type AgencyMappingGraph = {
  __typename?: 'AgencyMappingGraph'
  agency?: Maybe<AgencyGraph>
  accessControlGroup?: Maybe<AccessControlGroupGraph>
  rowVersion: Scalars['String']
  id: Scalars['Guid']
  agencyId: Scalars['Guid']
  emailDomain: Scalars['String']
  accessControlGroupId: Scalars['Guid']
}

export type ApiKeyGraph = {
  __typename?: 'ApiKeyGraph'
  id: Scalars['Guid']
  key: Scalars['String']
  userId: Scalars['Guid']
  user: UserGraph
  created: Scalars['DateTimeOffset']
  disable: Scalars['Boolean']
}

export type AppropriationGraph = {
  __typename?: 'AppropriationGraph'
  rowVersion: Scalars['String']
  budgetYear?: Maybe<Scalars['UInt32']>
  id: Scalars['Guid']
  financialYear: Scalars['String']
  dollars: Scalars['UInt32']
  programId: Scalars['Guid']
  program: ProgramGraph
  budgetId: Scalars['Guid']
  budget: BudgetGraph
}

export type BudgetGraph = {
  __typename?: 'BudgetGraph'
  rowVersion: Scalars['String']
  appropriations?: Maybe<Array<Maybe<AppropriationGraph>>>
  id: Scalars['Guid']
  year: Scalars['UInt32']
}

export type BudgetGraphAppropriationsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export enum ComparisonGraph {
  Contains = 'contains',
  EndsWith = 'endsWith',
  Equal = 'equal',
  GreaterThan = 'greaterThan',
  GreaterThanOrEqual = 'greaterThanOrEqual',
  In = 'in',
  NotIn = 'notIn',
  LessThan = 'lessThan',
  LessThanOrEqual = 'lessThanOrEqual',
  Like = 'like',
  NotEqual = 'notEqual',
  StartsWith = 'startsWith'
}

export type CreateAccessControlGroupInputGraph = {
  title: Scalars['String']
}

export type CreateAccessControlGroupUserInputGraph = {
  accessControlGroupId: Scalars['Guid']
  userId: Scalars['Guid']
}

export type CreateAgencyInputGraph = {
  title: Scalars['String']
  metadata?: Maybe<Scalars['String']>
  portfolioId: Scalars['Guid']
}

export type CreateAgencyMappingInputGraph = {
  agencyId: Scalars['Guid']
  emailDomain: Scalars['String']
  accessControlGroupId: Scalars['Guid']
}

export type CreateApiKeyInputGraph = {
  userId: Scalars['Guid']
}

export type CreatePortfolioInputGraph = {
  title: Scalars['String']
  metadata?: Maybe<Scalars['String']>
}

export type CreateProgramAccessControlInputGraph = {
  programId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
  accessRights?: Maybe<AccessRights>
}

export type CreateProgramInputGraph = {
  name: Scalars['String']
  agencyId: Scalars['Guid']
  externalId?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  commitments?: Maybe<Scalars['String']>
}

export type CreateProgramSubmissionInputGraph = {
  programId: Scalars['Guid']
}

export type CreateReportAccessControlInputGraph = {
  reportId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
  accessRights?: Maybe<AccessRights>
}

export type CreateReportInputGraph = {
  name: Scalars['String']
  programId: Scalars['Guid']
  notes?: Maybe<Scalars['String']>
}

export type CreateRoleAccessControlGroupInputGraph = {
  roleId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
}

export type CreateRoleInputGraph = {
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  createAgency?: Maybe<Scalars['Boolean']>
  createProgram?: Maybe<Scalars['Boolean']>
  createProject?: Maybe<Scalars['Boolean']>
  createReport?: Maybe<Scalars['Boolean']>
  createStatistic?: Maybe<Scalars['Boolean']>
  deleteAgency?: Maybe<Scalars['Boolean']>
  deleteProgram?: Maybe<Scalars['Boolean']>
  deleteProject?: Maybe<Scalars['Boolean']>
  deleteReport?: Maybe<Scalars['Boolean']>
  deleteStatistic?: Maybe<Scalars['Boolean']>
  updateElectorateAdvice?: Maybe<Scalars['Boolean']>
  adminLogin?: Maybe<Scalars['Boolean']>
  allAgencyModifier?: Maybe<Scalars['Boolean']>
  manageApiKeys?: Maybe<Scalars['Boolean']>
  manageGroups?: Maybe<Scalars['Boolean']>
  manageAccessControls?: Maybe<Scalars['Boolean']>
  updateCommitments?: Maybe<Scalars['Boolean']>
  updateBriefCommitments?: Maybe<Scalars['Boolean']>
  allowMessagePassThrough?: Maybe<Scalars['Boolean']>
}

export type CreateStatisticAccessControlInputGraph = {
  statisticId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
  accessRights?: Maybe<AccessRights>
}

export type CreateStatisticInputGraph = {
  name: Scalars['String']
  agencyId: Scalars['Guid']
  externalId?: Maybe<Scalars['String']>
}

export type CreateStatisticReportAccessControlInputGraph = {
  statisticReportId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
  accessRights?: Maybe<AccessRights>
}

export type CreateStatisticReportInputGraph = {
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  statisticId: Scalars['Guid']
}

export type CreateUserInputGraph = {
  emailAddress: Scalars['String']
  agencyId: Scalars['Guid']
}

export type DeleteAccessControlGroupInputGraph = {
  id: Scalars['Guid']
}

export type DeleteAccessControlGroupUserInputGraph = {
  accessControlGroupId: Scalars['Guid']
  userId: Scalars['Guid']
}

export type DeleteAccessControlInputGraph = {
  accessControlListId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
}

export type DeleteAgencyInputGraph = {
  id: Scalars['Guid']
}

export type DeleteAgencyMappingInputGraph = {
  id: Scalars['Guid']
}

export type DeletePortfolioInputGraph = {
  id: Scalars['Guid']
}

export type DeleteProgramInputGraph = {
  id: Scalars['Guid']
}

export type DeleteReportInputGraph = {
  id: Scalars['Guid']
}

export type DeleteRoleAccessControlGroupInputGraph = {
  roleId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
}

export type DeleteRoleInputGraph = {
  id: Scalars['Guid']
}

export type DeleteStatisticInputGraph = {
  id: Scalars['Guid']
}

export type DeleteStatisticReportInputGraph = {
  id: Scalars['Guid']
}

export type DeleteUserInputGraph = {
  id: Scalars['Guid']
}

export type DisableApiKeyInputGraph = {
  id: Scalars['Guid']
}

export type ElectorateAdviceGraph = {
  __typename?: 'ElectorateAdviceGraph'
  electorate?: Maybe<ElectorateGraph>
  id: Scalars['Guid']
  electorateId: Scalars['Guid']
  active: Scalars['Boolean']
  createdById: Scalars['Guid']
  createdBy: UserGraph
  timestamp: Scalars['DateTimeOffset']
  advice: Scalars['String']
}

export type ElectorateGraph = {
  __typename?: 'ElectorateGraph'
  rowVersion: Scalars['String']
  state?: Maybe<StateGraph>
  electorateAdvice?: Maybe<Array<Maybe<ElectorateAdviceGraph>>>
  programs?: Maybe<Array<Maybe<ProgramGraph>>>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  advice?: Maybe<Array<Maybe<ElectorateAdviceGraph>>>
  id: Scalars['Guid']
  population: Scalars['UInt32']
  name: Scalars['String']
  member: Scalars['String']
  party: Scalars['String']
  percentOfStatePopulation: Scalars['Float']
  stateId: Scalars['Guid']
}

export type ElectorateGraphElectorateAdviceArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ElectorateGraphProgramsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ElectorateGraphProjectsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ElectorateGraphAdviceArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createAccessControlGroupUser?: Maybe<AccessControlGroupUserGraph>
  deleteAccessControlGroupUser?: Maybe<Scalars['Boolean']>
  deleteAccessControl?: Maybe<Scalars['Boolean']>
  updateAccessControl?: Maybe<AccessControlEntryGraph>
  createAgencyMapping?: Maybe<AgencyMappingGraph>
  deleteAgencyMapping?: Maybe<Scalars['Boolean']>
  updateAgencyMapping?: Maybe<AgencyMappingGraph>
  createAgency?: Maybe<AgencyGraph>
  deleteAgency?: Maybe<Scalars['Boolean']>
  updateAgency?: Maybe<AgencyGraph>
  createApiKey?: Maybe<Scalars['String']>
  disableApiKey?: Maybe<Scalars['Boolean']>
  createAccessControlGroup?: Maybe<AccessControlGroupGraph>
  deleteAccessControlGroup?: Maybe<Scalars['Boolean']>
  updateAccessControlGroup?: Maybe<AccessControlGroupGraph>
  createPortfolio?: Maybe<PortfolioGraph>
  deletePortfolio?: Maybe<Scalars['Boolean']>
  updatePortfolio?: Maybe<PortfolioGraph>
  createProgramAccessControl?: Maybe<AccessControlEntryGraph>
  createProgramSubmission?: Maybe<ProgramSubmissionGraph>
  createProgram?: Maybe<ProgramGraph>
  deleteProgram?: Maybe<Scalars['Boolean']>
  updateProgram?: Maybe<ProgramGraph>
  createReportAccessControl?: Maybe<AccessControlEntryGraph>
  updateStatisticReportVersion?: Maybe<StatisticReportVersionGraph>
  createReport?: Maybe<ReportGraph>
  deleteReport?: Maybe<Scalars['Boolean']>
  updateReport?: Maybe<ReportGraph>
  createRoleAccessControlGroup?: Maybe<RoleAccessControlGroupGraph>
  deleteRoleAccessControlGroup?: Maybe<Scalars['Boolean']>
  createRole?: Maybe<RoleGraph>
  deleteRole?: Maybe<Scalars['Boolean']>
  updateRole?: Maybe<RoleGraph>
  createStatisticAccessControl?: Maybe<AccessControlEntryGraph>
  createStatisticReportAccessControl?: Maybe<AccessControlEntryGraph>
  updateReportVersion?: Maybe<ReportVersionGraph>
  createStatisticReport?: Maybe<StatisticReportGraph>
  deleteStatisticReport?: Maybe<Scalars['Boolean']>
  updateStatisticReport?: Maybe<StatisticReportGraph>
  createStatistic?: Maybe<StatisticGraph>
  deleteStatistic?: Maybe<Scalars['Boolean']>
  updateStatistic?: Maybe<StatisticGraph>
  createUser?: Maybe<UserGraph>
  deleteUser?: Maybe<Scalars['Boolean']>
  updateUser?: Maybe<UserGraph>
}

export type MutationCreateAccessControlGroupUserArgs = {
  input?: Maybe<CreateAccessControlGroupUserInputGraph>
}

export type MutationDeleteAccessControlGroupUserArgs = {
  input?: Maybe<DeleteAccessControlGroupUserInputGraph>
}

export type MutationDeleteAccessControlArgs = {
  input?: Maybe<DeleteAccessControlInputGraph>
}

export type MutationUpdateAccessControlArgs = {
  input?: Maybe<UpdateAccessControlInputGraph>
}

export type MutationCreateAgencyMappingArgs = {
  input?: Maybe<CreateAgencyMappingInputGraph>
}

export type MutationDeleteAgencyMappingArgs = {
  input?: Maybe<DeleteAgencyMappingInputGraph>
}

export type MutationUpdateAgencyMappingArgs = {
  input?: Maybe<UpdateAgencyMappingInputGraph>
}

export type MutationCreateAgencyArgs = {
  input?: Maybe<CreateAgencyInputGraph>
}

export type MutationDeleteAgencyArgs = {
  input?: Maybe<DeleteAgencyInputGraph>
}

export type MutationUpdateAgencyArgs = {
  input?: Maybe<UpdateAgencyInputGraph>
}

export type MutationCreateApiKeyArgs = {
  input?: Maybe<CreateApiKeyInputGraph>
}

export type MutationDisableApiKeyArgs = {
  input?: Maybe<DisableApiKeyInputGraph>
}

export type MutationCreateAccessControlGroupArgs = {
  input?: Maybe<CreateAccessControlGroupInputGraph>
}

export type MutationDeleteAccessControlGroupArgs = {
  input?: Maybe<DeleteAccessControlGroupInputGraph>
}

export type MutationUpdateAccessControlGroupArgs = {
  input?: Maybe<UpdateAccessControlGroupInputGraph>
}

export type MutationCreatePortfolioArgs = {
  input?: Maybe<CreatePortfolioInputGraph>
}

export type MutationDeletePortfolioArgs = {
  input?: Maybe<DeletePortfolioInputGraph>
}

export type MutationUpdatePortfolioArgs = {
  input?: Maybe<UpdatePortfolioInputGraph>
}

export type MutationCreateProgramAccessControlArgs = {
  input?: Maybe<CreateProgramAccessControlInputGraph>
}

export type MutationCreateProgramSubmissionArgs = {
  input?: Maybe<CreateProgramSubmissionInputGraph>
}

export type MutationCreateProgramArgs = {
  input?: Maybe<CreateProgramInputGraph>
}

export type MutationDeleteProgramArgs = {
  input?: Maybe<DeleteProgramInputGraph>
}

export type MutationUpdateProgramArgs = {
  input?: Maybe<UpdateProgramInputGraph>
}

export type MutationCreateReportAccessControlArgs = {
  input?: Maybe<CreateReportAccessControlInputGraph>
}

export type MutationUpdateStatisticReportVersionArgs = {
  input?: Maybe<UpdateStatisticReportVersionInputGraph>
}

export type MutationCreateReportArgs = {
  input?: Maybe<CreateReportInputGraph>
}

export type MutationDeleteReportArgs = {
  input?: Maybe<DeleteReportInputGraph>
}

export type MutationUpdateReportArgs = {
  input?: Maybe<UpdateReportInputGraph>
}

export type MutationCreateRoleAccessControlGroupArgs = {
  input?: Maybe<CreateRoleAccessControlGroupInputGraph>
}

export type MutationDeleteRoleAccessControlGroupArgs = {
  input?: Maybe<DeleteRoleAccessControlGroupInputGraph>
}

export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInputGraph>
}

export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInputGraph>
}

export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInputGraph>
}

export type MutationCreateStatisticAccessControlArgs = {
  input?: Maybe<CreateStatisticAccessControlInputGraph>
}

export type MutationCreateStatisticReportAccessControlArgs = {
  input?: Maybe<CreateStatisticReportAccessControlInputGraph>
}

export type MutationUpdateReportVersionArgs = {
  input?: Maybe<UpdateReportVersionInputGraph>
}

export type MutationCreateStatisticReportArgs = {
  input?: Maybe<CreateStatisticReportInputGraph>
}

export type MutationDeleteStatisticReportArgs = {
  input?: Maybe<DeleteStatisticReportInputGraph>
}

export type MutationUpdateStatisticReportArgs = {
  input?: Maybe<UpdateStatisticReportInputGraph>
}

export type MutationCreateStatisticArgs = {
  input?: Maybe<CreateStatisticInputGraph>
}

export type MutationDeleteStatisticArgs = {
  input?: Maybe<DeleteStatisticInputGraph>
}

export type MutationUpdateStatisticArgs = {
  input?: Maybe<UpdateStatisticInputGraph>
}

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInputGraph>
}

export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInputGraph>
}

export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInputGraph>
}

export type OrderByGraph = {
  path: Scalars['String']
  descending?: Maybe<Scalars['Boolean']>
}

export type PortfolioGraph = {
  __typename?: 'PortfolioGraph'
  rowVersion: Scalars['String']
  metadata?: Maybe<Scalars['String']>
  agencies?: Maybe<Array<Maybe<AgencyGraph>>>
  id: Scalars['Guid']
  title: Scalars['String']
}

export type PortfolioGraphAgenciesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramAccessControlListGraph = {
  __typename?: 'ProgramAccessControlListGraph'
  program?: Maybe<ProgramGraph>
  accessControls?: Maybe<AccessControlListGraph>
  programId: Scalars['Guid']
  accessControlListId: Scalars['Guid']
  accessControlList: AccessControlListGraph
}

export type ProgramGraph = {
  __typename?: 'ProgramGraph'
  notes?: Maybe<Scalars['String']>
  commitments?: Maybe<Scalars['String']>
  externalId?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  agency?: Maybe<AgencyGraph>
  appropriations?: Maybe<Array<Maybe<AppropriationGraph>>>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  reports?: Maybe<Array<Maybe<ReportGraph>>>
  programSubmissions?: Maybe<Array<Maybe<ProgramSubmissionGraph>>>
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  accessControlList?: Maybe<Array<Maybe<AccessControlListGraph>>>
  id: Scalars['Guid']
  name: Scalars['String']
  agencyId: Scalars['Guid']
  programAccessControlList: ProgramAccessControlListGraph
}

export type ProgramGraphAppropriationsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraphProjectsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraphReportsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraphProgramSubmissionsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraphElectoratesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraphAccessControlListArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramSubmissionGraph = {
  __typename?: 'ProgramSubmissionGraph'
  program?: Maybe<ProgramGraph>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  id: Scalars['Guid']
  dataDate: Scalars['DateTimeOffset']
  timeStamp: Scalars['DateTimeOffset']
  programId: Scalars['Guid']
  submittedBy: UserGraph
  submittedById: Scalars['Guid']
}

export type ProgramSubmissionGraphProjectsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProjectGraph = {
  __typename?: 'ProjectGraph'
  geoJson?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  externalId?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  program?: Maybe<ProgramGraph>
  programSubmission?: Maybe<ProgramSubmissionGraph>
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  id: Scalars['Guid']
  name: Scalars['String']
  markdown: Scalars['String']
  organisation: Scalars['String']
  sensitivities: Scalars['String']
  start: Scalars['String']
  end: Scalars['String']
  committed: Scalars['UInt32']
  spent: Scalars['UInt32']
  endDate?: Maybe<Scalars['DateTimeOffset']>
  programId: Scalars['Guid']
  programSubmissionId: Scalars['Guid']
}

export type ProjectGraphElectoratesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  user?: Maybe<UserGraph>
  users?: Maybe<Array<Maybe<UserGraph>>>
  group?: Maybe<AccessControlGroupGraph>
  groups?: Maybe<Array<Maybe<AccessControlGroupGraph>>>
  role?: Maybe<RoleGraph>
  roles?: Maybe<Array<Maybe<RoleGraph>>>
  electorate?: Maybe<ElectorateGraph>
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  program?: Maybe<ProgramGraph>
  programs?: Maybe<Array<Maybe<ProgramGraph>>>
  project?: Maybe<ProjectGraph>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  report?: Maybe<ReportGraph>
  reports?: Maybe<Array<Maybe<ReportGraph>>>
  portfolio?: Maybe<PortfolioGraph>
  portfolios?: Maybe<Array<Maybe<PortfolioGraph>>>
  statistic?: Maybe<StatisticGraph>
  statistics?: Maybe<Array<Maybe<StatisticGraph>>>
  statisticReport?: Maybe<StatisticReportGraph>
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  agency?: Maybe<AgencyGraph>
  agencies?: Maybe<Array<Maybe<AgencyGraph>>>
  agencyMapping?: Maybe<AgencyMappingGraph>
  agencyMappings?: Maybe<Array<Maybe<AgencyMappingGraph>>>
  reportVersion?: Maybe<ReportVersionGraph>
  statisticReportVersion?: Maybe<StatisticReportVersionGraph>
  latestVersion?: Maybe<StatisticReportVersionGraph>
  programSubmission?: Maybe<ProgramSubmissionGraph>
  programSubmissions?: Maybe<Array<Maybe<ProgramSubmissionGraph>>>
}

export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryUsersArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryGroupArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryGroupsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryRoleArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryRolesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryElectorateArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryElectoratesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProgramArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProgramsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProjectArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProjectsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryReportArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryReportsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryPortfolioArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryPortfoliosArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatisticArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatisticsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatisticReportArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatisticReportsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryAgencyArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryAgenciesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryAgencyMappingArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryAgencyMappingsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryReportVersionArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatisticReportVersionArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryLatestVersionArgs = {
  statisticReportId?: Maybe<Scalars['String']>
}

export type QueryProgramSubmissionArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProgramSubmissionsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ReportAccessControlListGraph = {
  __typename?: 'ReportAccessControlListGraph'
  report?: Maybe<ReportGraph>
  accessControlList?: Maybe<AccessControlListGraph>
  reportId: Scalars['Guid']
  accessControlListId: Scalars['Guid']
}

export type ReportDataGraph = {
  __typename?: 'ReportDataGraph'
  reportVersion?: Maybe<ReportVersionGraph>
  data?: Maybe<Scalars['Json']>
  id: Scalars['Guid']
  markdown: Scalars['String']
  reportVersionId: Scalars['Guid']
  reportId: Scalars['Guid']
  report: ReportGraph
  sortOrder: Scalars['UInt32']
}

export type ReportGraph = {
  __typename?: 'ReportGraph'
  notes?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  reportVersions?: Maybe<Array<Maybe<ReportVersionGraph>>>
  accessControlList?: Maybe<Array<Maybe<AccessControlListGraph>>>
  latestVersion?: Maybe<ReportVersionGraph>
  id: Scalars['Guid']
  name: Scalars['String']
  programId: Scalars['Guid']
  program: ProgramGraph
  reportAccessControlList: ReportAccessControlListGraph
}

export type ReportGraphReportVersionsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ReportGraphAccessControlListArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ReportVersionGraph = {
  __typename?: 'ReportVersionGraph'
  rowVersion: Scalars['String']
  schema?: Maybe<Scalars['String']>
  reportFormat?: Maybe<Scalars['String']>
  report?: Maybe<ReportGraph>
  reportData?: Maybe<Array<Maybe<ReportDataGraph>>>
  id: Scalars['Guid']
  notes: Scalars['String']
  timestamp: Scalars['DateTimeOffset']
  dataDate: Scalars['DateTimeOffset']
  reportId: Scalars['Guid']
}

export type ReportVersionGraphReportDataArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ResultantAccessGraph = {
  __typename?: 'ResultantAccessGraph'
  accessControlListId?: Maybe<Scalars['Guid']>
  accessRights: Scalars['String']
  accessWasInherited?: Maybe<Scalars['Boolean']>
  groupName?: Maybe<Scalars['String']>
  parentId?: Maybe<Scalars['Guid']>
  parentName?: Maybe<Scalars['String']>
  hasAccessToParent?: Maybe<Scalars['Boolean']>
  entityId: Scalars['Guid']
  name: Scalars['String']
  groupId: Scalars['Guid']
}

export type RoleAccessControlGroupGraph = {
  __typename?: 'RoleAccessControlGroupGraph'
  accessControlGroup?: Maybe<AccessControlGroupGraph>
  role?: Maybe<RoleGraph>
  roleId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
}

export type RoleGraph = {
  __typename?: 'RoleGraph'
  id: Scalars['Guid']
  description: Scalars['String']
  title: Scalars['String']
  rowVersion: Scalars['String']
  createAgency: Scalars['Boolean']
  createProgram: Scalars['Boolean']
  createProject: Scalars['Boolean']
  createReport: Scalars['Boolean']
  createStatistic: Scalars['Boolean']
  deleteAgency: Scalars['Boolean']
  deleteProgram: Scalars['Boolean']
  deleteProject: Scalars['Boolean']
  deleteReport: Scalars['Boolean']
  deleteStatistic: Scalars['Boolean']
  updateElectorateAdvice: Scalars['Boolean']
  manageApiKeys: Scalars['Boolean']
  manageAccessControls: Scalars['Boolean']
  manageGroups: Scalars['Boolean']
  adminLogin: Scalars['Boolean']
  allAgencyModifier: Scalars['Boolean']
  updateCommitments: Scalars['Boolean']
  updateBriefCommitments: Scalars['Boolean']
  allowMessagePassThrough: Scalars['Boolean']
}

export type StateGraph = {
  __typename?: 'StateGraph'
  rowVersion: Scalars['String']
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  id: Scalars['Guid']
  population: Scalars['UInt32']
  name: Scalars['String']
  abbreviation: Scalars['String']
}

export type StateGraphElectoratesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticAccessControlListGraph = {
  __typename?: 'StatisticAccessControlListGraph'
  accessControls?: Maybe<AccessControlListGraph>
  statistic?: Maybe<StatisticGraph>
  statisticId: Scalars['Guid']
  accessControlListId: Scalars['Guid']
  accessControlList: AccessControlListGraph
}

export type StatisticGraph = {
  __typename?: 'StatisticGraph'
  rowVersion: Scalars['String']
  externalId?: Maybe<Scalars['String']>
  agency?: Maybe<AgencyGraph>
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  accessControlList?: Maybe<Array<Maybe<AccessControlListGraph>>>
  id: Scalars['Guid']
  name: Scalars['String']
  agencyId?: Maybe<Scalars['Guid']>
  statisticAccessControlList: StatisticAccessControlListGraph
}

export type StatisticGraphStatisticReportsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticGraphAccessControlListArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticReportAccessControlListGraph = {
  __typename?: 'StatisticReportAccessControlListGraph'
  accessControls?: Maybe<AccessControlListGraph>
  statisticReport?: Maybe<StatisticReportGraph>
  statisticReportId: Scalars['Guid']
  accessControlListId: Scalars['Guid']
  accessControlList: AccessControlListGraph
}

export type StatisticReportGraph = {
  __typename?: 'StatisticReportGraph'
  notes?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  statistic?: Maybe<StatisticGraph>
  accessControlList?: Maybe<Array<Maybe<AccessControlListGraph>>>
  latestVersion?: Maybe<StatisticReportVersionGraph>
  id: Scalars['Guid']
  name: Scalars['String']
  statisticId: Scalars['Guid']
  statisticReportAccessControlList: StatisticReportAccessControlListGraph
}

export type StatisticReportGraphAccessControlListArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticReportVersionGraph = {
  __typename?: 'StatisticReportVersionGraph'
  notes?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  reportFormat?: Maybe<Scalars['String']>
  statisticReport?: Maybe<StatisticReportGraph>
  id: Scalars['Guid']
  schema: Scalars['String']
  timestamp: Scalars['DateTimeOffset']
  dataDate: Scalars['DateTimeOffset']
  statisticReportId: Scalars['Guid']
}

export enum StringComparison {
  CurrentCulture = 'CURRENT_CULTURE',
  CurrentCultureIgnoreCase = 'CURRENT_CULTURE_IGNORE_CASE',
  InvariantCulture = 'INVARIANT_CULTURE',
  InvariantCultureIgnoreCase = 'INVARIANT_CULTURE_IGNORE_CASE',
  Ordinal = 'ORDINAL',
  OrdinalIgnoreCase = 'ORDINAL_IGNORE_CASE'
}

export type UpdateAccessControlGroupInputGraph = {
  id: Scalars['Guid']
  title: Scalars['String']
  rowVersion: Scalars['String']
}

export type UpdateAccessControlInputGraph = {
  accessControlListId: Scalars['Guid']
  accessControlGroupId: Scalars['Guid']
  rowVersion: Scalars['String']
  accessRights?: Maybe<AccessRights>
}

export type UpdateAgencyInputGraph = {
  id: Scalars['Guid']
  title: Scalars['String']
  metadata?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  portfolioId: Scalars['Guid']
}

export type UpdateAgencyMappingInputGraph = {
  id: Scalars['Guid']
  agencyId: Scalars['Guid']
  emailDomain: Scalars['String']
  accessControlGroupId: Scalars['Guid']
  rowVersion: Scalars['String']
}

export type UpdatePortfolioInputGraph = {
  id: Scalars['Guid']
  title: Scalars['String']
  metadata?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
}

export type UpdateProgramInputGraph = {
  id: Scalars['Guid']
  name: Scalars['String']
  agencyId: Scalars['Guid']
  externalId?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  commitments?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
}

export type UpdateReportInputGraph = {
  id: Scalars['Guid']
  name: Scalars['String']
  programId: Scalars['Guid']
  notes?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
}

export type UpdateReportVersionInputGraph = {
  id: Scalars['Guid']
  dataDate: Scalars['DateTimeOffset']
  notes?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
}

export type UpdateRoleInputGraph = {
  id: Scalars['Guid']
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  createAgency?: Maybe<Scalars['Boolean']>
  createProgram?: Maybe<Scalars['Boolean']>
  createProject?: Maybe<Scalars['Boolean']>
  createReport?: Maybe<Scalars['Boolean']>
  createStatistic?: Maybe<Scalars['Boolean']>
  deleteAgency?: Maybe<Scalars['Boolean']>
  deleteProgram?: Maybe<Scalars['Boolean']>
  deleteProject?: Maybe<Scalars['Boolean']>
  deleteReport?: Maybe<Scalars['Boolean']>
  deleteStatistic?: Maybe<Scalars['Boolean']>
  updateElectorateAdvice?: Maybe<Scalars['Boolean']>
  adminLogin?: Maybe<Scalars['Boolean']>
  allAgencyModifier?: Maybe<Scalars['Boolean']>
  manageApiKeys?: Maybe<Scalars['Boolean']>
  manageGroups?: Maybe<Scalars['Boolean']>
  manageAccessControls?: Maybe<Scalars['Boolean']>
  updateCommitments?: Maybe<Scalars['Boolean']>
  updateBriefCommitments?: Maybe<Scalars['Boolean']>
  allowMessagePassThrough?: Maybe<Scalars['Boolean']>
}

export type UpdateStatisticInputGraph = {
  id: Scalars['Guid']
  name: Scalars['String']
  agencyId: Scalars['Guid']
  externalId?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
}

export type UpdateStatisticReportInputGraph = {
  id: Scalars['Guid']
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  statisticId: Scalars['Guid']
  rowVersion: Scalars['String']
}

export type UpdateStatisticReportVersionInputGraph = {
  id: Scalars['Guid']
  dataDate: Scalars['DateTimeOffset']
  notes?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
}

export type UpdateUserInputGraph = {
  id: Scalars['Guid']
  emailAddress: Scalars['String']
  agencyId: Scalars['Guid']
  rowVersion: Scalars['String']
}

export type UserGraph = {
  __typename?: 'UserGraph'
  id: Scalars['Guid']
  rowVersion: Scalars['String']
  emailAddress: Scalars['String']
  lastLogin?: Maybe<Scalars['DateTimeOffset']>
  apiKeys?: Maybe<Array<Maybe<ApiKeyGraph>>>
  agency?: Maybe<AgencyGraph>
  programSubmissions?: Maybe<Array<Maybe<ProgramSubmissionGraph>>>
  groups?: Maybe<Array<Maybe<AccessControlGroupGraph>>>
  programAccess?: Maybe<Array<Maybe<ResultantAccessGraph>>>
  statisticAccess?: Maybe<Array<Maybe<ResultantAccessGraph>>>
  reportAccess?: Maybe<Array<Maybe<ResultantAccessGraph>>>
  statisticReportAccess?: Maybe<Array<Maybe<ResultantAccessGraph>>>
}

export type UserGraphApiKeysArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type UserGraphProgramSubmissionsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type WhereExpressionGraph = {
  path: Scalars['String']
  comparison?: Maybe<ComparisonGraph>
  case?: Maybe<StringComparison>
  value?: Maybe<Array<Maybe<Scalars['String']>>>
}
export type AllAgenciesSearchQueryVariables = {}

export type AllAgenciesSearchQuery = { __typename?: 'Query' } & {
  agencies: Maybe<
    Array<
      Maybe<
        { __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id' | 'title'> & {
            portfolio: Maybe<
              { __typename?: 'PortfolioGraph' } & Pick<
                PortfolioGraph,
                'id' | 'title'
              >
            >
          }
      >
    >
  >
}

export type CreateAgencyMutationVariables = {
  data: CreateAgencyInputGraph
}

export type CreateAgencyMutation = { __typename?: 'Mutation' } & {
  createAgency: Maybe<{ __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id'>>
}

export type UpdateAgencyMutationVariables = {
  data: UpdateAgencyInputGraph
}

export type UpdateAgencyMutation = { __typename?: 'Mutation' } & {
  updateAgency: Maybe<
    { __typename?: 'AgencyGraph' } & Pick<
      AgencyGraph,
      'id' | 'title' | 'metadata' | 'rowVersion'
    > & {
        portfolio: Maybe<
          { __typename?: 'PortfolioGraph' } & Pick<
            PortfolioGraph,
            'id' | 'title'
          >
        >
      }
  >
}

export type GetAgencyQueryVariables = {
  id: Scalars['ID']
}

export type GetAgencyQuery = { __typename?: 'Query' } & {
  agency: Maybe<
    { __typename?: 'AgencyGraph' } & Pick<
      AgencyGraph,
      'id' | 'title' | 'metadata' | 'rowVersion'
    > & {
        portfolio: Maybe<
          { __typename?: 'PortfolioGraph' } & Pick<
            PortfolioGraph,
            'id' | 'title'
          >
        >
      }
  >
}

export type CreateAgencyMappingMutationVariables = {
  data: CreateAgencyMappingInputGraph
}

export type CreateAgencyMappingMutation = { __typename?: 'Mutation' } & {
  createAgencyMapping: Maybe<
    { __typename?: 'AgencyMappingGraph' } & Pick<AgencyMappingGraph, 'id'>
  >
}

export type UpdateAgencyMappingMutationVariables = {
  data: UpdateAgencyMappingInputGraph
}

export type UpdateAgencyMappingMutation = { __typename?: 'Mutation' } & {
  updateAgencyMapping: Maybe<
    { __typename?: 'AgencyMappingGraph' } & Pick<AgencyMappingGraph, 'id'>
  >
}

export type GetAgencyMappingQueryVariables = {
  id: Scalars['ID']
}

export type GetAgencyMappingQuery = { __typename?: 'Query' } & {
  agencyMapping: Maybe<
    { __typename?: 'AgencyMappingGraph' } & Pick<
      AgencyMappingGraph,
      'id' | 'emailDomain' | 'rowVersion'
    > & {
        agency: Maybe<{ __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id'>>
        accessControlGroup: Maybe<
          { __typename?: 'AccessControlGroupGraph' } & Pick<
            AccessControlGroupGraph,
            'id' | 'title'
          >
        >
      }
  >
}

export type DeleteAgencyMutationVariables = {
  data: DeleteAgencyInputGraph
}

export type DeleteAgencyMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteAgency'
>

export type DeleteAgencyMappingMutationVariables = {
  data: DeleteAgencyMappingInputGraph
}

export type DeleteAgencyMappingMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteAgencyMapping'
>

export type AgencyQueryVariables = {
  id: Scalars['ID']
}

export type AgencyQuery = { __typename?: 'Query' } & {
  agency: Maybe<
    { __typename?: 'AgencyGraph' } & Pick<
      AgencyGraph,
      'id' | 'title' | 'metadata' | 'rowVersion'
    > & {
        portfolio: Maybe<
          { __typename?: 'PortfolioGraph' } & Pick<
            PortfolioGraph,
            'id' | 'title'
          >
        >
        agencyMapping: Maybe<
          Array<
            Maybe<
              { __typename?: 'AgencyMappingGraph' } & Pick<
                AgencyMappingGraph,
                'id' | 'emailDomain' | 'rowVersion'
              > & {
                  accessControlGroup: Maybe<
                    { __typename?: 'AccessControlGroupGraph' } & Pick<
                      AccessControlGroupGraph,
                      'id' | 'title'
                    >
                  >
                }
            >
          >
        >
      }
  >
}

export type PortfoliosQueryVariables = {}

export type PortfoliosQuery = { __typename?: 'Query' } & {
  portfolios: Maybe<
    Array<
      Maybe<
        { __typename?: 'PortfolioGraph' } & Pick<PortfolioGraph, 'id' | 'title'>
      >
    >
  >
}

export type CreateRoleAccessControlGroupMutationVariables = {
  data: CreateRoleAccessControlGroupInputGraph
}

export type CreateRoleAccessControlGroupMutation = {
  __typename?: 'Mutation'
} & {
  createRoleAccessControlGroup: Maybe<
    { __typename?: 'RoleAccessControlGroupGraph' } & Pick<
      RoleAccessControlGroupGraph,
      'accessControlGroupId' | 'roleId'
    >
  >
}

export type DeleteRoleAccessControlGroupMutationVariables = {
  data: DeleteRoleAccessControlGroupInputGraph
}

export type DeleteRoleAccessControlGroupMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'deleteRoleAccessControlGroup'>

export type AllRolesQueryVariables = {}

export type AllRolesQuery = { __typename?: 'Query' } & {
  roles: Maybe<
    Array<
      Maybe<
        { __typename?: 'RoleGraph' } & Pick<
          RoleGraph,
          'id' | 'title' | 'description' | 'rowVersion'
        >
      >
    >
  >
}

export type CreateAccessControlGroupUserMutationVariables = {
  data: CreateAccessControlGroupUserInputGraph
}

export type CreateAccessControlGroupUserMutation = {
  __typename?: 'Mutation'
} & {
  createAccessControlGroupUser: Maybe<
    { __typename?: 'AccessControlGroupUserGraph' } & Pick<
      AccessControlGroupUserGraph,
      'accessControlGroupId' | 'userId'
    >
  >
}

export type UsersQueryVariables = {}

export type UsersQuery = { __typename?: 'Query' } & {
  users: Maybe<
    Array<
      Maybe<
        { __typename?: 'UserGraph' } & Pick<
          UserGraph,
          'id' | 'emailAddress' | 'lastLogin' | 'rowVersion'
        >
      >
    >
  >
}

export type CreateAccessControlGroupMutationVariables = {
  data?: Maybe<CreateAccessControlGroupInputGraph>
}

export type CreateAccessControlGroupMutation = { __typename?: 'Mutation' } & {
  createAccessControlGroup: Maybe<
    { __typename?: 'AccessControlGroupGraph' } & Pick<
      AccessControlGroupGraph,
      'id' | 'title' | 'rowVersion'
    >
  >
}

export type UpdateAccessControlGroupMutationVariables = {
  data?: Maybe<UpdateAccessControlGroupInputGraph>
}

export type UpdateAccessControlGroupMutation = { __typename?: 'Mutation' } & {
  updateAccessControlGroup: Maybe<
    { __typename?: 'AccessControlGroupGraph' } & Pick<
      AccessControlGroupGraph,
      'id' | 'title' | 'rowVersion'
    >
  >
}

export type DeleteAccessControlGroupMutationVariables = {
  data?: Maybe<DeleteAccessControlGroupInputGraph>
}

export type DeleteAccessControlGroupMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'deleteAccessControlGroup'>

export type DeleteAccessControlGroupUserMutationVariables = {
  data: DeleteAccessControlGroupUserInputGraph
}

export type DeleteAccessControlGroupUserMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'deleteAccessControlGroupUser'>

export type GroupQueryVariables = {
  groupId: Scalars['ID']
}

export type GroupQuery = { __typename?: 'Query' } & {
  group: Maybe<
    { __typename?: 'AccessControlGroupGraph' } & Pick<
      AccessControlGroupGraph,
      'id' | 'rowVersion' | 'title'
    > & {
        members: Maybe<
          Array<
            Maybe<
              { __typename?: 'UserGraph' } & Pick<
                UserGraph,
                'id' | 'emailAddress' | 'lastLogin' | 'rowVersion'
              >
            >
          >
        >
        roles: Maybe<
          Array<
            Maybe<
              { __typename?: 'RoleGraph' } & Pick<
                RoleGraph,
                'id' | 'description' | 'rowVersion' | 'title'
              >
            >
          >
        >
      }
  >
}

export type AllGroupsQueryVariables = {}

export type AllGroupsQuery = { __typename?: 'Query' } & {
  groups: Maybe<
    Array<
      Maybe<
        { __typename?: 'AccessControlGroupGraph' } & Pick<
          AccessControlGroupGraph,
          'id' | 'title' | 'rowVersion'
        >
      >
    >
  >
}

export type AllGroupsSearchQueryVariables = {}

export type AllGroupsSearchQuery = { __typename?: 'Query' } & {
  groups: Maybe<
    Array<
      Maybe<
        { __typename?: 'AccessControlGroupGraph' } & Pick<
          AccessControlGroupGraph,
          'id' | 'title' | 'rowVersion'
        >
      >
    >
  >
}

export type DeleteAccessControlMutationVariables = {
  data?: Maybe<DeleteAccessControlInputGraph>
}

export type DeleteAccessControlMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteAccessControl'
>

export type UpdateAccessControlMutationVariables = {
  data?: Maybe<UpdateAccessControlInputGraph>
}

export type UpdateAccessControlMutation = { __typename?: 'Mutation' } & {
  updateAccessControl: Maybe<
    { __typename?: 'AccessControlEntryGraph' } & Pick<
      AccessControlEntryGraph,
      'id' | 'rights' | 'rowVersion'
    >
  >
}

export type CreatePortfolioMutationVariables = {
  data: CreatePortfolioInputGraph
}

export type CreatePortfolioMutation = { __typename?: 'Mutation' } & {
  createPortfolio: Maybe<
    { __typename?: 'PortfolioGraph' } & Pick<PortfolioGraph, 'id'>
  >
}

export type UpdatePortfolioMutationVariables = {
  data: UpdatePortfolioInputGraph
}

export type UpdatePortfolioMutation = { __typename?: 'Mutation' } & {
  updatePortfolio: Maybe<
    { __typename?: 'PortfolioGraph' } & Pick<PortfolioGraph, 'id'>
  >
}

export type GetPortfolioQueryVariables = {
  id: Scalars['ID']
}

export type GetPortfolioQuery = { __typename?: 'Query' } & {
  portfolio: Maybe<
    { __typename?: 'PortfolioGraph' } & Pick<
      PortfolioGraph,
      'id' | 'title' | 'metadata' | 'rowVersion'
    >
  >
}

export type DeletePortfolioMutationVariables = {
  data: DeletePortfolioInputGraph
}

export type DeletePortfolioMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deletePortfolio'
>

export type GetPortfolioDetailQueryVariables = {
  id: Scalars['ID']
}

export type GetPortfolioDetailQuery = { __typename?: 'Query' } & {
  portfolio: Maybe<
    { __typename?: 'PortfolioGraph' } & Pick<
      PortfolioGraph,
      'id' | 'title' | 'metadata'
    > & {
        agencies: Maybe<
          Array<
            Maybe<
              { __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id' | 'title'>
            >
          >
        >
      }
  >
}

export type AllPortfoliosSearchQueryVariables = {}

export type AllPortfoliosSearchQuery = { __typename?: 'Query' } & {
  portfolios: Maybe<
    Array<
      Maybe<
        { __typename?: 'PortfolioGraph' } & Pick<PortfolioGraph, 'id' | 'title'>
      >
    >
  >
}

export type CreateReportAccessControlMutationVariables = {
  data?: Maybe<CreateReportAccessControlInputGraph>
}

export type CreateReportAccessControlMutation = { __typename?: 'Mutation' } & {
  createReportAccessControl: Maybe<
    { __typename?: 'AccessControlEntryGraph' } & Pick<
      AccessControlEntryGraph,
      'id' | 'rights' | 'rowVersion'
    >
  >
}

export type ReportQueryVariables = {
  reportId: Scalars['ID']
}

export type ReportQuery = { __typename?: 'Query' } & {
  report: Maybe<
    { __typename?: 'ReportGraph' } & Pick<
      ReportGraph,
      'id' | 'name' | 'notes' | 'programId' | 'rowVersion'
    > & {
        accessControlList: Maybe<
          Array<
            Maybe<
              { __typename?: 'AccessControlListGraph' } & Pick<
                AccessControlListGraph,
                'id'
              > & {
                  accessControlEntries: Maybe<
                    Array<
                      Maybe<
                        { __typename?: 'AccessControlEntryGraph' } & Pick<
                          AccessControlEntryGraph,
                          'id' | 'rights' | 'rowVersion'
                        > & {
                            accessControlGroup: Maybe<
                              { __typename?: 'AccessControlGroupGraph' } & Pick<
                                AccessControlGroupGraph,
                                'id' | 'title'
                              >
                            >
                          }
                      >
                    >
                  >
                }
            >
          >
        >
        latestVersion: Maybe<
          { __typename?: 'ReportVersionGraph' } & Pick<
            ReportVersionGraph,
            'id' | 'dataDate' | 'notes'
          >
        >
      }
  >
}

export type CreateReportMutationVariables = {
  data?: Maybe<CreateReportInputGraph>
}

export type CreateReportMutation = { __typename?: 'Mutation' } & {
  createReport: Maybe<
    { __typename?: 'ReportGraph' } & Pick<
      ReportGraph,
      'id' | 'notes' | 'rowVersion'
    >
  >
}

export type UpdateReportMutationVariables = {
  data?: Maybe<UpdateReportInputGraph>
}

export type UpdateReportMutation = { __typename?: 'Mutation' } & {
  updateReport: Maybe<
    { __typename?: 'ReportGraph' } & Pick<ReportGraph, 'id' | 'name' | 'notes'>
  >
}

export type UpdateReportVersionMutationVariables = {
  data?: Maybe<UpdateReportVersionInputGraph>
}

export type UpdateReportVersionMutation = { __typename?: 'Mutation' } & {
  updateReportVersion: Maybe<
    { __typename?: 'ReportVersionGraph' } & Pick<ReportVersionGraph, 'id'>
  >
}

export type ReportVersionEditQueryVariables = {
  id: Scalars['ID']
}

export type ReportVersionEditQuery = { __typename?: 'Query' } & {
  reportVersion: Maybe<
    { __typename?: 'ReportVersionGraph' } & Pick<
      ReportVersionGraph,
      'id' | 'dataDate' | 'notes' | 'rowVersion'
    >
  >
}

export type CreateProgramMutationVariables = {
  data: CreateProgramInputGraph
}

export type CreateProgramMutation = { __typename?: 'Mutation' } & {
  createProgram: Maybe<
    { __typename?: 'ProgramGraph' } & Pick<
      ProgramGraph,
      'id' | 'name' | 'notes' | 'externalId' | 'rowVersion'
    > & {
        agency: Maybe<{ __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id'>>
      }
  >
}

export type UpdateProgramMutationVariables = {
  data: UpdateProgramInputGraph
}

export type UpdateProgramMutation = { __typename?: 'Mutation' } & {
  updateProgram: Maybe<
    { __typename?: 'ProgramGraph' } & Pick<
      ProgramGraph,
      'id' | 'name' | 'notes' | 'externalId' | 'rowVersion'
    > & {
        agency: Maybe<{ __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id'>>
      }
  >
}

export type DeleteProgramMutationVariables = {
  data?: Maybe<DeleteProgramInputGraph>
}

export type DeleteProgramMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteProgram'
>

export type DeleteReportMutationVariables = {
  data?: Maybe<DeleteReportInputGraph>
}

export type DeleteReportMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteReport'
>

export type CreateProgramAccessControlMutationVariables = {
  data?: Maybe<CreateProgramAccessControlInputGraph>
}

export type CreateProgramAccessControlMutation = { __typename?: 'Mutation' } & {
  createProgramAccessControl: Maybe<
    { __typename?: 'AccessControlEntryGraph' } & Pick<
      AccessControlEntryGraph,
      'id' | 'rights' | 'rowVersion'
    >
  >
}

export type ProgramQueryVariables = {
  programId: Scalars['ID']
}

export type ProgramQuery = { __typename?: 'Query' } & {
  program: Maybe<
    { __typename?: 'ProgramGraph' } & Pick<
      ProgramGraph,
      'id' | 'name' | 'notes' | 'externalId' | 'rowVersion'
    > & {
        accessControlList: Maybe<
          Array<
            Maybe<
              { __typename?: 'AccessControlListGraph' } & Pick<
                AccessControlListGraph,
                'id'
              > & {
                  accessControlEntries: Maybe<
                    Array<
                      Maybe<
                        { __typename?: 'AccessControlEntryGraph' } & Pick<
                          AccessControlEntryGraph,
                          'id' | 'rights' | 'rowVersion'
                        > & {
                            accessControlGroup: Maybe<
                              { __typename?: 'AccessControlGroupGraph' } & Pick<
                                AccessControlGroupGraph,
                                'id' | 'title'
                              >
                            >
                          }
                      >
                    >
                  >
                }
            >
          >
        >
        agency: Maybe<
          { __typename?: 'AgencyGraph' } & Pick<
            AgencyGraph,
            'id' | 'title' | 'metadata'
          >
        >
        reports: Maybe<
          Array<
            Maybe<
              { __typename?: 'ReportGraph' } & Pick<
                ReportGraph,
                'id' | 'name' | 'notes'
              > & {
                  accessControlList: Maybe<
                    Array<
                      Maybe<
                        { __typename?: 'AccessControlListGraph' } & {
                          accessControlEntries: Maybe<
                            Array<
                              Maybe<
                                { __typename?: 'AccessControlEntryGraph' } & {
                                  accessControlGroup: Maybe<
                                    {
                                      __typename?: 'AccessControlGroupGraph'
                                    } & Pick<AccessControlGroupGraph, 'title'>
                                  >
                                }
                              >
                            >
                          >
                        }
                      >
                    >
                  >
                }
            >
          >
        >
      }
  >
}

export type EditProgramQueryVariables = {
  programId: Scalars['ID']
}

export type EditProgramQuery = { __typename?: 'Query' } & {
  program: Maybe<
    { __typename?: 'ProgramGraph' } & Pick<
      ProgramGraph,
      'id' | 'name' | 'notes' | 'externalId' | 'rowVersion'
    > & {
        agency: Maybe<
          { __typename?: 'AgencyGraph' } & Pick<
            AgencyGraph,
            'id' | 'title' | 'metadata'
          >
        >
      }
  >
}

export type AllPortfoliosQueryVariables = {}

export type AllPortfoliosQuery = { __typename?: 'Query' } & {
  portfolios: Maybe<
    Array<
      Maybe<
        { __typename?: 'PortfolioGraph' } & Pick<
          PortfolioGraph,
          'id' | 'title' | 'metadata'
        > & {
            agencies: Maybe<
              Array<
                Maybe<
                  { __typename?: 'AgencyGraph' } & Pick<
                    AgencyGraph,
                    'id' | 'metadata' | 'title'
                  >
                >
              >
            >
          }
      >
    >
  >
}

export type AllProgramsQueryVariables = {}

export type AllProgramsQuery = { __typename?: 'Query' } & {
  programs: Maybe<
    Array<
      Maybe<
        { __typename?: 'ProgramGraph' } & Pick<ProgramGraph, 'id' | 'name'> & {
            agency: Maybe<
              { __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id' | 'title'>
            >
          }
      >
    >
  >
}

export type ProjectQueryVariables = {
  id: Scalars['ID']
}

export type ProjectQuery = { __typename?: 'Query' } & {
  project: Maybe<
    { __typename?: 'ProjectGraph' } & Pick<
      ProjectGraph,
      'id' | 'name' | 'notes' | 'externalId' | 'status' | 'rowVersion'
    > & {
        programSubmission: Maybe<
          { __typename?: 'ProgramSubmissionGraph' } & Pick<
            ProgramSubmissionGraph,
            'id' | 'timeStamp' | 'dataDate'
          >
        >
      }
  >
}

export type AllProjectsQueryVariables = {}

export type AllProjectsQuery = { __typename?: 'Query' } & {
  projects: Maybe<
    Array<
      Maybe<
        { __typename?: 'ProjectGraph' } & Pick<ProjectGraph, 'id' | 'name'> & {
            program: Maybe<
              { __typename?: 'ProgramGraph' } & Pick<ProgramGraph, 'name'>
            >
          }
      >
    >
  >
}

export type AllProjectsSearchQueryVariables = {
  name?: Maybe<Scalars['String']>
}

export type AllProjectsSearchQuery = { __typename?: 'Query' } & {
  projects: Maybe<
    Array<
      Maybe<
        { __typename?: 'ProjectGraph' } & Pick<ProjectGraph, 'id' | 'name'> & {
            program: Maybe<
              { __typename?: 'ProgramGraph' } & Pick<
                ProgramGraph,
                'id' | 'name'
              >
            >
            programSubmission: Maybe<
              { __typename?: 'ProgramSubmissionGraph' } & Pick<
                ProgramSubmissionGraph,
                'id' | 'timeStamp' | 'dataDate'
              >
            >
          }
      >
    >
  >
}

export type AllProgramReportsQueryVariables = {}

export type AllProgramReportsQuery = { __typename?: 'Query' } & {
  programs: Maybe<
    Array<
      Maybe<
        { __typename: 'ProgramGraph' } & Pick<ProgramGraph, 'id' | 'name'> & {
            reports: Maybe<
              Array<
                Maybe<
                  { __typename: 'ReportGraph' } & Pick<
                    ReportGraph,
                    'id' | 'name'
                  > & {
                      latestVersion: Maybe<
                        { __typename?: 'ReportVersionGraph' } & Pick<
                          ReportVersionGraph,
                          'id' | 'notes'
                        >
                      >
                    }
                >
              >
            >
          }
      >
    >
  >
}

export type DeleteRoleMutationVariables = {
  data?: Maybe<DeleteRoleInputGraph>
}

export type DeleteRoleMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteRole'
>

export type CreateRoleMutationVariables = {
  data?: Maybe<CreateRoleInputGraph>
}

export type CreateRoleMutation = { __typename?: 'Mutation' } & {
  createRole: Maybe<
    { __typename?: 'RoleGraph' } & Pick<
      RoleGraph,
      'id' | 'title' | 'rowVersion'
    >
  >
}

export type UpdateRoleMutationVariables = {
  data?: Maybe<UpdateRoleInputGraph>
}

export type UpdateRoleMutation = { __typename?: 'Mutation' } & {
  updateRole: Maybe<
    { __typename?: 'RoleGraph' } & Pick<
      RoleGraph,
      'id' | 'title' | 'description' | 'rowVersion'
    >
  >
}

export type RoleQueryVariables = {
  roleId: Scalars['ID']
}

export type RoleQuery = { __typename?: 'Query' } & {
  role: Maybe<
    { __typename?: 'RoleGraph' } & Pick<
      RoleGraph,
      | 'id'
      | 'title'
      | 'description'
      | 'rowVersion'
      | 'adminLogin'
      | 'allAgencyModifier'
      | 'createAgency'
      | 'createProgram'
      | 'createProject'
      | 'createReport'
      | 'createStatistic'
      | 'deleteAgency'
      | 'deleteProgram'
      | 'deleteProject'
      | 'deleteReport'
      | 'deleteStatistic'
      | 'manageApiKeys'
      | 'manageAccessControls'
      | 'manageGroups'
      | 'updateElectorateAdvice'
      | 'updateCommitments'
      | 'updateBriefCommitments'
      | 'allowMessagePassThrough'
    >
  >
}

export type RolesSearchQueryVariables = {}

export type RolesSearchQuery = { __typename?: 'Query' } & {
  roles: Maybe<
    Array<
      Maybe<
        { __typename?: 'RoleGraph' } & Pick<
          RoleGraph,
          'id' | 'title' | 'description'
        >
      >
    >
  >
}

export type CreateStatisticReportMutationVariables = {
  data: CreateStatisticReportInputGraph
}

export type CreateStatisticReportMutation = { __typename?: 'Mutation' } & {
  createStatisticReport: Maybe<
    { __typename?: 'StatisticReportGraph' } & Pick<
      StatisticReportGraph,
      'id' | 'name' | 'notes' | 'statisticId'
    >
  >
}

export type UpdateStatisticReportMutationVariables = {
  data?: Maybe<UpdateStatisticReportInputGraph>
}

export type UpdateStatisticReportMutation = { __typename?: 'Mutation' } & {
  updateStatisticReport: Maybe<
    { __typename?: 'StatisticReportGraph' } & Pick<
      StatisticReportGraph,
      'id' | 'name' | 'notes' | 'statisticId'
    >
  >
}

export type StatisticReportEditQueryVariables = {
  reportId: Scalars['ID']
}

export type StatisticReportEditQuery = { __typename?: 'Query' } & {
  statisticReport: Maybe<
    { __typename?: 'StatisticReportGraph' } & Pick<
      StatisticReportGraph,
      'id' | 'name' | 'notes' | 'rowVersion' | 'statisticId'
    >
  >
}

export type UpdateStatisticReportVersionMutationVariables = {
  data?: Maybe<UpdateStatisticReportVersionInputGraph>
}

export type UpdateStatisticReportVersionMutation = {
  __typename?: 'Mutation'
} & {
  updateStatisticReportVersion: Maybe<
    { __typename?: 'StatisticReportVersionGraph' } & Pick<
      StatisticReportVersionGraph,
      'id'
    >
  >
}

export type StatisticReportVersionEditQueryVariables = {
  id: Scalars['ID']
}

export type StatisticReportVersionEditQuery = { __typename?: 'Query' } & {
  statisticReportVersion: Maybe<
    { __typename?: 'StatisticReportVersionGraph' } & Pick<
      StatisticReportVersionGraph,
      'id' | 'dataDate' | 'notes' | 'rowVersion'
    >
  >
}

export type CreateStatisticReportAccessControlMutationVariables = {
  data?: Maybe<CreateStatisticReportAccessControlInputGraph>
}

export type CreateStatisticReportAccessControlMutation = {
  __typename?: 'Mutation'
} & {
  createStatisticReportAccessControl: Maybe<
    { __typename?: 'AccessControlEntryGraph' } & Pick<
      AccessControlEntryGraph,
      'id' | 'rights' | 'rowVersion'
    >
  >
}

export type StatisticReportDetailQueryVariables = {
  reportId: Scalars['ID']
}

export type StatisticReportDetailQuery = { __typename?: 'Query' } & {
  statisticReport: Maybe<
    { __typename?: 'StatisticReportGraph' } & Pick<
      StatisticReportGraph,
      'id' | 'name' | 'notes' | 'rowVersion' | 'statisticId'
    > & {
        accessControlList: Maybe<
          Array<
            Maybe<
              { __typename?: 'AccessControlListGraph' } & Pick<
                AccessControlListGraph,
                'id'
              > & {
                  accessControlEntries: Maybe<
                    Array<
                      Maybe<
                        { __typename?: 'AccessControlEntryGraph' } & Pick<
                          AccessControlEntryGraph,
                          'id' | 'rights' | 'rowVersion'
                        > & {
                            accessControlGroup: Maybe<
                              { __typename?: 'AccessControlGroupGraph' } & Pick<
                                AccessControlGroupGraph,
                                'id' | 'title'
                              >
                            >
                          }
                      >
                    >
                  >
                }
            >
          >
        >
        latestVersion: Maybe<
          { __typename?: 'StatisticReportVersionGraph' } & Pick<
            StatisticReportVersionGraph,
            'id' | 'dataDate' | 'notes'
          >
        >
      }
  >
}

export type CreateStatisticMutationVariables = {
  data: CreateStatisticInputGraph
}

export type CreateStatisticMutation = { __typename?: 'Mutation' } & {
  createStatistic: Maybe<
    { __typename?: 'StatisticGraph' } & Pick<
      StatisticGraph,
      'id' | 'name' | 'externalId' | 'rowVersion'
    > & {
        agency: Maybe<{ __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id'>>
      }
  >
}

export type UpdateStatisticMutationVariables = {
  data: UpdateStatisticInputGraph
}

export type UpdateStatisticMutation = { __typename?: 'Mutation' } & {
  updateStatistic: Maybe<
    { __typename?: 'StatisticGraph' } & Pick<
      StatisticGraph,
      'id' | 'name' | 'externalId' | 'rowVersion'
    > & {
        agency: Maybe<{ __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id'>>
      }
  >
}

export type DeleteStatisticReportMutationVariables = {
  data: DeleteStatisticReportInputGraph
}

export type DeleteStatisticReportMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteStatisticReport'
>

export type DeleteStatisticMutationVariables = {
  data: DeleteStatisticInputGraph
}

export type DeleteStatisticMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteStatistic'
>

export type CreateStatisticAccessControlMutationVariables = {
  data?: Maybe<CreateStatisticAccessControlInputGraph>
}

export type CreateStatisticAccessControlMutation = {
  __typename?: 'Mutation'
} & {
  createStatisticAccessControl: Maybe<
    { __typename?: 'AccessControlEntryGraph' } & Pick<
      AccessControlEntryGraph,
      'id' | 'rights' | 'rowVersion'
    >
  >
}

export type AllStatisticsQueryVariables = {}

export type AllStatisticsQuery = { __typename?: 'Query' } & {
  statistics: Maybe<
    Array<
      Maybe<
        { __typename?: 'StatisticGraph' } & Pick<
          StatisticGraph,
          'id' | 'name'
        > & {
            agency: Maybe<
              { __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id' | 'title'>
            >
            statisticReports: Maybe<
              Array<
                Maybe<
                  { __typename?: 'StatisticReportGraph' } & Pick<
                    StatisticReportGraph,
                    'id' | 'name' | 'notes'
                  >
                >
              >
            >
          }
      >
    >
  >
}

export type StatisticQueryVariables = {
  statisticId: Scalars['ID']
}

export type StatisticQuery = { __typename?: 'Query' } & {
  statistic: Maybe<
    { __typename?: 'StatisticGraph' } & Pick<
      StatisticGraph,
      'id' | 'name' | 'externalId' | 'rowVersion'
    > & {
        agency: Maybe<
          { __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id' | 'title'>
        >
        accessControlList: Maybe<
          Array<
            Maybe<
              { __typename?: 'AccessControlListGraph' } & Pick<
                AccessControlListGraph,
                'id'
              > & {
                  accessControlEntries: Maybe<
                    Array<
                      Maybe<
                        { __typename?: 'AccessControlEntryGraph' } & Pick<
                          AccessControlEntryGraph,
                          'id' | 'rights' | 'rowVersion'
                        > & {
                            accessControlGroup: Maybe<
                              { __typename?: 'AccessControlGroupGraph' } & Pick<
                                AccessControlGroupGraph,
                                'id' | 'title'
                              >
                            >
                          }
                      >
                    >
                  >
                }
            >
          >
        >
        statisticReports: Maybe<
          Array<
            Maybe<
              { __typename?: 'StatisticReportGraph' } & Pick<
                StatisticReportGraph,
                'id' | 'name' | 'notes'
              >
            >
          >
        >
      }
  >
}

export type AllAgenciesQueryVariables = {}

export type AllAgenciesQuery = { __typename?: 'Query' } & {
  agencies: Maybe<
    Array<
      Maybe<
        { __typename?: 'AgencyGraph' } & Pick<
          AgencyGraph,
          'id' | 'metadata' | 'title'
        >
      >
    >
  >
}

export type AllStatisticsSearchQueryVariables = {}

export type AllStatisticsSearchQuery = { __typename?: 'Query' } & {
  statistics: Maybe<
    Array<
      Maybe<
        { __typename?: 'StatisticGraph' } & Pick<
          StatisticGraph,
          'id' | 'name'
        > & {
            agency: Maybe<
              { __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id' | 'title'>
            >
          }
      >
    >
  >
}

export type StatisticAndStatisticReportsQueryVariables = {}

export type StatisticAndStatisticReportsQuery = { __typename?: 'Query' } & {
  statistics: Maybe<
    Array<
      Maybe<
        { __typename?: 'StatisticGraph' } & Pick<
          StatisticGraph,
          'id' | 'name'
        > & {
            statisticReports: Maybe<
              Array<
                Maybe<
                  { __typename?: 'StatisticReportGraph' } & Pick<
                    StatisticReportGraph,
                    'id' | 'name'
                  > & {
                      latestVersion: Maybe<
                        { __typename?: 'StatisticReportVersionGraph' } & Pick<
                          StatisticReportVersionGraph,
                          'id' | 'notes'
                        >
                      >
                    }
                >
              >
            >
          }
      >
    >
  >
}

export type CreateUserMutationVariables = {
  data?: Maybe<CreateUserInputGraph>
}

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: Maybe<{ __typename?: 'UserGraph' } & Pick<UserGraph, 'id'>>
}

export type UpdateUserMutationVariables = {
  data: UpdateUserInputGraph
}

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: Maybe<
    { __typename?: 'UserGraph' } & Pick<UserGraph, 'id' | 'emailAddress'>
  >
}

export type GetUserQueryVariables = {
  id: Scalars['ID']
}

export type GetUserQuery = { __typename?: 'Query' } & {
  user: Maybe<
    { __typename?: 'UserGraph' } & Pick<
      UserGraph,
      'emailAddress' | 'rowVersion'
    > & {
        agency: Maybe<{ __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id'>>
      }
  >
}

export type DeleteUserMutationVariables = {
  data: DeleteUserInputGraph
}

export type DeleteUserMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteUser'
>

export type CreateApiKeyMutationVariables = {
  data: CreateApiKeyInputGraph
}

export type CreateApiKeyMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'createApiKey'
>

export type DisableApiKeyMutationVariables = {
  data?: Maybe<DisableApiKeyInputGraph>
}

export type DisableApiKeyMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'disableApiKey'
>

export type UserQueryVariables = {
  userId: Scalars['ID']
}

export type UserQuery = { __typename?: 'Query' } & {
  user: Maybe<
    { __typename?: 'UserGraph' } & Pick<
      UserGraph,
      'id' | 'emailAddress' | 'lastLogin'
    > & {
        groups: Maybe<
          Array<
            Maybe<
              { __typename?: 'AccessControlGroupGraph' } & Pick<
                AccessControlGroupGraph,
                'id' | 'title'
              >
            >
          >
        >
        agency: Maybe<
          { __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id' | 'title'>
        >
        apiKeys: Maybe<
          Array<
            Maybe<
              { __typename?: 'ApiKeyGraph' } & Pick<
                ApiKeyGraph,
                'id' | 'key' | 'created' | 'disable'
              >
            >
          >
        >
        programAccess: Maybe<
          Array<
            Maybe<
              { __typename?: 'ResultantAccessGraph' } & Pick<
                ResultantAccessGraph,
                'entityId' | 'name' | 'groupId' | 'groupName' | 'accessRights'
              >
            >
          >
        >
        reportAccess: Maybe<
          Array<
            Maybe<
              { __typename?: 'ResultantAccessGraph' } & Pick<
                ResultantAccessGraph,
                | 'entityId'
                | 'groupName'
                | 'name'
                | 'parentName'
                | 'hasAccessToParent'
              >
            >
          >
        >
        statisticAccess: Maybe<
          Array<
            Maybe<
              { __typename?: 'ResultantAccessGraph' } & Pick<
                ResultantAccessGraph,
                | 'entityId'
                | 'name'
                | 'groupName'
                | 'hasAccessToParent'
                | 'parentName'
              >
            >
          >
        >
        statisticReportAccess: Maybe<
          Array<
            Maybe<
              { __typename?: 'ResultantAccessGraph' } & Pick<
                ResultantAccessGraph,
                | 'entityId'
                | 'name'
                | 'parentName'
                | 'hasAccessToParent'
                | 'groupName'
                | 'accessRights'
              >
            >
          >
        >
      }
  >
}

export type SelectAgenciesQueryVariables = {}

export type SelectAgenciesQuery = { __typename?: 'Query' } & {
  agencies: Maybe<
    Array<
      Maybe<{ __typename?: 'AgencyGraph' } & Pick<AgencyGraph, 'id' | 'title'>>
    >
  >
}

export type AllUsersSearchQueryVariables = {}

export type AllUsersSearchQuery = { __typename?: 'Query' } & {
  users: Maybe<
    Array<
      Maybe<
        { __typename?: 'UserGraph' } & Pick<
          UserGraph,
          'id' | 'emailAddress' | 'lastLogin' | 'rowVersion'
        >
      >
    >
  >
}

export const AllAgenciesSearchDocument = gql`
  query allAgenciesSearch {
    agencies(orderBy: { path: "title" }) {
      id
      title
      portfolio {
        id
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllAgenciesSearchGQL extends Apollo.Query<
  AllAgenciesSearchQuery,
  AllAgenciesSearchQueryVariables
> {
  document = AllAgenciesSearchDocument
}
export const CreateAgencyDocument = gql`
  mutation createAgency($data: CreateAgencyInputGraph!) {
    createAgency(input: $data) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateAgencyGQL extends Apollo.Mutation<
  CreateAgencyMutation,
  CreateAgencyMutationVariables
> {
  document = CreateAgencyDocument
}
export const UpdateAgencyDocument = gql`
  mutation updateAgency($data: UpdateAgencyInputGraph!) {
    updateAgency(input: $data) {
      id
      title
      metadata
      portfolio {
        id
        title
      }
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateAgencyGQL extends Apollo.Mutation<
  UpdateAgencyMutation,
  UpdateAgencyMutationVariables
> {
  document = UpdateAgencyDocument
}
export const GetAgencyDocument = gql`
  query getAgency($id: ID!) {
    agency(id: $id) {
      id
      title
      metadata
      rowVersion
      portfolio {
        id
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetAgencyGQL extends Apollo.Query<
  GetAgencyQuery,
  GetAgencyQueryVariables
> {
  document = GetAgencyDocument
}
export const CreateAgencyMappingDocument = gql`
  mutation createAgencyMapping($data: CreateAgencyMappingInputGraph!) {
    createAgencyMapping(input: $data) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateAgencyMappingGQL extends Apollo.Mutation<
  CreateAgencyMappingMutation,
  CreateAgencyMappingMutationVariables
> {
  document = CreateAgencyMappingDocument
}
export const UpdateAgencyMappingDocument = gql`
  mutation updateAgencyMapping($data: UpdateAgencyMappingInputGraph!) {
    updateAgencyMapping(input: $data) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateAgencyMappingGQL extends Apollo.Mutation<
  UpdateAgencyMappingMutation,
  UpdateAgencyMappingMutationVariables
> {
  document = UpdateAgencyMappingDocument
}
export const GetAgencyMappingDocument = gql`
  query getAgencyMapping($id: ID!) {
    agencyMapping(id: $id) {
      id
      emailDomain
      rowVersion
      agency {
        id
      }
      accessControlGroup {
        id
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetAgencyMappingGQL extends Apollo.Query<
  GetAgencyMappingQuery,
  GetAgencyMappingQueryVariables
> {
  document = GetAgencyMappingDocument
}
export const DeleteAgencyDocument = gql`
  mutation deleteAgency($data: DeleteAgencyInputGraph!) {
    deleteAgency(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteAgencyGQL extends Apollo.Mutation<
  DeleteAgencyMutation,
  DeleteAgencyMutationVariables
> {
  document = DeleteAgencyDocument
}
export const DeleteAgencyMappingDocument = gql`
  mutation deleteAgencyMapping($data: DeleteAgencyMappingInputGraph!) {
    deleteAgencyMapping(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteAgencyMappingGQL extends Apollo.Mutation<
  DeleteAgencyMappingMutation,
  DeleteAgencyMappingMutationVariables
> {
  document = DeleteAgencyMappingDocument
}
export const AgencyDocument = gql`
  query agency($id: ID!) {
    agency(id: $id) {
      id
      title
      metadata
      rowVersion
      portfolio {
        id
        title
      }
      agencyMapping {
        id
        emailDomain
        rowVersion
        accessControlGroup {
          id
          title
        }
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AgencyGQL extends Apollo.Query<AgencyQuery, AgencyQueryVariables> {
  document = AgencyDocument
}
export const PortfoliosDocument = gql`
  query portfolios {
    portfolios {
      id
      title
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class PortfoliosGQL extends Apollo.Query<
  PortfoliosQuery,
  PortfoliosQueryVariables
> {
  document = PortfoliosDocument
}
export const CreateRoleAccessControlGroupDocument = gql`
  mutation createRoleAccessControlGroup(
    $data: CreateRoleAccessControlGroupInputGraph!
  ) {
    createRoleAccessControlGroup(input: $data) {
      accessControlGroupId
      roleId
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateRoleAccessControlGroupGQL extends Apollo.Mutation<
  CreateRoleAccessControlGroupMutation,
  CreateRoleAccessControlGroupMutationVariables
> {
  document = CreateRoleAccessControlGroupDocument
}
export const DeleteRoleAccessControlGroupDocument = gql`
  mutation deleteRoleAccessControlGroup(
    $data: DeleteRoleAccessControlGroupInputGraph!
  ) {
    deleteRoleAccessControlGroup(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteRoleAccessControlGroupGQL extends Apollo.Mutation<
  DeleteRoleAccessControlGroupMutation,
  DeleteRoleAccessControlGroupMutationVariables
> {
  document = DeleteRoleAccessControlGroupDocument
}
export const AllRolesDocument = gql`
  query allRoles {
    roles {
      id
      title
      description
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllRolesGQL extends Apollo.Query<
  AllRolesQuery,
  AllRolesQueryVariables
> {
  document = AllRolesDocument
}
export const CreateAccessControlGroupUserDocument = gql`
  mutation createAccessControlGroupUser(
    $data: CreateAccessControlGroupUserInputGraph!
  ) {
    createAccessControlGroupUser(input: $data) {
      accessControlGroupId
      userId
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateAccessControlGroupUserGQL extends Apollo.Mutation<
  CreateAccessControlGroupUserMutation,
  CreateAccessControlGroupUserMutationVariables
> {
  document = CreateAccessControlGroupUserDocument
}
export const UsersDocument = gql`
  query users {
    users(orderBy: { path: "emailAddress" }) {
      id
      emailAddress
      lastLogin
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
  document = UsersDocument
}
export const CreateAccessControlGroupDocument = gql`
  mutation createAccessControlGroup($data: CreateAccessControlGroupInputGraph) {
    createAccessControlGroup(input: $data) {
      id
      title
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateAccessControlGroupGQL extends Apollo.Mutation<
  CreateAccessControlGroupMutation,
  CreateAccessControlGroupMutationVariables
> {
  document = CreateAccessControlGroupDocument
}
export const UpdateAccessControlGroupDocument = gql`
  mutation updateAccessControlGroup($data: UpdateAccessControlGroupInputGraph) {
    updateAccessControlGroup(input: $data) {
      id
      title
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateAccessControlGroupGQL extends Apollo.Mutation<
  UpdateAccessControlGroupMutation,
  UpdateAccessControlGroupMutationVariables
> {
  document = UpdateAccessControlGroupDocument
}
export const DeleteAccessControlGroupDocument = gql`
  mutation deleteAccessControlGroup($data: DeleteAccessControlGroupInputGraph) {
    deleteAccessControlGroup(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteAccessControlGroupGQL extends Apollo.Mutation<
  DeleteAccessControlGroupMutation,
  DeleteAccessControlGroupMutationVariables
> {
  document = DeleteAccessControlGroupDocument
}
export const DeleteAccessControlGroupUserDocument = gql`
  mutation deleteAccessControlGroupUser(
    $data: DeleteAccessControlGroupUserInputGraph!
  ) {
    deleteAccessControlGroupUser(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteAccessControlGroupUserGQL extends Apollo.Mutation<
  DeleteAccessControlGroupUserMutation,
  DeleteAccessControlGroupUserMutationVariables
> {
  document = DeleteAccessControlGroupUserDocument
}
export const GroupDocument = gql`
  query group($groupId: ID!) {
    group(id: $groupId) {
      id
      rowVersion
      title
      members(orderBy: { path: "emailAddress" }) {
        id
        emailAddress
        lastLogin
        rowVersion
      }
      roles {
        id
        description
        rowVersion
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GroupGQL extends Apollo.Query<GroupQuery, GroupQueryVariables> {
  document = GroupDocument
}
export const AllGroupsDocument = gql`
  query allGroups {
    groups(orderBy: { path: "title" }) {
      id
      title
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllGroupsGQL extends Apollo.Query<
  AllGroupsQuery,
  AllGroupsQueryVariables
> {
  document = AllGroupsDocument
}
export const AllGroupsSearchDocument = gql`
  query allGroupsSearch {
    groups(orderBy: { path: "title" }) {
      id
      title
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllGroupsSearchGQL extends Apollo.Query<
  AllGroupsSearchQuery,
  AllGroupsSearchQueryVariables
> {
  document = AllGroupsSearchDocument
}
export const DeleteAccessControlDocument = gql`
  mutation deleteAccessControl($data: DeleteAccessControlInputGraph) {
    deleteAccessControl(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteAccessControlGQL extends Apollo.Mutation<
  DeleteAccessControlMutation,
  DeleteAccessControlMutationVariables
> {
  document = DeleteAccessControlDocument
}
export const UpdateAccessControlDocument = gql`
  mutation updateAccessControl($data: UpdateAccessControlInputGraph) {
    updateAccessControl(input: $data) {
      id
      rights
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateAccessControlGQL extends Apollo.Mutation<
  UpdateAccessControlMutation,
  UpdateAccessControlMutationVariables
> {
  document = UpdateAccessControlDocument
}
export const CreatePortfolioDocument = gql`
  mutation createPortfolio($data: CreatePortfolioInputGraph!) {
    createPortfolio(input: $data) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreatePortfolioGQL extends Apollo.Mutation<
  CreatePortfolioMutation,
  CreatePortfolioMutationVariables
> {
  document = CreatePortfolioDocument
}
export const UpdatePortfolioDocument = gql`
  mutation updatePortfolio($data: UpdatePortfolioInputGraph!) {
    updatePortfolio(input: $data) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdatePortfolioGQL extends Apollo.Mutation<
  UpdatePortfolioMutation,
  UpdatePortfolioMutationVariables
> {
  document = UpdatePortfolioDocument
}
export const GetPortfolioDocument = gql`
  query getPortfolio($id: ID!) {
    portfolio(id: $id) {
      id
      title
      metadata
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetPortfolioGQL extends Apollo.Query<
  GetPortfolioQuery,
  GetPortfolioQueryVariables
> {
  document = GetPortfolioDocument
}
export const DeletePortfolioDocument = gql`
  mutation deletePortfolio($data: DeletePortfolioInputGraph!) {
    deletePortfolio(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeletePortfolioGQL extends Apollo.Mutation<
  DeletePortfolioMutation,
  DeletePortfolioMutationVariables
> {
  document = DeletePortfolioDocument
}
export const GetPortfolioDetailDocument = gql`
  query getPortfolioDetail($id: ID!) {
    portfolio(id: $id) {
      id
      title
      metadata
      agencies {
        id
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetPortfolioDetailGQL extends Apollo.Query<
  GetPortfolioDetailQuery,
  GetPortfolioDetailQueryVariables
> {
  document = GetPortfolioDetailDocument
}
export const AllPortfoliosSearchDocument = gql`
  query allPortfoliosSearch {
    portfolios(orderBy: { path: "title" }) {
      id
      title
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllPortfoliosSearchGQL extends Apollo.Query<
  AllPortfoliosSearchQuery,
  AllPortfoliosSearchQueryVariables
> {
  document = AllPortfoliosSearchDocument
}
export const CreateReportAccessControlDocument = gql`
  mutation createReportAccessControl(
    $data: CreateReportAccessControlInputGraph
  ) {
    createReportAccessControl(input: $data) {
      id
      rights
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateReportAccessControlGQL extends Apollo.Mutation<
  CreateReportAccessControlMutation,
  CreateReportAccessControlMutationVariables
> {
  document = CreateReportAccessControlDocument
}
export const ReportDocument = gql`
  query report($reportId: ID!) {
    report(id: $reportId) {
      id
      name
      notes
      programId
      rowVersion
      accessControlList {
        id
        accessControlEntries(orderBy: { path: "accessControlGroup.title" }) {
          id
          accessControlGroup {
            id
            title
          }
          rights
          rowVersion
        }
      }
      latestVersion {
        id
        dataDate
        notes
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class ReportGQL extends Apollo.Query<ReportQuery, ReportQueryVariables> {
  document = ReportDocument
}
export const CreateReportDocument = gql`
  mutation createReport($data: CreateReportInputGraph) {
    createReport(input: $data) {
      id
      notes
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateReportGQL extends Apollo.Mutation<
  CreateReportMutation,
  CreateReportMutationVariables
> {
  document = CreateReportDocument
}
export const UpdateReportDocument = gql`
  mutation updateReport($data: UpdateReportInputGraph) {
    updateReport(input: $data) {
      id
      name
      notes
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateReportGQL extends Apollo.Mutation<
  UpdateReportMutation,
  UpdateReportMutationVariables
> {
  document = UpdateReportDocument
}
export const UpdateReportVersionDocument = gql`
  mutation updateReportVersion($data: UpdateReportVersionInputGraph) {
    updateReportVersion(input: $data) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateReportVersionGQL extends Apollo.Mutation<
  UpdateReportVersionMutation,
  UpdateReportVersionMutationVariables
> {
  document = UpdateReportVersionDocument
}
export const ReportVersionEditDocument = gql`
  query reportVersionEdit($id: ID!) {
    reportVersion(id: $id) {
      id
      dataDate
      notes
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class ReportVersionEditGQL extends Apollo.Query<
  ReportVersionEditQuery,
  ReportVersionEditQueryVariables
> {
  document = ReportVersionEditDocument
}
export const CreateProgramDocument = gql`
  mutation createProgram($data: CreateProgramInputGraph!) {
    createProgram(input: $data) {
      id
      name
      agency {
        id
      }
      notes
      externalId
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateProgramGQL extends Apollo.Mutation<
  CreateProgramMutation,
  CreateProgramMutationVariables
> {
  document = CreateProgramDocument
}
export const UpdateProgramDocument = gql`
  mutation updateProgram($data: UpdateProgramInputGraph!) {
    updateProgram(input: $data) {
      id
      name
      agency {
        id
      }
      notes
      externalId
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateProgramGQL extends Apollo.Mutation<
  UpdateProgramMutation,
  UpdateProgramMutationVariables
> {
  document = UpdateProgramDocument
}
export const DeleteProgramDocument = gql`
  mutation deleteProgram($data: DeleteProgramInputGraph) {
    deleteProgram(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteProgramGQL extends Apollo.Mutation<
  DeleteProgramMutation,
  DeleteProgramMutationVariables
> {
  document = DeleteProgramDocument
}
export const DeleteReportDocument = gql`
  mutation deleteReport($data: DeleteReportInputGraph) {
    deleteReport(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteReportGQL extends Apollo.Mutation<
  DeleteReportMutation,
  DeleteReportMutationVariables
> {
  document = DeleteReportDocument
}
export const CreateProgramAccessControlDocument = gql`
  mutation createProgramAccessControl(
    $data: CreateProgramAccessControlInputGraph
  ) {
    createProgramAccessControl(input: $data) {
      id
      rights
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateProgramAccessControlGQL extends Apollo.Mutation<
  CreateProgramAccessControlMutation,
  CreateProgramAccessControlMutationVariables
> {
  document = CreateProgramAccessControlDocument
}
export const ProgramDocument = gql`
  query program($programId: ID!) {
    program(id: $programId) {
      id
      name
      notes
      externalId
      rowVersion
      accessControlList {
        id
        accessControlEntries(orderBy: { path: "accessControlGroup.title" }) {
          id
          rights
          rowVersion
          accessControlGroup {
            id
            title
          }
        }
      }
      agency {
        id
        title
        metadata
      }
      reports {
        id
        name
        notes
        accessControlList {
          accessControlEntries {
            accessControlGroup {
              title
            }
          }
        }
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class ProgramGQL extends Apollo.Query<
  ProgramQuery,
  ProgramQueryVariables
> {
  document = ProgramDocument
}
export const EditProgramDocument = gql`
  query editProgram($programId: ID!) {
    program(id: $programId) {
      id
      name
      notes
      externalId
      rowVersion
      agency {
        id
        title
        metadata
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class EditProgramGQL extends Apollo.Query<
  EditProgramQuery,
  EditProgramQueryVariables
> {
  document = EditProgramDocument
}
export const AllPortfoliosDocument = gql`
  query allPortfolios {
    portfolios(orderBy: { path: "title" }) {
      id
      title
      metadata
      agencies {
        id
        metadata
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllPortfoliosGQL extends Apollo.Query<
  AllPortfoliosQuery,
  AllPortfoliosQueryVariables
> {
  document = AllPortfoliosDocument
}
export const AllProgramsDocument = gql`
  query allPrograms {
    programs(orderBy: { path: "name" }) {
      id
      name
      agency {
        id
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllProgramsGQL extends Apollo.Query<
  AllProgramsQuery,
  AllProgramsQueryVariables
> {
  document = AllProgramsDocument
}
export const ProjectDocument = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      notes
      externalId
      status
      rowVersion
      programSubmission {
        id
        timeStamp
        dataDate
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class ProjectGQL extends Apollo.Query<
  ProjectQuery,
  ProjectQueryVariables
> {
  document = ProjectDocument
}
export const AllProjectsDocument = gql`
  query allProjects {
    projects(orderBy: { path: "name" }) {
      id
      name
      program {
        name
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllProjectsGQL extends Apollo.Query<
  AllProjectsQuery,
  AllProjectsQueryVariables
> {
  document = AllProjectsDocument
}
export const AllProjectsSearchDocument = gql`
  query allProjectsSearch($name: String) {
    projects(
      where: { path: "name", comparison: contains, value: [$name] }
      orderBy: { path: "name" }
    ) {
      id
      name
      program {
        id
        name
      }
      programSubmission {
        id
        timeStamp
        dataDate
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllProjectsSearchGQL extends Apollo.Query<
  AllProjectsSearchQuery,
  AllProjectsSearchQueryVariables
> {
  document = AllProjectsSearchDocument
}
export const AllProgramReportsDocument = gql`
  query allProgramReports {
    programs(orderBy: { path: "name" }) {
      id
      name
      reports(orderBy: { path: "name" }) {
        id
        name
        __typename
        latestVersion {
          id
          notes
        }
      }
      __typename
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllProgramReportsGQL extends Apollo.Query<
  AllProgramReportsQuery,
  AllProgramReportsQueryVariables
> {
  document = AllProgramReportsDocument
}
export const DeleteRoleDocument = gql`
  mutation deleteRole($data: DeleteRoleInputGraph) {
    deleteRole(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteRoleGQL extends Apollo.Mutation<
  DeleteRoleMutation,
  DeleteRoleMutationVariables
> {
  document = DeleteRoleDocument
}
export const CreateRoleDocument = gql`
  mutation createRole($data: CreateRoleInputGraph) {
    createRole(input: $data) {
      id
      title
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateRoleGQL extends Apollo.Mutation<
  CreateRoleMutation,
  CreateRoleMutationVariables
> {
  document = CreateRoleDocument
}
export const UpdateRoleDocument = gql`
  mutation updateRole($data: UpdateRoleInputGraph) {
    updateRole(input: $data) {
      id
      title
      description
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateRoleGQL extends Apollo.Mutation<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
> {
  document = UpdateRoleDocument
}
export const RoleDocument = gql`
  query role($roleId: ID!) {
    role(id: $roleId) {
      id
      title
      description
      rowVersion
      adminLogin
      allAgencyModifier
      createAgency
      createProgram
      createProject
      createReport
      createStatistic
      deleteAgency
      deleteProgram
      deleteProject
      deleteReport
      deleteStatistic
      manageApiKeys
      manageAccessControls
      manageGroups
      updateElectorateAdvice
      updateCommitments
      updateBriefCommitments
      allowMessagePassThrough
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class RoleGQL extends Apollo.Query<RoleQuery, RoleQueryVariables> {
  document = RoleDocument
}
export const RolesSearchDocument = gql`
  query rolesSearch {
    roles(orderBy: { path: "title" }) {
      id
      title
      description
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class RolesSearchGQL extends Apollo.Query<
  RolesSearchQuery,
  RolesSearchQueryVariables
> {
  document = RolesSearchDocument
}
export const CreateStatisticReportDocument = gql`
  mutation createStatisticReport($data: CreateStatisticReportInputGraph!) {
    createStatisticReport(input: $data) {
      id
      name
      notes
      statisticId
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateStatisticReportGQL extends Apollo.Mutation<
  CreateStatisticReportMutation,
  CreateStatisticReportMutationVariables
> {
  document = CreateStatisticReportDocument
}
export const UpdateStatisticReportDocument = gql`
  mutation updateStatisticReport($data: UpdateStatisticReportInputGraph) {
    updateStatisticReport(input: $data) {
      id
      name
      notes
      statisticId
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateStatisticReportGQL extends Apollo.Mutation<
  UpdateStatisticReportMutation,
  UpdateStatisticReportMutationVariables
> {
  document = UpdateStatisticReportDocument
}
export const StatisticReportEditDocument = gql`
  query statisticReportEdit($reportId: ID!) {
    statisticReport(id: $reportId) {
      id
      name
      notes
      rowVersion
      statisticId
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class StatisticReportEditGQL extends Apollo.Query<
  StatisticReportEditQuery,
  StatisticReportEditQueryVariables
> {
  document = StatisticReportEditDocument
}
export const UpdateStatisticReportVersionDocument = gql`
  mutation updateStatisticReportVersion(
    $data: UpdateStatisticReportVersionInputGraph
  ) {
    updateStatisticReportVersion(input: $data) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateStatisticReportVersionGQL extends Apollo.Mutation<
  UpdateStatisticReportVersionMutation,
  UpdateStatisticReportVersionMutationVariables
> {
  document = UpdateStatisticReportVersionDocument
}
export const StatisticReportVersionEditDocument = gql`
  query statisticReportVersionEdit($id: ID!) {
    statisticReportVersion(id: $id) {
      id
      dataDate
      notes
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class StatisticReportVersionEditGQL extends Apollo.Query<
  StatisticReportVersionEditQuery,
  StatisticReportVersionEditQueryVariables
> {
  document = StatisticReportVersionEditDocument
}
export const CreateStatisticReportAccessControlDocument = gql`
  mutation createStatisticReportAccessControl(
    $data: CreateStatisticReportAccessControlInputGraph
  ) {
    createStatisticReportAccessControl(input: $data) {
      id
      rights
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateStatisticReportAccessControlGQL extends Apollo.Mutation<
  CreateStatisticReportAccessControlMutation,
  CreateStatisticReportAccessControlMutationVariables
> {
  document = CreateStatisticReportAccessControlDocument
}
export const StatisticReportDetailDocument = gql`
  query statisticReportDetail($reportId: ID!) {
    statisticReport(id: $reportId) {
      id
      name
      notes
      rowVersion
      statisticId
      accessControlList {
        id
        accessControlEntries(orderBy: { path: "accessControlGroup.title" }) {
          id
          accessControlGroup {
            id
            title
          }
          rights
          rowVersion
        }
      }
      latestVersion {
        id
        dataDate
        notes
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class StatisticReportDetailGQL extends Apollo.Query<
  StatisticReportDetailQuery,
  StatisticReportDetailQueryVariables
> {
  document = StatisticReportDetailDocument
}
export const CreateStatisticDocument = gql`
  mutation createStatistic($data: CreateStatisticInputGraph!) {
    createStatistic(input: $data) {
      id
      name
      agency {
        id
      }
      externalId
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateStatisticGQL extends Apollo.Mutation<
  CreateStatisticMutation,
  CreateStatisticMutationVariables
> {
  document = CreateStatisticDocument
}
export const UpdateStatisticDocument = gql`
  mutation updateStatistic($data: UpdateStatisticInputGraph!) {
    updateStatistic(input: $data) {
      id
      name
      agency {
        id
      }
      externalId
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateStatisticGQL extends Apollo.Mutation<
  UpdateStatisticMutation,
  UpdateStatisticMutationVariables
> {
  document = UpdateStatisticDocument
}
export const DeleteStatisticReportDocument = gql`
  mutation deleteStatisticReport($data: DeleteStatisticReportInputGraph!) {
    deleteStatisticReport(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteStatisticReportGQL extends Apollo.Mutation<
  DeleteStatisticReportMutation,
  DeleteStatisticReportMutationVariables
> {
  document = DeleteStatisticReportDocument
}
export const DeleteStatisticDocument = gql`
  mutation deleteStatistic($data: DeleteStatisticInputGraph!) {
    deleteStatistic(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteStatisticGQL extends Apollo.Mutation<
  DeleteStatisticMutation,
  DeleteStatisticMutationVariables
> {
  document = DeleteStatisticDocument
}
export const CreateStatisticAccessControlDocument = gql`
  mutation createStatisticAccessControl(
    $data: CreateStatisticAccessControlInputGraph
  ) {
    createStatisticAccessControl(input: $data) {
      id
      rights
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateStatisticAccessControlGQL extends Apollo.Mutation<
  CreateStatisticAccessControlMutation,
  CreateStatisticAccessControlMutationVariables
> {
  document = CreateStatisticAccessControlDocument
}
export const AllStatisticsDocument = gql`
  query allStatistics {
    statistics(orderBy: { path: "name" }) {
      id
      name
      agency {
        id
        title
      }
      statisticReports {
        id
        name
        notes
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllStatisticsGQL extends Apollo.Query<
  AllStatisticsQuery,
  AllStatisticsQueryVariables
> {
  document = AllStatisticsDocument
}
export const StatisticDocument = gql`
  query statistic($statisticId: ID!) {
    statistic(id: $statisticId) {
      id
      agency {
        id
        title
      }
      accessControlList {
        id
        accessControlEntries(orderBy: { path: "accessControlGroup.title" }) {
          id
          rights
          rowVersion
          accessControlGroup {
            id
            title
          }
        }
      }
      name
      externalId
      rowVersion
      statisticReports {
        id
        name
        notes
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class StatisticGQL extends Apollo.Query<
  StatisticQuery,
  StatisticQueryVariables
> {
  document = StatisticDocument
}
export const AllAgenciesDocument = gql`
  query allAgencies {
    agencies(orderBy: { path: "title" }) {
      id
      metadata
      title
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllAgenciesGQL extends Apollo.Query<
  AllAgenciesQuery,
  AllAgenciesQueryVariables
> {
  document = AllAgenciesDocument
}
export const AllStatisticsSearchDocument = gql`
  query allStatisticsSearch {
    statistics(orderBy: { path: "name" }) {
      id
      name
      agency {
        id
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllStatisticsSearchGQL extends Apollo.Query<
  AllStatisticsSearchQuery,
  AllStatisticsSearchQueryVariables
> {
  document = AllStatisticsSearchDocument
}
export const StatisticAndStatisticReportsDocument = gql`
  query statisticAndStatisticReports {
    statistics(orderBy: { path: "name" }) {
      id
      name
      statisticReports {
        id
        name
        latestVersion {
          id
          notes
        }
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class StatisticAndStatisticReportsGQL extends Apollo.Query<
  StatisticAndStatisticReportsQuery,
  StatisticAndStatisticReportsQueryVariables
> {
  document = StatisticAndStatisticReportsDocument
}
export const CreateUserDocument = gql`
  mutation createUser($data: CreateUserInputGraph) {
    createUser(input: $data) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateUserGQL extends Apollo.Mutation<
  CreateUserMutation,
  CreateUserMutationVariables
> {
  document = CreateUserDocument
}
export const UpdateUserDocument = gql`
  mutation updateUser($data: UpdateUserInputGraph!) {
    updateUser(input: $data) {
      id
      emailAddress
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdateUserGQL extends Apollo.Mutation<
  UpdateUserMutation,
  UpdateUserMutationVariables
> {
  document = UpdateUserDocument
}
export const GetUserDocument = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      emailAddress
      agency {
        id
      }
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetUserGQL extends Apollo.Query<
  GetUserQuery,
  GetUserQueryVariables
> {
  document = GetUserDocument
}
export const DeleteUserDocument = gql`
  mutation deleteUser($data: DeleteUserInputGraph!) {
    deleteUser(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteUserGQL extends Apollo.Mutation<
  DeleteUserMutation,
  DeleteUserMutationVariables
> {
  document = DeleteUserDocument
}
export const CreateApiKeyDocument = gql`
  mutation createApiKey($data: CreateApiKeyInputGraph!) {
    createApiKey(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class CreateApiKeyGQL extends Apollo.Mutation<
  CreateApiKeyMutation,
  CreateApiKeyMutationVariables
> {
  document = CreateApiKeyDocument
}
export const DisableApiKeyDocument = gql`
  mutation disableApiKey($data: DisableApiKeyInputGraph) {
    disableApiKey(input: $data)
  }
`

@Injectable({
  providedIn: 'root'
})
export class DisableApiKeyGQL extends Apollo.Mutation<
  DisableApiKeyMutation,
  DisableApiKeyMutationVariables
> {
  document = DisableApiKeyDocument
}
export const UserDocument = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      id
      emailAddress
      lastLogin
      groups {
        id
        title
      }
      agency {
        id
        title
      }
      apiKeys(orderBy: { path: "created", descending: true }) {
        id
        key
        created
        disable
      }
      programAccess {
        entityId
        name
        groupId
        groupName
        accessRights
      }
      reportAccess {
        entityId
        groupName
        name
        parentName
        hasAccessToParent
      }
      statisticAccess {
        entityId
        name
        groupName
        hasAccessToParent
        parentName
      }
      statisticReportAccess {
        entityId
        name
        parentName
        hasAccessToParent
        groupName
        accessRights
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
  document = UserDocument
}
export const SelectAgenciesDocument = gql`
  query selectAgencies {
    agencies(orderBy: { path: "title" }) {
      id
      title
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class SelectAgenciesGQL extends Apollo.Query<
  SelectAgenciesQuery,
  SelectAgenciesQueryVariables
> {
  document = SelectAgenciesDocument
}
export const AllUsersSearchDocument = gql`
  query allUsersSearch {
    users(orderBy: { path: "emailAddress" }) {
      id
      emailAddress
      lastLogin
      rowVersion
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class AllUsersSearchGQL extends Apollo.Query<
  AllUsersSearchQuery,
  AllUsersSearchQueryVariables
> {
  document = AllUsersSearchDocument
}
