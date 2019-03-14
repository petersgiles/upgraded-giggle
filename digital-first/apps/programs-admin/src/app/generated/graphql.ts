export type Maybe<T> = T | null

export interface OrderByGraph {
  path: string

  descending?: Maybe<boolean>
}

export interface WhereExpressionGraph {
  path: string

  comparison?: Maybe<ComparisonGraph>

  case?: Maybe<StringComparison>

  value?: Maybe<(Maybe<string>)[]>
}

export interface CreateAccessControlGroupInputGraph {
  title: string
}

export interface CreateAccessControlGroupUserInputGraph {
  accessControlGroupId: Guid

  userId: Guid
}

export interface CreateAgencyInputGraph {
  title: string

  metadata?: Maybe<string>

  portfolioId: Guid
}

export interface CreateAgencyMappingInputGraph {
  agencyId: Guid

  emailDomain: string

  accessControlGroupId: Guid
}

export interface CreateApiKeyInputGraph {
  userId: Guid

  apiKey?: Maybe<string>
}

export interface CreateDisplayGroupInputGraph {
  title: string

  sortOrder: UInt32

  metadata?: Maybe<string>

  parentId?: Maybe<Guid>
}

export interface CreateDisplayGroupProgramInputGraph {
  sortOrder: UInt32

  metadata: string

  programId: Guid

  displayGroupId: Guid
}

export interface CreateDisplayGroupStatisticInputGraph {
  sortOrder: UInt32

  metadata: string

  statisticId: Guid

  displayGroupId: Guid
}

export interface CreatePortfolioInputGraph {
  title: string

  metadata?: Maybe<string>
}

export interface CreateProgramInputGraph {
  name: string

  agencyId: Guid

  externalId?: Maybe<string>

  notes?: Maybe<string>

  commitments?: Maybe<string>
}

export interface CreateProgramAccessControlInputGraph {
  programId: Guid

  accessControlGroupId: Guid

  accessRights?: Maybe<AccessRights>
}

export interface CreateProjectInputGraph {
  name: string

  externalId?: Maybe<string>

  programId: Guid

  geoJson?: Maybe<string>

  notes?: Maybe<string>

  status?: Maybe<string>

  endDate?: Maybe<Date>
}

export interface CreateReportInputGraph {
  name: string

  programId: Guid

  notes?: Maybe<string>
}

export interface CreateReportAccessControlInputGraph {
  reportId: Guid

  accessControlGroupId: Guid

  accessRights?: Maybe<AccessRights>
}

export interface CreateRoleInputGraph {
  title: string

  description?: Maybe<string>

  createAgency?: Maybe<boolean>

  createProgram?: Maybe<boolean>

  createProject?: Maybe<boolean>

  createReport?: Maybe<boolean>

  createStatistic?: Maybe<boolean>

  deleteAgency?: Maybe<boolean>

  deleteProgram?: Maybe<boolean>

  deleteProject?: Maybe<boolean>

  deleteReport?: Maybe<boolean>

  deleteStatistic?: Maybe<boolean>

  updateElectorateAdvice?: Maybe<boolean>

  adminLogin?: Maybe<boolean>

  allAgencyModifier?: Maybe<boolean>

  manageApiKeys?: Maybe<boolean>

  manageGroups?: Maybe<boolean>

  manageAccessControls?: Maybe<boolean>
}

export interface CreateRoleAccessControlGroupInputGraph {
  roleId: Guid

  accessControlGroupId: Guid
}

export interface CreateStatisticInputGraph {
  name: string

  agencyId: Guid

  externalId?: Maybe<string>
}

export interface CreateStatisticAccessControlInputGraph {
  statisticId: Guid

  accessControlGroupId: Guid

  accessRights?: Maybe<AccessRights>
}

export interface CreateStatisticReportInputGraph {
  name: string

  notes?: Maybe<string>

  statisticId: Guid
}

export interface CreateStatisticReportAccessControlInputGraph {
  statisticReportId: Guid

  accessControlGroupId: Guid

  accessRights?: Maybe<AccessRights>
}

export interface CreateUserInputGraph {
  emailAddress: string

  agencyId: Guid
}

export interface DeleteAccessControlInputGraph {
  accessControlListId: Guid

  accessControlGroupId: Guid
}

export interface DeleteAccessControlGroupInputGraph {
  id: Guid
}

export interface DeleteAccessControlGroupUserInputGraph {
  accessControlGroupId: Guid

  userId: Guid
}

export interface DeleteAgencyInputGraph {
  id: Guid
}

export interface DeleteAgencyMappingInputGraph {
  id: Guid
}

export interface DeleteApiKeyInputGraph {
  id: Guid
}

export interface DeleteDisplayGroupInputGraph {
  id: Guid
}

export interface DeleteDisplayGroupProgramInputGraph {
  programId: Guid

  displayGroupId: Guid
}

export interface DeleteDisplayGroupStatisticInputGraph {
  statisticId: Guid

  displayGroupId: Guid
}

export interface DeletePortfolioInputGraph {
  id: Guid
}

export interface DeleteProgramInputGraph {
  id: Guid
}

export interface DeleteProjectInputGraph {
  id: Guid
}

export interface DeleteReportInputGraph {
  id: Guid
}

export interface DeleteRoleInputGraph {
  id: Guid
}

export interface DeleteRoleAccessControlGroupInputGraph {
  roleId: Guid

  accessControlGroupId: Guid
}

export interface DeleteStatisticInputGraph {
  id: Guid
}

export interface DeleteStatisticReportInputGraph {
  id: Guid
}

export interface DeleteUserInputGraph {
  id: Guid
}

export interface UpdateAccessControlInputGraph {
  accessControlListId: Guid

  accessControlGroupId: Guid

  rowVersion: string

  accessRights?: Maybe<AccessRights>
}

export interface UpdateAccessControlGroupInputGraph {
  id: Guid

  title: string

  rowVersion: string
}

export interface UpdateAgencyInputGraph {
  id: Guid

  title: string

  metadata?: Maybe<string>

  rowVersion: string

  portfolioId: Guid
}

export interface UpdateAgencyMappingInputGraph {
  id: Guid

  agencyId: Guid

  emailDomain: string

  accessControlGroupId: Guid

  rowVersion: string
}

export interface UpdateApiKeyInputGraph {
  id: Guid

  disable: boolean

  rowVersion: string
}

export interface UpdateDisplayGroupInputGraph {
  id: Guid

  title: string

  sortOrder: UInt32

  metadata?: Maybe<string>

  parentId?: Maybe<Guid>

  rowVersion: string
}

export interface UpdateDisplayGroupProgramInputGraph {
  programId: Guid

  displayGroupId: Guid

  sortOrder: UInt32

  metadata?: Maybe<string>

  rowVersion: string
}

export interface UpdateDisplayGroupStatisticInputGraph {
  statisticId: Guid

  displayGroupId: Guid

  sortOrder: UInt32

  metadata?: Maybe<string>

  rowVersion: string
}

export interface UpdatePortfolioInputGraph {
  id: Guid

  title: string

  metadata?: Maybe<string>

  rowVersion: string
}

export interface UpdateProgramInputGraph {
  id: Guid

  name: string

  agencyId: Guid

  externalId?: Maybe<string>

  notes?: Maybe<string>

  commitments?: Maybe<string>

  rowVersion: string
}

export interface UpdateProjectInputGraph {
  externalId?: Maybe<string>

  endDate?: Maybe<Date>

  geoJson?: Maybe<string>

  id: Guid

  name: string

  notes?: Maybe<string>

  programId: Guid

  rowVersion: string

  status?: Maybe<string>
}

export interface UpdateReportInputGraph {
  id: Guid

  name: string

  programId: Guid

  notes?: Maybe<string>

  rowVersion: string
}

export interface UpdateReportVersionInputGraph {
  id: Guid

  dataDate: DateTimeOffset

  notes?: Maybe<string>

  rowVersion: string
}

export interface UpdateRoleInputGraph {
  id: Guid

  title: string

  description?: Maybe<string>

  rowVersion: string

  createAgency?: Maybe<boolean>

  createProgram?: Maybe<boolean>

  createProject?: Maybe<boolean>

  createReport?: Maybe<boolean>

  createStatistic?: Maybe<boolean>

  deleteAgency?: Maybe<boolean>

  deleteProgram?: Maybe<boolean>

  deleteProject?: Maybe<boolean>

  deleteReport?: Maybe<boolean>

  deleteStatistic?: Maybe<boolean>

  updateElectorateAdvice?: Maybe<boolean>

  adminLogin?: Maybe<boolean>

  allAgencyModifier?: Maybe<boolean>

  manageApiKeys?: Maybe<boolean>

  manageGroups?: Maybe<boolean>

  manageAccessControls?: Maybe<boolean>
}

export interface UpdateStatisticInputGraph {
  id: Guid

  name: string

  agencyId: Guid

  externalId?: Maybe<string>

  rowVersion: string
}

export interface UpdateStatisticReportInputGraph {
  id: Guid

  name: string

  notes?: Maybe<string>

  statisticId: Guid

  rowVersion: string
}

export interface UpdateStatisticReportVersionInputGraph {
  id: Guid

  dataDate: DateTimeOffset

  notes?: Maybe<string>

  rowVersion: string
}

export interface UpdateUserInputGraph {
  id: Guid

  emailAddress: string

  agencyId: Guid

  rowVersion: string
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

export enum StringComparison {
  CurrentCulture = 'CURRENT_CULTURE',
  CurrentCultureIgnoreCase = 'CURRENT_CULTURE_IGNORE_CASE',
  InvariantCulture = 'INVARIANT_CULTURE',
  InvariantCultureIgnoreCase = 'INVARIANT_CULTURE_IGNORE_CASE',
  Ordinal = 'ORDINAL',
  OrdinalIgnoreCase = 'ORDINAL_IGNORE_CASE'
}

export enum AccessRights {
  None = 'NONE',
  Read = 'READ',
  Write = 'WRITE'
}

/** Guid */
export type Guid = any

/** The `DateTimeOffset` scalar type represents a date, time and offset from UTC. `DateTimeOffset` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type DateTimeOffset = any

/** UInt32 */
export type UInt32 = any

/** The `Date` scalar type represents a year, month and day in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard (yyyy-MM-dd). */
export type Date = any

/** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type DateTime = any

export type Decimal = any

/** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
export type Milliseconds = any

/** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
export type Seconds = any

// ====================================================
// Documents
// ====================================================

export namespace AllAgenciesSearch {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    agencies: Maybe<(Maybe<Agencies>)[]>
  }

  export type Agencies = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string

    portfolio: Maybe<Portfolio>
  }

  export type Portfolio = {
    __typename?: 'PortfolioGraph'

    id: Guid

    title: string
  }
}

export namespace CreateAgency {
  export type Variables = {
    data: CreateAgencyInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createAgency: Maybe<CreateAgency>
  }

  export type CreateAgency = {
    __typename?: 'AgencyGraph'

    id: Guid
  }
}

export namespace UpdateAgency {
  export type Variables = {
    data: UpdateAgencyInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateAgency: Maybe<UpdateAgency>
  }

  export type UpdateAgency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string

    metadata: Maybe<string>

    portfolio: Maybe<Portfolio>

    rowVersion: string
  }

  export type Portfolio = {
    __typename?: 'PortfolioGraph'

    id: Guid

    title: string
  }
}

export namespace GetAgency {
  export type Variables = {
    id: string
  }

  export type Query = {
    __typename?: 'Query'

    agency: Maybe<Agency>
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string

    metadata: Maybe<string>

    rowVersion: string

    portfolio: Maybe<Portfolio>
  }

  export type Portfolio = {
    __typename?: 'PortfolioGraph'

    id: Guid

    title: string
  }
}

export namespace CreateAgencyMapping {
  export type Variables = {
    data: CreateAgencyMappingInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createAgencyMapping: Maybe<CreateAgencyMapping>
  }

  export type CreateAgencyMapping = {
    __typename?: 'AgencyMappingGraph'

    id: Guid
  }
}

export namespace UpdateAgencyMapping {
  export type Variables = {
    data: UpdateAgencyMappingInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateAgencyMapping: Maybe<UpdateAgencyMapping>
  }

  export type UpdateAgencyMapping = {
    __typename?: 'AgencyMappingGraph'

    id: Guid
  }
}

export namespace GetAgencyMapping {
  export type Variables = {
    id: string
  }

  export type Query = {
    __typename?: 'Query'

    agencyMapping: Maybe<AgencyMapping>
  }

  export type AgencyMapping = {
    __typename?: 'AgencyMappingGraph'

    id: Guid

    emailDomain: string

    rowVersion: string

    agency: Maybe<Agency>

    accessControlGroup: Maybe<AccessControlGroup>
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid
  }

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string
  }
}

export namespace DeleteAgency {
  export type Variables = {
    data: DeleteAgencyInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteAgency: Maybe<boolean>
  }
}

export namespace DeleteAgencyMapping {
  export type Variables = {
    data: DeleteAgencyMappingInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteAgencyMapping: Maybe<boolean>
  }
}

export namespace Agency {
  export type Variables = {
    id: string
  }

  export type Query = {
    __typename?: 'Query'

    agency: Maybe<Agency>
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string

    metadata: Maybe<string>

    rowVersion: string

    portfolio: Maybe<Portfolio>

    agencyMapping: Maybe<(Maybe<AgencyMapping>)[]>
  }

  export type Portfolio = {
    __typename?: 'PortfolioGraph'

    id: Guid

    title: string
  }

  export type AgencyMapping = {
    __typename?: 'AgencyMappingGraph'

    id: Guid

    emailDomain: string

    rowVersion: string

    accessControlGroup: Maybe<AccessControlGroup>
  }

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string
  }
}

export namespace Portfolios {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    portfolios: Maybe<(Maybe<Portfolios>)[]>
  }

  export type Portfolios = {
    __typename?: 'PortfolioGraph'

    id: Guid

    title: string
  }
}

export namespace CreateRoleAccessControlGroup {
  export type Variables = {
    data: CreateRoleAccessControlGroupInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createRoleAccessControlGroup: Maybe<CreateRoleAccessControlGroup>
  }

  export type CreateRoleAccessControlGroup = {
    __typename?: 'RoleAccessControlGroupGraph'

    accessControlGroupId: Guid

    roleId: Guid
  }
}

export namespace DeleteRoleAccessControlGroup {
  export type Variables = {
    data: DeleteRoleAccessControlGroupInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteRoleAccessControlGroup: Maybe<boolean>
  }
}

export namespace AllRoles {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    roles: Maybe<(Maybe<Roles>)[]>
  }

  export type Roles = {
    __typename?: 'RoleGraph'

    id: Guid

    title: string

    description: string

    rowVersion: string
  }
}

export namespace CreateAccessControlGroupUser {
  export type Variables = {
    data: CreateAccessControlGroupUserInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createAccessControlGroupUser: Maybe<CreateAccessControlGroupUser>
  }

  export type CreateAccessControlGroupUser = {
    __typename?: 'AccessControlGroupUserGraph'

    accessControlGroupId: Guid

    userId: Guid
  }
}

export namespace Users {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    users: Maybe<(Maybe<Users>)[]>
  }

  export type Users = {
    __typename?: 'UserGraph'

    id: Guid

    emailAddress: string

    lastLogin: Maybe<DateTimeOffset>

    rowVersion: string
  }
}

export namespace CreateAccessControlGroup {
  export type Variables = {
    data?: Maybe<CreateAccessControlGroupInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createAccessControlGroup: Maybe<CreateAccessControlGroup>
  }

  export type CreateAccessControlGroup = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string

    rowVersion: string
  }
}

export namespace UpdateAccessControlGroup {
  export type Variables = {
    data?: Maybe<UpdateAccessControlGroupInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateAccessControlGroup: Maybe<UpdateAccessControlGroup>
  }

  export type UpdateAccessControlGroup = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string

    rowVersion: string
  }
}

export namespace DeleteAccessControlGroup {
  export type Variables = {
    data?: Maybe<DeleteAccessControlGroupInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteAccessControlGroup: Maybe<boolean>
  }
}

export namespace DeleteAccessControlGroupUser {
  export type Variables = {
    data: DeleteAccessControlGroupUserInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteAccessControlGroupUser: Maybe<boolean>
  }
}

export namespace Group {
  export type Variables = {
    groupId: string
  }

  export type Query = {
    __typename?: 'Query'

    group: Maybe<Group>
  }

  export type Group = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    rowVersion: string

    title: string

    members: Maybe<(Maybe<Members>)[]>

    roles: Maybe<(Maybe<Roles>)[]>
  }

  export type Members = {
    __typename?: 'UserGraph'

    id: Guid

    emailAddress: string

    lastLogin: Maybe<DateTimeOffset>

    rowVersion: string
  }

  export type Roles = {
    __typename?: 'RoleGraph'

    id: Guid

    description: string

    rowVersion: string

    title: string
  }
}

export namespace AllGroups {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    groups: Maybe<(Maybe<Groups>)[]>
  }

  export type Groups = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string

    rowVersion: string
  }
}

export namespace AllGroupsSearch {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    groups: Maybe<(Maybe<Groups>)[]>
  }

  export type Groups = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string

    rowVersion: string
  }
}

export namespace DeleteAccessControl {
  export type Variables = {
    data?: Maybe<DeleteAccessControlInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteAccessControl: Maybe<boolean>
  }
}

export namespace UpdateAccessControl {
  export type Variables = {
    data?: Maybe<UpdateAccessControlInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateAccessControl: Maybe<UpdateAccessControl>
  }

  export type UpdateAccessControl = {
    __typename?: 'AccessControlEntryGraph'

    id: string

    rights: string

    rowVersion: string
  }
}

export namespace CreatePortfolio {
  export type Variables = {
    data: CreatePortfolioInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createPortfolio: Maybe<CreatePortfolio>
  }

  export type CreatePortfolio = {
    __typename?: 'PortfolioGraph'

    id: Guid
  }
}

export namespace UpdatePortfolio {
  export type Variables = {
    data: UpdatePortfolioInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updatePortfolio: Maybe<UpdatePortfolio>
  }

  export type UpdatePortfolio = {
    __typename?: 'PortfolioGraph'

    id: Guid
  }
}

export namespace GetPortfolio {
  export type Variables = {
    id: string
  }

  export type Query = {
    __typename?: 'Query'

    portfolio: Maybe<Portfolio>
  }

  export type Portfolio = {
    __typename?: 'PortfolioGraph'

    id: Guid

    title: string

    metadata: Maybe<string>

    rowVersion: string
  }
}

export namespace DeletePortfolio {
  export type Variables = {
    data: DeletePortfolioInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deletePortfolio: Maybe<boolean>
  }
}

export namespace GetPortfolioDetail {
  export type Variables = {
    id: string
  }

  export type Query = {
    __typename?: 'Query'

    portfolio: Maybe<Portfolio>
  }

  export type Portfolio = {
    __typename?: 'PortfolioGraph'

    id: Guid

    title: string

    metadata: Maybe<string>

    agencies: Maybe<(Maybe<Agencies>)[]>
  }

  export type Agencies = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string
  }
}

export namespace AllPortfoliosSearch {
  export type Variables = {
    title?: Maybe<string>
  }

  export type Query = {
    __typename?: 'Query'

    portfolios: Maybe<(Maybe<Portfolios>)[]>
  }

  export type Portfolios = {
    __typename?: 'PortfolioGraph'

    id: Guid

    title: string
  }
}

export namespace CreateReportAccessControl {
  export type Variables = {
    data?: Maybe<CreateReportAccessControlInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createReportAccessControl: Maybe<CreateReportAccessControl>
  }

  export type CreateReportAccessControl = {
    __typename?: 'AccessControlEntryGraph'

    id: string

    rights: string

    rowVersion: string
  }
}

export namespace Report {
  export type Variables = {
    reportId: string
  }

  export type Query = {
    __typename?: 'Query'

    reports: Maybe<(Maybe<Reports>)[]>
  }

  export type Reports = {
    __typename?: 'ReportGraph'

    id: Guid

    name: string

    notes: Maybe<string>

    programId: Guid

    rowVersion: string

    accessControlList: Maybe<(Maybe<AccessControlList>)[]>

    latestVersion: Maybe<LatestVersion>
  }

  export type AccessControlList = {
    __typename?: 'AccessControlListGraph'

    id: Guid

    accessControlEntries: Maybe<(Maybe<AccessControlEntries>)[]>
  }

  export type AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph'

    id: string

    accessControlGroup: Maybe<AccessControlGroup>

    rights: string

    rowVersion: string
  }

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string
  }

  export type LatestVersion = {
    __typename?: 'ReportVersionGraph'

    id: Guid

    dataDate: Maybe<Date>

    notes: string
  }
}

export namespace CreateReport {
  export type Variables = {
    data?: Maybe<CreateReportInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createReport: Maybe<CreateReport>
  }

  export type CreateReport = {
    __typename?: 'ReportGraph'

    id: Guid

    notes: Maybe<string>

    rowVersion: string
  }
}

export namespace UpdateReport {
  export type Variables = {
    data?: Maybe<UpdateReportInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateReport: Maybe<UpdateReport>
  }

  export type UpdateReport = {
    __typename?: 'ReportGraph'

    id: Guid

    name: string

    notes: Maybe<string>
  }
}

export namespace UpdateReportVersion {
  export type Variables = {
    data?: Maybe<UpdateReportVersionInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateReportVersion: Maybe<UpdateReportVersion>
  }

  export type UpdateReportVersion = {
    __typename?: 'ReportVersionGraph'

    id: Guid
  }
}

export namespace ReportVersionEdit {
  export type Variables = {
    id: string
  }

  export type Query = {
    __typename?: 'Query'

    reportVersion: Maybe<ReportVersion>
  }

  export type ReportVersion = {
    __typename?: 'ReportVersionGraph'

    id: Guid

    dataDate: Maybe<Date>

    notes: string

    rowVersion: string
  }
}

export namespace CreateProgram {
  export type Variables = {
    data: CreateProgramInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createProgram: Maybe<CreateProgram>
  }

  export type CreateProgram = {
    __typename?: 'ProgramGraph'

    id: Guid

    name: string

    agency: Maybe<Agency>

    notes: Maybe<string>

    externalId: Maybe<string>

    rowVersion: string
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid
  }
}

export namespace UpdateProgram {
  export type Variables = {
    data: UpdateProgramInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateProgram: Maybe<UpdateProgram>
  }

  export type UpdateProgram = {
    __typename?: 'ProgramGraph'

    id: Guid

    name: string

    agency: Maybe<Agency>

    notes: Maybe<string>

    externalId: Maybe<string>

    rowVersion: string
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid
  }
}

export namespace DeleteProgram {
  export type Variables = {
    data?: Maybe<DeleteProgramInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteProgram: Maybe<boolean>
  }
}

export namespace DeleteReport {
  export type Variables = {
    data?: Maybe<DeleteReportInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteReport: Maybe<boolean>
  }
}

export namespace CreateProgramAccessControl {
  export type Variables = {
    data?: Maybe<CreateProgramAccessControlInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createProgramAccessControl: Maybe<CreateProgramAccessControl>
  }

  export type CreateProgramAccessControl = {
    __typename?: 'AccessControlEntryGraph'

    id: string

    rights: string

    rowVersion: string
  }
}

export namespace Program {
  export type Variables = {
    programId: string
  }

  export type Query = {
    __typename?: 'Query'

    program: Maybe<Program>
  }

  export type Program = {
    __typename?: 'ProgramGraph'

    id: Guid

    name: string

    notes: Maybe<string>

    externalId: Maybe<string>

    rowVersion: string

    accessControlList: Maybe<(Maybe<AccessControlList>)[]>

    agency: Maybe<Agency>

    reports: Maybe<(Maybe<Reports>)[]>
  }

  export type AccessControlList = {
    __typename?: 'AccessControlListGraph'

    id: Guid

    accessControlEntries: Maybe<(Maybe<AccessControlEntries>)[]>
  }

  export type AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph'

    id: string

    rights: string

    rowVersion: string

    accessControlGroup: Maybe<AccessControlGroup>
  }

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string

    metadata: Maybe<string>
  }

  export type Reports = {
    __typename?: 'ReportGraph'

    id: Guid

    name: string

    notes: Maybe<string>

    accessControlList: Maybe<(Maybe<_AccessControlList>)[]>
  }

  export type _AccessControlList = {
    __typename?: 'AccessControlListGraph'

    accessControlEntries: Maybe<(Maybe<_AccessControlEntries>)[]>
  }

  export type _AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph'

    accessControlGroup: Maybe<_AccessControlGroup>
  }

  export type _AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph'

    title: string
  }
}

export namespace EditProgram {
  export type Variables = {
    programId: string
  }

  export type Query = {
    __typename?: 'Query'

    program: Maybe<Program>
  }

  export type Program = {
    __typename?: 'ProgramGraph'

    id: Guid

    name: string

    notes: Maybe<string>

    externalId: Maybe<string>

    rowVersion: string

    agency: Maybe<Agency>
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string

    metadata: Maybe<string>
  }
}

export namespace AllPortfolios {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    portfolios: Maybe<(Maybe<Portfolios>)[]>
  }

  export type Portfolios = {
    __typename?: 'PortfolioGraph'

    id: Guid

    title: string

    metadata: Maybe<string>

    agencies: Maybe<(Maybe<Agencies>)[]>
  }

  export type Agencies = {
    __typename?: 'AgencyGraph'

    id: Guid

    metadata: Maybe<string>

    title: string
  }
}

export namespace AllPrograms {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    programs: Maybe<(Maybe<Programs>)[]>
  }

  export type Programs = {
    __typename?: 'ProgramGraph'

    id: Guid

    name: string

    agency: Maybe<Agency>
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string
  }
}

export namespace CreateProject {
  export type Variables = {
    data: CreateProjectInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createProject: Maybe<CreateProject>
  }

  export type CreateProject = {
    __typename?: 'ProjectGraph'

    id: Guid

    name: string

    geoJson: Maybe<string>

    notes: Maybe<string>

    externalId: Maybe<string>

    rowVersion: string
  }
}

export namespace UpdateProject {
  export type Variables = {
    data: UpdateProjectInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateProject: Maybe<UpdateProject>
  }

  export type UpdateProject = {
    __typename?: 'ProjectGraph'

    id: Guid

    name: string

    geoJson: Maybe<string>

    notes: Maybe<string>

    externalId: Maybe<string>

    rowVersion: string
  }
}

export namespace DeleteProject {
  export type Variables = {
    data: DeleteProjectInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteProject: Maybe<boolean>
  }
}

export namespace Project {
  export type Variables = {
    id: string
  }

  export type Query = {
    __typename?: 'Query'

    project: Maybe<Project>
  }

  export type Project = {
    __typename?: 'ProjectGraph'

    id: Guid

    name: string

    notes: Maybe<string>

    externalId: Maybe<string>

    status: Maybe<string>

    rowVersion: string

    program: Maybe<Program>
  }

  export type Program = {
    __typename?: 'ProgramGraph'

    id: Guid
  }
}

export namespace AllProjects {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    projects: Maybe<(Maybe<Projects>)[]>
  }

  export type Projects = {
    __typename?: 'ProjectGraph'

    id: Guid

    name: string

    program: Maybe<Program>
  }

  export type Program = {
    __typename?: 'ProgramGraph'

    name: string
  }
}

export namespace AllProjectsSearch {
  export type Variables = {
    name?: Maybe<string>
  }

  export type Query = {
    __typename?: 'Query'

    projects: Maybe<(Maybe<Projects>)[]>
  }

  export type Projects = {
    __typename?: 'ProjectGraph'

    id: Guid

    name: string

    program: Maybe<Program>
  }

  export type Program = {
    __typename?: 'ProgramGraph'

    name: string
  }
}

export namespace AllProgramReports {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    programs: Maybe<(Maybe<Programs>)[]>
  }

  export type Programs = {
    __typename: 'ProgramGraph'

    id: Guid

    name: string

    reports: Maybe<(Maybe<Reports>)[]>
  }

  export type Reports = {
    __typename: 'ReportGraph'

    id: Guid

    name: string

    latestVersion: Maybe<LatestVersion>
  }

  export type LatestVersion = {
    __typename?: 'ReportVersionGraph'

    id: Guid

    notes: string
  }
}

export namespace DeleteRole {
  export type Variables = {
    data?: Maybe<DeleteRoleInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteRole: Maybe<boolean>
  }
}

export namespace CreateRole {
  export type Variables = {
    data?: Maybe<CreateRoleInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createRole: Maybe<CreateRole>
  }

  export type CreateRole = {
    __typename?: 'RoleGraph'

    id: Guid

    title: string

    rowVersion: string
  }
}

export namespace UpdateRole {
  export type Variables = {
    data?: Maybe<UpdateRoleInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateRole: Maybe<UpdateRole>
  }

  export type UpdateRole = {
    __typename?: 'RoleGraph'

    id: Guid

    title: string

    description: string

    rowVersion: string
  }
}

export namespace Role {
  export type Variables = {
    roleId: string
  }

  export type Query = {
    __typename?: 'Query'

    role: Maybe<Role>
  }

  export type Role = {
    __typename?: 'RoleGraph'

    id: Guid

    title: string

    description: string

    rowVersion: string

    adminLogin: boolean

    allAgencyModifier: boolean

    createAgency: boolean

    createProgram: boolean

    createProject: boolean

    createReport: boolean

    createStatistic: boolean

    deleteAgency: boolean

    deleteProgram: boolean

    deleteProject: boolean

    deleteReport: boolean

    deleteStatistic: boolean

    manageApiKeys: boolean

    manageAccessControls: boolean

    manageGroups: boolean

    updateElectorateAdvice: boolean
  }
}

export namespace RolesSearch {
  export type Variables = {
    title?: Maybe<string>
  }

  export type Query = {
    __typename?: 'Query'

    roles: Maybe<(Maybe<Roles>)[]>
  }

  export type Roles = {
    __typename?: 'RoleGraph'

    id: Guid

    title: string

    description: string
  }
}

export namespace CreateStatisticReport {
  export type Variables = {
    data: CreateStatisticReportInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createStatisticReport: Maybe<CreateStatisticReport>
  }

  export type CreateStatisticReport = {
    __typename?: 'StatisticReportGraph'

    id: Guid

    name: string

    notes: Maybe<string>

    statisticId: Guid
  }
}

export namespace UpdateStatisticReport {
  export type Variables = {
    data?: Maybe<UpdateStatisticReportInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateStatisticReport: Maybe<UpdateStatisticReport>
  }

  export type UpdateStatisticReport = {
    __typename?: 'StatisticReportGraph'

    id: Guid

    name: string

    notes: Maybe<string>

    statisticId: Guid
  }
}

export namespace StatisticReportEdit {
  export type Variables = {
    reportId: string
  }

  export type Query = {
    __typename?: 'Query'

    statisticReport: Maybe<StatisticReport>
  }

  export type StatisticReport = {
    __typename?: 'StatisticReportGraph'

    id: Guid

    name: string

    notes: Maybe<string>

    rowVersion: string

    statisticId: Guid
  }
}

export namespace UpdateStatisticReportVersion {
  export type Variables = {
    data?: Maybe<UpdateStatisticReportVersionInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateStatisticReportVersion: Maybe<UpdateStatisticReportVersion>
  }

  export type UpdateStatisticReportVersion = {
    __typename?: 'StatisticReportVersionGraph'

    id: Guid
  }
}

export namespace StatisticReportVersionEdit {
  export type Variables = {
    id: string
  }

  export type Query = {
    __typename?: 'Query'

    statisticReportVersion: Maybe<StatisticReportVersion>
  }

  export type StatisticReportVersion = {
    __typename?: 'StatisticReportVersionGraph'

    id: Guid

    dataDate: Maybe<Date>

    notes: Maybe<string>

    rowVersion: string
  }
}

export namespace CreateStatisticReportAccessControl {
  export type Variables = {
    data?: Maybe<CreateStatisticReportAccessControlInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createStatisticReportAccessControl: Maybe<
      CreateStatisticReportAccessControl
    >
  }

  export type CreateStatisticReportAccessControl = {
    __typename?: 'AccessControlEntryGraph'

    id: string

    rights: string

    rowVersion: string
  }
}

export namespace StatisticReportDetail {
  export type Variables = {
    reportId: string
  }

  export type Query = {
    __typename?: 'Query'

    statisticReport: Maybe<StatisticReport>
  }

  export type StatisticReport = {
    __typename?: 'StatisticReportGraph'

    id: Guid

    name: string

    notes: Maybe<string>

    rowVersion: string

    statisticId: Guid

    accessControlList: Maybe<(Maybe<AccessControlList>)[]>

    latestVersion: Maybe<LatestVersion>
  }

  export type AccessControlList = {
    __typename?: 'AccessControlListGraph'

    id: Guid

    accessControlEntries: Maybe<(Maybe<AccessControlEntries>)[]>
  }

  export type AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph'

    id: string

    accessControlGroup: Maybe<AccessControlGroup>

    rights: string

    rowVersion: string
  }

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string
  }

  export type LatestVersion = {
    __typename?: 'StatisticReportVersionGraph'

    id: Guid

    dataDate: Maybe<Date>

    notes: Maybe<string>
  }
}

export namespace CreateStatistic {
  export type Variables = {
    data: CreateStatisticInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createStatistic: Maybe<CreateStatistic>
  }

  export type CreateStatistic = {
    __typename?: 'StatisticGraph'

    id: Guid

    name: string

    agency: Maybe<Agency>

    externalId: Maybe<string>

    rowVersion: string
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid
  }
}

export namespace UpdateStatistic {
  export type Variables = {
    data: UpdateStatisticInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateStatistic: Maybe<UpdateStatistic>
  }

  export type UpdateStatistic = {
    __typename?: 'StatisticGraph'

    id: Guid

    name: string

    agency: Maybe<Agency>

    externalId: Maybe<string>

    rowVersion: string
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid
  }
}

export namespace DeleteStatisticReport {
  export type Variables = {
    data: DeleteStatisticReportInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteStatisticReport: Maybe<boolean>
  }
}

export namespace DeleteStatistic {
  export type Variables = {
    data: DeleteStatisticInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteStatistic: Maybe<boolean>
  }
}

export namespace CreateStatisticAccessControl {
  export type Variables = {
    data?: Maybe<CreateStatisticAccessControlInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createStatisticAccessControl: Maybe<CreateStatisticAccessControl>
  }

  export type CreateStatisticAccessControl = {
    __typename?: 'AccessControlEntryGraph'

    id: string

    rights: string

    rowVersion: string
  }
}

export namespace AllStatistics {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    statistics: Maybe<(Maybe<Statistics>)[]>
  }

  export type Statistics = {
    __typename?: 'StatisticGraph'

    id: Guid

    name: string

    agency: Maybe<Agency>

    statisticReports: Maybe<(Maybe<StatisticReports>)[]>
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string
  }

  export type StatisticReports = {
    __typename?: 'StatisticReportGraph'

    id: Guid

    name: string

    notes: Maybe<string>
  }
}

export namespace Statistic {
  export type Variables = {
    statisticId: string
  }

  export type Query = {
    __typename?: 'Query'

    statistic: Maybe<Statistic>
  }

  export type Statistic = {
    __typename?: 'StatisticGraph'

    id: Guid

    agency: Maybe<Agency>

    accessControlList: Maybe<(Maybe<AccessControlList>)[]>

    name: string

    externalId: Maybe<string>

    rowVersion: string

    statisticReports: Maybe<(Maybe<StatisticReports>)[]>
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string
  }

  export type AccessControlList = {
    __typename?: 'AccessControlListGraph'

    id: Guid

    accessControlEntries: Maybe<(Maybe<AccessControlEntries>)[]>
  }

  export type AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph'

    id: string

    rights: string

    rowVersion: string

    accessControlGroup: Maybe<AccessControlGroup>
  }

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph'

    id: Guid

    title: string
  }

  export type StatisticReports = {
    __typename?: 'StatisticReportGraph'

    id: Guid

    name: string

    notes: Maybe<string>
  }
}

export namespace AllAgencies {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    agencies: Maybe<(Maybe<Agencies>)[]>
  }

  export type Agencies = {
    __typename?: 'AgencyGraph'

    id: Guid

    metadata: Maybe<string>

    title: string
  }
}

export namespace AllStatisticsSearch {
  export type Variables = {
    name?: Maybe<string>
  }

  export type Query = {
    __typename?: 'Query'

    statistics: Maybe<(Maybe<Statistics>)[]>
  }

  export type Statistics = {
    __typename?: 'StatisticGraph'

    id: Guid

    name: string

    agency: Maybe<Agency>
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string
  }
}

export namespace StatisticAndStatisticReports {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    statistics: Maybe<(Maybe<Statistics>)[]>
  }

  export type Statistics = {
    __typename?: 'StatisticGraph'

    id: Guid

    name: string

    statisticReports: Maybe<(Maybe<StatisticReports>)[]>
  }

  export type StatisticReports = {
    __typename?: 'StatisticReportGraph'

    id: Guid

    name: string

    latestVersion: Maybe<LatestVersion>
  }

  export type LatestVersion = {
    __typename?: 'StatisticReportVersionGraph'

    id: Guid

    notes: Maybe<string>
  }
}

export namespace CreateUser {
  export type Variables = {
    data?: Maybe<CreateUserInputGraph>
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createUser: Maybe<CreateUser>
  }

  export type CreateUser = {
    __typename?: 'UserGraph'

    id: Guid
  }
}

export namespace UpdateUser {
  export type Variables = {
    data: UpdateUserInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    updateUser: Maybe<UpdateUser>
  }

  export type UpdateUser = {
    __typename?: 'UserGraph'

    id: Guid

    emailAddress: string
  }
}

export namespace GetUser {
  export type Variables = {
    id: string
  }

  export type Query = {
    __typename?: 'Query'

    user: Maybe<User>
  }

  export type User = {
    __typename?: 'UserGraph'

    emailAddress: string

    agency: Maybe<Agency>

    rowVersion: string
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid
  }
}

export namespace DeleteUser {
  export type Variables = {
    data: DeleteUserInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteUser: Maybe<boolean>
  }
}

export namespace CreateApiKey {
  export type Variables = {
    data: CreateApiKeyInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    createApiKey: Maybe<CreateApiKey>
  }

  export type CreateApiKey = {
    __typename?: 'ApiKeyGraph'

    id: Guid
  }
}

export namespace DeleteApiKey {
  export type Variables = {
    data: DeleteApiKeyInputGraph
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteApiKey: Maybe<boolean>
  }
}

export namespace User {
  export type Variables = {
    userId: string
  }

  export type Query = {
    __typename?: 'Query'

    user: Maybe<User>
  }

  export type User = {
    __typename?: 'UserGraph'

    id: Guid

    emailAddress: string

    lastLogin: Maybe<DateTimeOffset>

    agency: Maybe<Agency>

    apiKeys: Maybe<(Maybe<ApiKeys>)[]>

    programAccess: Maybe<(Maybe<ProgramAccess>)[]>

    reportAccess: Maybe<(Maybe<ReportAccess>)[]>

    statisticAccess: Maybe<(Maybe<StatisticAccess>)[]>

    statisticReportAccess: Maybe<(Maybe<StatisticReportAccess>)[]>
  }

  export type Agency = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string
  }

  export type ApiKeys = {
    __typename?: 'ApiKeyGraph'

    id: Guid

    key: string

    created: DateTimeOffset

    rowVersion: string

    disable: boolean
  }

  export type ProgramAccess = {
    __typename?: 'ResultantAccessGraph'

    entityId: Guid

    name: string

    groupId: Maybe<Guid>

    groupName: Maybe<string>

    accessRights: string
  }

  export type ReportAccess = {
    __typename?: 'ResultantAccessGraph'

    entityId: Guid

    groupName: Maybe<string>

    name: string

    parentName: Maybe<string>

    hasAccessToParent: Maybe<boolean>
  }

  export type StatisticAccess = {
    __typename?: 'ResultantAccessGraph'

    entityId: Guid

    name: string

    groupName: Maybe<string>

    hasAccessToParent: Maybe<boolean>

    parentName: Maybe<string>
  }

  export type StatisticReportAccess = {
    __typename?: 'ResultantAccessGraph'

    entityId: Guid

    name: string

    parentName: Maybe<string>

    hasAccessToParent: Maybe<boolean>

    groupName: Maybe<string>

    accessRights: string
  }
}

export namespace SelectAgencies {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    agencies: Maybe<(Maybe<Agencies>)[]>
  }

  export type Agencies = {
    __typename?: 'AgencyGraph'

    id: Guid

    title: string
  }
}

export namespace AllUsersSearch {
  export type Variables = {
    emailAddress?: Maybe<string>
  }

  export type Query = {
    __typename?: 'Query'

    users: Maybe<(Maybe<Users>)[]>
  }

  export type Users = {
    __typename?: 'UserGraph'

    id: Guid

    emailAddress: string

    lastLogin: Maybe<DateTimeOffset>

    rowVersion: string
  }
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from '@angular/core'
import * as Apollo from 'apollo-angular'

import gql from 'graphql-tag'

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: 'root'
})
export class AllAgenciesSearchGQL extends Apollo.Query<
  AllAgenciesSearch.Query,
  AllAgenciesSearch.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class CreateAgencyGQL extends Apollo.Mutation<
  CreateAgency.Mutation,
  CreateAgency.Variables
> {
  document: any = gql`
    mutation createAgency($data: CreateAgencyInputGraph!) {
      createAgency(input: $data) {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateAgencyGQL extends Apollo.Mutation<
  UpdateAgency.Mutation,
  UpdateAgency.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class GetAgencyGQL extends Apollo.Query<
  GetAgency.Query,
  GetAgency.Variables
> {
  document: any = gql`
    query getAgency($id: String!) {
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
}
@Injectable({
  providedIn: 'root'
})
export class CreateAgencyMappingGQL extends Apollo.Mutation<
  CreateAgencyMapping.Mutation,
  CreateAgencyMapping.Variables
> {
  document: any = gql`
    mutation createAgencyMapping($data: CreateAgencyMappingInputGraph!) {
      createAgencyMapping(input: $data) {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateAgencyMappingGQL extends Apollo.Mutation<
  UpdateAgencyMapping.Mutation,
  UpdateAgencyMapping.Variables
> {
  document: any = gql`
    mutation updateAgencyMapping($data: UpdateAgencyMappingInputGraph!) {
      updateAgencyMapping(input: $data) {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class GetAgencyMappingGQL extends Apollo.Query<
  GetAgencyMapping.Query,
  GetAgencyMapping.Variables
> {
  document: any = gql`
    query getAgencyMapping($id: String!) {
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
}
@Injectable({
  providedIn: 'root'
})
export class DeleteAgencyGQL extends Apollo.Mutation<
  DeleteAgency.Mutation,
  DeleteAgency.Variables
> {
  document: any = gql`
    mutation deleteAgency($data: DeleteAgencyInputGraph!) {
      deleteAgency(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteAgencyMappingGQL extends Apollo.Mutation<
  DeleteAgencyMapping.Mutation,
  DeleteAgencyMapping.Variables
> {
  document: any = gql`
    mutation deleteAgencyMapping($data: DeleteAgencyMappingInputGraph!) {
      deleteAgencyMapping(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class AgencyGQL extends Apollo.Query<Agency.Query, Agency.Variables> {
  document: any = gql`
    query agency($id: String!) {
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
}
@Injectable({
  providedIn: 'root'
})
export class PortfoliosGQL extends Apollo.Query<
  Portfolios.Query,
  Portfolios.Variables
> {
  document: any = gql`
    query portfolios {
      portfolios {
        id
        title
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateRoleAccessControlGroupGQL extends Apollo.Mutation<
  CreateRoleAccessControlGroup.Mutation,
  CreateRoleAccessControlGroup.Variables
> {
  document: any = gql`
    mutation createRoleAccessControlGroup(
      $data: CreateRoleAccessControlGroupInputGraph!
    ) {
      createRoleAccessControlGroup(input: $data) {
        accessControlGroupId
        roleId
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteRoleAccessControlGroupGQL extends Apollo.Mutation<
  DeleteRoleAccessControlGroup.Mutation,
  DeleteRoleAccessControlGroup.Variables
> {
  document: any = gql`
    mutation deleteRoleAccessControlGroup(
      $data: DeleteRoleAccessControlGroupInputGraph!
    ) {
      deleteRoleAccessControlGroup(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class AllRolesGQL extends Apollo.Query<
  AllRoles.Query,
  AllRoles.Variables
> {
  document: any = gql`
    query allRoles {
      roles {
        id
        title
        description
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateAccessControlGroupUserGQL extends Apollo.Mutation<
  CreateAccessControlGroupUser.Mutation,
  CreateAccessControlGroupUser.Variables
> {
  document: any = gql`
    mutation createAccessControlGroupUser(
      $data: CreateAccessControlGroupUserInputGraph!
    ) {
      createAccessControlGroupUser(input: $data) {
        accessControlGroupId
        userId
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UsersGQL extends Apollo.Query<Users.Query, Users.Variables> {
  document: any = gql`
    query users {
      users(orderBy: { path: "emailAddress" }) {
        id
        emailAddress
        lastLogin
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateAccessControlGroupGQL extends Apollo.Mutation<
  CreateAccessControlGroup.Mutation,
  CreateAccessControlGroup.Variables
> {
  document: any = gql`
    mutation createAccessControlGroup(
      $data: CreateAccessControlGroupInputGraph
    ) {
      createAccessControlGroup(input: $data) {
        id
        title
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateAccessControlGroupGQL extends Apollo.Mutation<
  UpdateAccessControlGroup.Mutation,
  UpdateAccessControlGroup.Variables
> {
  document: any = gql`
    mutation updateAccessControlGroup(
      $data: UpdateAccessControlGroupInputGraph
    ) {
      updateAccessControlGroup(input: $data) {
        id
        title
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteAccessControlGroupGQL extends Apollo.Mutation<
  DeleteAccessControlGroup.Mutation,
  DeleteAccessControlGroup.Variables
> {
  document: any = gql`
    mutation deleteAccessControlGroup(
      $data: DeleteAccessControlGroupInputGraph
    ) {
      deleteAccessControlGroup(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteAccessControlGroupUserGQL extends Apollo.Mutation<
  DeleteAccessControlGroupUser.Mutation,
  DeleteAccessControlGroupUser.Variables
> {
  document: any = gql`
    mutation deleteAccessControlGroupUser(
      $data: DeleteAccessControlGroupUserInputGraph!
    ) {
      deleteAccessControlGroupUser(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class GroupGQL extends Apollo.Query<Group.Query, Group.Variables> {
  document: any = gql`
    query group($groupId: String!) {
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
}
@Injectable({
  providedIn: 'root'
})
export class AllGroupsGQL extends Apollo.Query<
  AllGroups.Query,
  AllGroups.Variables
> {
  document: any = gql`
    query allGroups {
      groups(orderBy: { path: "title" }) {
        id
        title
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class AllGroupsSearchGQL extends Apollo.Query<
  AllGroupsSearch.Query,
  AllGroupsSearch.Variables
> {
  document: any = gql`
    query allGroupsSearch {
      groups(orderBy: { path: "title" }) {
        id
        title
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteAccessControlGQL extends Apollo.Mutation<
  DeleteAccessControl.Mutation,
  DeleteAccessControl.Variables
> {
  document: any = gql`
    mutation deleteAccessControl($data: DeleteAccessControlInputGraph) {
      deleteAccessControl(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateAccessControlGQL extends Apollo.Mutation<
  UpdateAccessControl.Mutation,
  UpdateAccessControl.Variables
> {
  document: any = gql`
    mutation updateAccessControl($data: UpdateAccessControlInputGraph) {
      updateAccessControl(input: $data) {
        id
        rights
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreatePortfolioGQL extends Apollo.Mutation<
  CreatePortfolio.Mutation,
  CreatePortfolio.Variables
> {
  document: any = gql`
    mutation createPortfolio($data: CreatePortfolioInputGraph!) {
      createPortfolio(input: $data) {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdatePortfolioGQL extends Apollo.Mutation<
  UpdatePortfolio.Mutation,
  UpdatePortfolio.Variables
> {
  document: any = gql`
    mutation updatePortfolio($data: UpdatePortfolioInputGraph!) {
      updatePortfolio(input: $data) {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class GetPortfolioGQL extends Apollo.Query<
  GetPortfolio.Query,
  GetPortfolio.Variables
> {
  document: any = gql`
    query getPortfolio($id: String!) {
      portfolio(id: $id) {
        id
        title
        metadata
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeletePortfolioGQL extends Apollo.Mutation<
  DeletePortfolio.Mutation,
  DeletePortfolio.Variables
> {
  document: any = gql`
    mutation deletePortfolio($data: DeletePortfolioInputGraph!) {
      deletePortfolio(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class GetPortfolioDetailGQL extends Apollo.Query<
  GetPortfolioDetail.Query,
  GetPortfolioDetail.Variables
> {
  document: any = gql`
    query getPortfolioDetail($id: String!) {
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
}
@Injectable({
  providedIn: 'root'
})
export class AllPortfoliosSearchGQL extends Apollo.Query<
  AllPortfoliosSearch.Query,
  AllPortfoliosSearch.Variables
> {
  document: any = gql`
    query allPortfoliosSearch($title: String) {
      portfolios(
        where: { path: "title", comparison: contains, value: [$title] }
        orderBy: { path: "title" }
      ) {
        id
        title
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateReportAccessControlGQL extends Apollo.Mutation<
  CreateReportAccessControl.Mutation,
  CreateReportAccessControl.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class ReportGQL extends Apollo.Query<Report.Query, Report.Variables> {
  document: any = gql`
    query report($reportId: String!) {
      reports(id: $reportId) {
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
}
@Injectable({
  providedIn: 'root'
})
export class CreateReportGQL extends Apollo.Mutation<
  CreateReport.Mutation,
  CreateReport.Variables
> {
  document: any = gql`
    mutation createReport($data: CreateReportInputGraph) {
      createReport(input: $data) {
        id
        notes
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateReportGQL extends Apollo.Mutation<
  UpdateReport.Mutation,
  UpdateReport.Variables
> {
  document: any = gql`
    mutation updateReport($data: UpdateReportInputGraph) {
      updateReport(input: $data) {
        id
        name
        notes
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateReportVersionGQL extends Apollo.Mutation<
  UpdateReportVersion.Mutation,
  UpdateReportVersion.Variables
> {
  document: any = gql`
    mutation updateReportVersion($data: UpdateReportVersionInputGraph) {
      updateReportVersion(input: $data) {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class ReportVersionEditGQL extends Apollo.Query<
  ReportVersionEdit.Query,
  ReportVersionEdit.Variables
> {
  document: any = gql`
    query reportVersionEdit($id: String!) {
      reportVersion(id: $id) {
        id
        dataDate
        notes
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateProgramGQL extends Apollo.Mutation<
  CreateProgram.Mutation,
  CreateProgram.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class UpdateProgramGQL extends Apollo.Mutation<
  UpdateProgram.Mutation,
  UpdateProgram.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class DeleteProgramGQL extends Apollo.Mutation<
  DeleteProgram.Mutation,
  DeleteProgram.Variables
> {
  document: any = gql`
    mutation deleteProgram($data: DeleteProgramInputGraph) {
      deleteProgram(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteReportGQL extends Apollo.Mutation<
  DeleteReport.Mutation,
  DeleteReport.Variables
> {
  document: any = gql`
    mutation deleteReport($data: DeleteReportInputGraph) {
      deleteReport(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateProgramAccessControlGQL extends Apollo.Mutation<
  CreateProgramAccessControl.Mutation,
  CreateProgramAccessControl.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class ProgramGQL extends Apollo.Query<Program.Query, Program.Variables> {
  document: any = gql`
    query program($programId: String!) {
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
}
@Injectable({
  providedIn: 'root'
})
export class EditProgramGQL extends Apollo.Query<
  EditProgram.Query,
  EditProgram.Variables
> {
  document: any = gql`
    query editProgram($programId: String!) {
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
}
@Injectable({
  providedIn: 'root'
})
export class AllPortfoliosGQL extends Apollo.Query<
  AllPortfolios.Query,
  AllPortfolios.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class AllProgramsGQL extends Apollo.Query<
  AllPrograms.Query,
  AllPrograms.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class CreateProjectGQL extends Apollo.Mutation<
  CreateProject.Mutation,
  CreateProject.Variables
> {
  document: any = gql`
    mutation createProject($data: CreateProjectInputGraph!) {
      createProject(input: $data) {
        id
        name
        geoJson
        notes
        externalId
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateProjectGQL extends Apollo.Mutation<
  UpdateProject.Mutation,
  UpdateProject.Variables
> {
  document: any = gql`
    mutation updateProject($data: UpdateProjectInputGraph!) {
      updateProject(input: $data) {
        id
        name
        geoJson
        notes
        externalId
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteProjectGQL extends Apollo.Mutation<
  DeleteProject.Mutation,
  DeleteProject.Variables
> {
  document: any = gql`
    mutation deleteProject($data: DeleteProjectInputGraph!) {
      deleteProject(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class ProjectGQL extends Apollo.Query<Project.Query, Project.Variables> {
  document: any = gql`
    query project($id: String!) {
      project(id: $id) {
        id
        name
        notes
        externalId
        status
        rowVersion
        program {
          id
        }
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class AllProjectsGQL extends Apollo.Query<
  AllProjects.Query,
  AllProjects.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class AllProjectsSearchGQL extends Apollo.Query<
  AllProjectsSearch.Query,
  AllProjectsSearch.Variables
> {
  document: any = gql`
    query allProjectsSearch($name: String) {
      projects(
        where: { path: "name", comparison: contains, value: [$name] }
        orderBy: { path: "name" }
      ) {
        id
        name
        program {
          name
        }
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class AllProgramReportsGQL extends Apollo.Query<
  AllProgramReports.Query,
  AllProgramReports.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class DeleteRoleGQL extends Apollo.Mutation<
  DeleteRole.Mutation,
  DeleteRole.Variables
> {
  document: any = gql`
    mutation deleteRole($data: DeleteRoleInputGraph) {
      deleteRole(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateRoleGQL extends Apollo.Mutation<
  CreateRole.Mutation,
  CreateRole.Variables
> {
  document: any = gql`
    mutation createRole($data: CreateRoleInputGraph) {
      createRole(input: $data) {
        id
        title
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateRoleGQL extends Apollo.Mutation<
  UpdateRole.Mutation,
  UpdateRole.Variables
> {
  document: any = gql`
    mutation updateRole($data: UpdateRoleInputGraph) {
      updateRole(input: $data) {
        id
        title
        description
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class RoleGQL extends Apollo.Query<Role.Query, Role.Variables> {
  document: any = gql`
    query role($roleId: String!) {
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
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class RolesSearchGQL extends Apollo.Query<
  RolesSearch.Query,
  RolesSearch.Variables
> {
  document: any = gql`
    query rolesSearch($title: String) {
      roles(
        where: { path: "title", comparison: contains, value: [$title] }
        orderBy: { path: "title" }
      ) {
        id
        title
        description
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateStatisticReportGQL extends Apollo.Mutation<
  CreateStatisticReport.Mutation,
  CreateStatisticReport.Variables
> {
  document: any = gql`
    mutation createStatisticReport($data: CreateStatisticReportInputGraph!) {
      createStatisticReport(input: $data) {
        id
        name
        notes
        statisticId
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateStatisticReportGQL extends Apollo.Mutation<
  UpdateStatisticReport.Mutation,
  UpdateStatisticReport.Variables
> {
  document: any = gql`
    mutation updateStatisticReport($data: UpdateStatisticReportInputGraph) {
      updateStatisticReport(input: $data) {
        id
        name
        notes
        statisticId
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class StatisticReportEditGQL extends Apollo.Query<
  StatisticReportEdit.Query,
  StatisticReportEdit.Variables
> {
  document: any = gql`
    query statisticReportEdit($reportId: String!) {
      statisticReport(id: $reportId) {
        id
        name
        notes
        rowVersion
        statisticId
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateStatisticReportVersionGQL extends Apollo.Mutation<
  UpdateStatisticReportVersion.Mutation,
  UpdateStatisticReportVersion.Variables
> {
  document: any = gql`
    mutation updateStatisticReportVersion(
      $data: UpdateStatisticReportVersionInputGraph
    ) {
      updateStatisticReportVersion(input: $data) {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class StatisticReportVersionEditGQL extends Apollo.Query<
  StatisticReportVersionEdit.Query,
  StatisticReportVersionEdit.Variables
> {
  document: any = gql`
    query statisticReportVersionEdit($id: String!) {
      statisticReportVersion(id: $id) {
        id
        dataDate
        notes
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateStatisticReportAccessControlGQL extends Apollo.Mutation<
  CreateStatisticReportAccessControl.Mutation,
  CreateStatisticReportAccessControl.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class StatisticReportDetailGQL extends Apollo.Query<
  StatisticReportDetail.Query,
  StatisticReportDetail.Variables
> {
  document: any = gql`
    query statisticReportDetail($reportId: String!) {
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
}
@Injectable({
  providedIn: 'root'
})
export class CreateStatisticGQL extends Apollo.Mutation<
  CreateStatistic.Mutation,
  CreateStatistic.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class UpdateStatisticGQL extends Apollo.Mutation<
  UpdateStatistic.Mutation,
  UpdateStatistic.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class DeleteStatisticReportGQL extends Apollo.Mutation<
  DeleteStatisticReport.Mutation,
  DeleteStatisticReport.Variables
> {
  document: any = gql`
    mutation deleteStatisticReport($data: DeleteStatisticReportInputGraph!) {
      deleteStatisticReport(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteStatisticGQL extends Apollo.Mutation<
  DeleteStatistic.Mutation,
  DeleteStatistic.Variables
> {
  document: any = gql`
    mutation deleteStatistic($data: DeleteStatisticInputGraph!) {
      deleteStatistic(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateStatisticAccessControlGQL extends Apollo.Mutation<
  CreateStatisticAccessControl.Mutation,
  CreateStatisticAccessControl.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class AllStatisticsGQL extends Apollo.Query<
  AllStatistics.Query,
  AllStatistics.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class StatisticGQL extends Apollo.Query<
  Statistic.Query,
  Statistic.Variables
> {
  document: any = gql`
    query statistic($statisticId: String!) {
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
}
@Injectable({
  providedIn: 'root'
})
export class AllAgenciesGQL extends Apollo.Query<
  AllAgencies.Query,
  AllAgencies.Variables
> {
  document: any = gql`
    query allAgencies {
      agencies(orderBy: { path: "title" }) {
        id
        metadata
        title
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class AllStatisticsSearchGQL extends Apollo.Query<
  AllStatisticsSearch.Query,
  AllStatisticsSearch.Variables
> {
  document: any = gql`
    query allStatisticsSearch($name: String) {
      statistics(
        where: { path: "name", comparison: contains, value: [$name] }
        orderBy: { path: "name" }
      ) {
        id
        name
        agency {
          id
          title
        }
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class StatisticAndStatisticReportsGQL extends Apollo.Query<
  StatisticAndStatisticReports.Query,
  StatisticAndStatisticReports.Variables
> {
  document: any = gql`
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
}
@Injectable({
  providedIn: 'root'
})
export class CreateUserGQL extends Apollo.Mutation<
  CreateUser.Mutation,
  CreateUser.Variables
> {
  document: any = gql`
    mutation createUser($data: CreateUserInputGraph) {
      createUser(input: $data) {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UpdateUserGQL extends Apollo.Mutation<
  UpdateUser.Mutation,
  UpdateUser.Variables
> {
  document: any = gql`
    mutation updateUser($data: UpdateUserInputGraph!) {
      updateUser(input: $data) {
        id
        emailAddress
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class GetUserGQL extends Apollo.Query<GetUser.Query, GetUser.Variables> {
  document: any = gql`
    query getUser($id: String!) {
      user(id: $id) {
        emailAddress
        agency {
          id
        }
        rowVersion
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteUserGQL extends Apollo.Mutation<
  DeleteUser.Mutation,
  DeleteUser.Variables
> {
  document: any = gql`
    mutation deleteUser($data: DeleteUserInputGraph!) {
      deleteUser(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CreateApiKeyGQL extends Apollo.Mutation<
  CreateApiKey.Mutation,
  CreateApiKey.Variables
> {
  document: any = gql`
    mutation createApiKey($data: CreateApiKeyInputGraph!) {
      createApiKey(input: $data) {
        id
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteApiKeyGQL extends Apollo.Mutation<
  DeleteApiKey.Mutation,
  DeleteApiKey.Variables
> {
  document: any = gql`
    mutation deleteApiKey($data: DeleteApiKeyInputGraph!) {
      deleteApiKey(input: $data)
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class UserGQL extends Apollo.Query<User.Query, User.Variables> {
  document: any = gql`
    query user($userId: String!) {
      user(id: $userId) {
        id
        emailAddress
        lastLogin
        agency {
          id
          title
        }
        apiKeys(orderBy: { path: "created" }) {
          id
          key
          created
          rowVersion
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
}
@Injectable({
  providedIn: 'root'
})
export class SelectAgenciesGQL extends Apollo.Query<
  SelectAgencies.Query,
  SelectAgencies.Variables
> {
  document: any = gql`
    query selectAgencies {
      agencies(orderBy: { path: "title" }) {
        id
        title
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class AllUsersSearchGQL extends Apollo.Query<
  AllUsersSearch.Query,
  AllUsersSearch.Variables
> {
  document: any = gql`
    query allUsersSearch($emailAddress: String) {
      users(
        where: {
          path: "emailAddress"
          comparison: contains
          value: [$emailAddress]
        }
        orderBy: { path: "emailAddress" }
      ) {
        id
        emailAddress
        lastLogin
        rowVersion
      }
    }
  `
}

// ====================================================
// END: Apollo Angular template
// ====================================================
