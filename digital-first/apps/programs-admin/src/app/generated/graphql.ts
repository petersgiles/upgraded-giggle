export interface OrderByGraph {
  path: string;

  descending?: boolean | null;
}

export interface WhereExpressionGraph {
  path: string;

  comparison: ComparisonGraph;

  case?: StringComparison | null;

  value?: (string | null)[] | null;
}

export interface CreateAccessControlGroupInputGraph {
  title: string;
}

export interface CreateAccessControlGroupUserInputGraph {
  accessControlGroupId: Guid;

  userId: Guid;
}

export interface CreateAgencyInputGraph {
  title: string;

  metadata?: string | null;

  portfolioId: Guid;
}

export interface CreateDisplayGroupInputGraph {
  title: string;

  sortOrder: UInt32;

  metadata?: string | null;

  parentId?: Guid | null;
}

export interface CreateDisplayGroupProgramInputGraph {
  sortOrder: UInt32;

  metadata: string;

  programId: Guid;

  displayGroupId: Guid;
}

export interface CreateDisplayGroupStatisticInputGraph {
  sortOrder: UInt32;

  metadata: string;

  statisticId: Guid;

  displayGroupId: Guid;
}

export interface CreatePortfolioInputGraph {
  title: string;

  metadata?: string | null;
}

export interface CreateProgramInputGraph {
  name: string;

  agencyId: Guid;

  externalId?: string | null;

  notes?: string | null;

  commitments?: string | null;
}

export interface CreateProgramAccessControlInputGraph {
  programId: Guid;

  accessControlGroupId: Guid;

  accessRights?: AccessRights | null;
}

export interface CreateReportInputGraph {
  name: string;

  programId: Guid;

  notes?: string | null;
}

export interface CreateReportAccessControlInputGraph {
  reportId: Guid;

  accessControlGroupId: Guid;

  accessRights?: AccessRights | null;
}

export interface CreateStatisticInputGraph {
  name: string;

  agencyId: Guid;

  externalId?: string | null;
}

export interface CreateStatisticAccessControlInputGraph {
  statisticId: Guid;

  accessControlGroupId: Guid;

  accessRights?: AccessRights | null;
}

export interface CreateStatisticReportInputGraph {
  name: string;

  notes?: string | null;

  statisticId: Guid;
}

export interface CreateStatisticReportAccessControlInputGraph {
  statisticReportId: Guid;

  accessControlGroupId: Guid;

  accessRights?: AccessRights | null;
}

export interface DeleteAccessControlGroupInputGraph {
  id: Guid;
}

export interface DeleteAccessControlGroupUserInputGraph {
  accessControlGroupId: Guid;

  userId: Guid;
}

export interface DeleteAgencyInputGraph {
  id: Guid;
}

export interface DeleteDisplayGroupInputGraph {
  id: Guid;
}

export interface DeleteDisplayGroupProgramInputGraph {
  programId: Guid;

  displayGroupId: Guid;
}

export interface DeleteDisplayGroupStatisticInputGraph {
  statisticId: Guid;

  displayGroupId: Guid;
}

export interface DeletePortfolioInputGraph {
  id: Guid;
}

export interface DeleteProgramInputGraph {
  id: Guid;
}

export interface DeleteProgramAccessControlInputGraph {
  accessControlListId: Guid;

  accessControlGroupId: Guid;
}

export interface DeleteReportInputGraph {
  id: Guid;
}

export interface DeleteReportAccessControlInputGraph {
  reportId: Guid;

  accessControlGroupId: Guid;
}

export interface DeleteStatisticInputGraph {
  id: Guid;
}

export interface DeleteStatisticAccessControlInputGraph {
  accessControlListId: Guid;

  accessControlGroupId: Guid;
}

export interface DeleteStatisticReportInputGraph {
  id: Guid;
}

export interface DeleteStatisticReportAccessControlInputGraph {
  statisticReportId: Guid;

  accessControlGroupId: Guid;
}

export interface UpdateAccessControlGroupInputGraph {
  id: Guid;

  title: string;

  rowVersion: string;
}

export interface UpdateAgencyInputGraph {
  id: Guid;

  title: string;

  metadata?: string | null;

  rowVersion: string;

  portfolioId: Guid;
}

export interface UpdateDisplayGroupInputGraph {
  id: Guid;

  title: string;

  sortOrder: UInt32;

  metadata?: string | null;

  parentId?: Guid | null;

  rowVersion: string;
}

export interface UpdateDisplayGroupProgramInputGraph {
  programId: Guid;

  displayGroupId: Guid;

  sortOrder: UInt32;

  metaData?: string | null;

  rowVersion: string;
}

export interface UpdateDisplayGroupStatisticInputGraph {
  statisticId: Guid;

  displayGroupId: Guid;

  sortOrder: UInt32;

  metaData?: string | null;

  rowVersion: string;
}

export interface UpdatePortfolioInputGraph {
  id: Guid;

  title: string;

  metadata?: string | null;

  rowVersion: string;
}

export interface UpdateProgramInputGraph {
  id?: Guid | null;

  name: string;

  agencyId: Guid;

  externalId?: string | null;

  notes?: string | null;

  commitments?: string | null;

  rowVersion?: string | null;
}

export interface UpdateProgramAccessControlInputGraph {
  programId: Guid;

  accessControlGroupId: Guid;

  rowVersion: string;

  accessRights?: AccessRights | null;
}

export interface UpdateReportInputGraph {
  id: Guid;

  name: string;

  programId: Guid;

  notes?: string | null;

  rowVersion: string;
}

export interface UpdateReportAccessControlInputGraph {
  reportId: Guid;

  accessControlGroupId: Guid;

  accessRights?: AccessRights | null;

  rowVersion: string;
}

export interface UpdateStatisticInputGraph {
  id: Guid;

  name: string;

  agencyId: Guid;

  externalId?: string | null;

  rowVersion: string;
}

export interface UpdateStatisticAccessControlInputGraph {
  statisticId: Guid;

  accessControlGroupId: Guid;

  rowVersion: string;

  accessRights?: AccessRights | null;
}

export interface UpdateStatisticReportInputGraph {
  id: Guid;

  name: string;

  notes?: string | null;

  statisticId: Guid;

  rowVersion: string;
}

export interface UpdateStatisticReportAccessControlInputGraph {
  statisticReportId: Guid;

  accessControlGroupId: Guid;

  accessRights?: AccessRights | null;

  rowVersion: string;
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
export type Guid = any;

/** The `DateTimeOffset` scalar type represents a date, time and offset from UTC.`DateTimeOffset` expects timestamps to be formatted in accordance with the[ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type DateTimeOffset = any;

/** UInt32 */
export type UInt32 = any;

/** The `Date` scalar type represents a year, month and day in accordance with the[ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type Date = any;

/** The `DateTime` scalar type represents a date and time. `DateTime` expectstimestamps to be formatted in accordance with the[ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type DateTime = any;

export type Decimal = any;

/** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
export type Milliseconds = any;

/** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
export type Seconds = any;

// ====================================================
// Documents
// ====================================================

export namespace CreateAccessControlGroupUser {
  export type Variables = {
    data: CreateAccessControlGroupUserInputGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createAccessControlGroupUser: CreateAccessControlGroupUser | null;
  };

  export type CreateAccessControlGroupUser = {
    __typename?: 'AccessControlGroupUserGraph';

    accessControlGroupId: Guid;

    userId: Guid;
  };
}

export namespace Users {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    users: (Users | null)[] | null;
  };

  export type Users = {
    __typename?: 'UserGraph';

    id: Guid;

    emailAddress: string;

    lastLogin: DateTimeOffset | null;

    rowVersion: string;
  };
}

export namespace CreateAccessControlGroup {
  export type Variables = {
    data?: CreateAccessControlGroupInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createAccessControlGroup: CreateAccessControlGroup | null;
  };

  export type CreateAccessControlGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;

    rowVersion: string;
  };
}

export namespace UpdateAccessControlGroup {
  export type Variables = {
    data?: UpdateAccessControlGroupInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateAccessControlGroup: UpdateAccessControlGroup | null;
  };

  export type UpdateAccessControlGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;

    rowVersion: string;
  };
}

export namespace DeleteAccessControlGroup {
  export type Variables = {
    data?: DeleteAccessControlGroupInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteAccessControlGroup: boolean | null;
  };
}

export namespace DeleteAccessControlGroupUser {
  export type Variables = {
    data: DeleteAccessControlGroupUserInputGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteAccessControlGroupUser: boolean | null;
  };
}

export namespace Group {
  export type Variables = {
    groupId: string;
  };

  export type Query = {
    __typename?: 'Query';

    groups: (Groups | null)[] | null;
  };

  export type Groups = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    rowVersion: string;

    title: string;

    members: (Members | null)[] | null;
  };

  export type Members = {
    __typename?: 'UserGraph';

    id: Guid;

    emailAddress: string;

    lastLogin: DateTimeOffset | null;

    rowVersion: string;
  };
}

export namespace AllGroups {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    groups: (Groups | null)[] | null;
  };

  export type Groups = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;

    rowVersion: string;
  };
}

export namespace DeleteReportAccessControl {
  export type Variables = {
    data?: DeleteReportAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteReportAccessControl: boolean | null;
  };
}

export namespace CreateReportAccessControl {
  export type Variables = {
    data?: CreateReportAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createReportAccessControl: CreateReportAccessControl | null;
  };

  export type CreateReportAccessControl = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    rights: string;

    rowVersion: string;
  };
}

export namespace UpdateReportAccessControl {
  export type Variables = {
    data?: UpdateReportAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateReportAccessControl: UpdateReportAccessControl | null;
  };

  export type UpdateReportAccessControl = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    rights: string;

    rowVersion: string;
  };
}

export namespace Report {
  export type Variables = {
    reportId: string;
  };

  export type Query = {
    __typename?: 'Query';

    reports: (Reports | null)[] | null;
  };

  export type Reports = {
    __typename?: 'ReportGraph';

    id: Guid;

    name: string;

    notes: string | null;

    programId: Guid;

    rowVersion: string;

    accessControlList: (AccessControlList | null)[] | null;
  };

  export type AccessControlList = {
    __typename?: 'AccessControlListGraph';

    id: Guid;

    accessControlEntries: (AccessControlEntries | null)[] | null;
  };

  export type AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    accessControlGroup: AccessControlGroup | null;

    rights: string;

    rowVersion: string;
  };

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;
  };
}

export namespace CreateReport {
  export type Variables = {
    data?: CreateReportInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createReport: CreateReport | null;
  };

  export type CreateReport = {
    __typename?: 'ReportGraph';

    id: Guid;

    notes: string | null;

    rowVersion: string;
  };
}

export namespace UpdateReport {
  export type Variables = {
    data?: UpdateReportInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateReport: UpdateReport | null;
  };

  export type UpdateReport = {
    __typename?: 'ReportGraph';

    id: Guid;

    name: string;

    notes: string | null;
  };
}

export namespace CreateProgram {
  export type Variables = {
    data: CreateProgramInputGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createProgram: CreateProgram | null;
  };

  export type CreateProgram = {
    __typename?: 'ProgramGraph';

    id: Guid;

    name: string;

    agency: Agency | null;

    notes: string | null;

    externalId: string | null;

    rowVersion: string;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;
  };
}

export namespace UpdateProgram {
  export type Variables = {
    data: UpdateProgramInputGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateProgram: UpdateProgram | null;
  };

  export type UpdateProgram = {
    __typename?: 'ProgramGraph';

    id: Guid;

    name: string;

    agency: Agency | null;

    notes: string | null;

    externalId: string | null;

    rowVersion: string;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;
  };
}

export namespace DeleteProgram {
  export type Variables = {
    data?: DeleteProgramInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteProgram: boolean | null;
  };
}

export namespace DeleteReport {
  export type Variables = {
    data?: DeleteReportInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteReport: boolean | null;
  };
}

export namespace UpdateProgramAccessControl {
  export type Variables = {
    data?: UpdateProgramAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateProgramAccessControl: UpdateProgramAccessControl | null;
  };

  export type UpdateProgramAccessControl = {
    __typename?: 'AccessControlEntryGraph';

    rights: string;

    id: string;

    rowVersion: string;
  };
}

export namespace CreateProgramAccessControl {
  export type Variables = {
    data?: CreateProgramAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createProgramAccessControl: CreateProgramAccessControl | null;
  };

  export type CreateProgramAccessControl = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    rights: string;

    rowVersion: string;
  };
}

export namespace DeleteProgramAccessControl {
  export type Variables = {
    data?: DeleteProgramAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteProgramAccessControl: boolean | null;
  };
}

export namespace Program {
  export type Variables = {
    programId: string;
  };

  export type Query = {
    __typename?: 'Query';

    programs: (Programs | null)[] | null;
  };

  export type Programs = {
    __typename?: 'ProgramGraph';

    id: Guid;

    name: string;

    notes: string | null;

    externalId: string | null;

    rowVersion: string;

    accessControlList: (AccessControlList | null)[] | null;

    agency: Agency | null;

    reports: (Reports | null)[] | null;

    projects: (Projects | null)[] | null;
  };

  export type AccessControlList = {
    __typename?: 'AccessControlListGraph';

    id: Guid;

    accessControlEntries: (AccessControlEntries | null)[] | null;
  };

  export type AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    rights: string;

    rowVersion: string;

    accessControlGroup: AccessControlGroup | null;
  };

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;

    title: string;

    metadata: string | null;
  };

  export type Reports = {
    __typename?: 'ReportGraph';

    id: Guid;

    name: string;

    notes: string | null;

    accessControlList: (_AccessControlList | null)[] | null;
  };

  export type _AccessControlList = {
    __typename?: 'AccessControlListGraph';

    accessControlEntries: (_AccessControlEntries | null)[] | null;
  };

  export type _AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph';

    accessControlGroup: _AccessControlGroup | null;
  };

  export type _AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph';

    title: string;
  };

  export type Projects = {
    __typename?: 'ProjectGraph';

    id: Guid;

    name: string;

    status: string;

    notes: string | null;

    electorates: (Electorates | null)[] | null;
  };

  export type Electorates = {
    __typename?: 'ElectorateGraph';

    id: Guid;

    name: string;
  };
}

export namespace EditProgram {
  export type Variables = {
    programId: string;
  };

  export type Query = {
    __typename?: 'Query';

    programs: (Programs | null)[] | null;
  };

  export type Programs = {
    __typename?: 'ProgramGraph';

    id: Guid;

    name: string;

    notes: string | null;

    externalId: string | null;

    rowVersion: string;

    agency: Agency | null;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;

    title: string;

    metadata: string | null;
  };
}

export namespace AllPortfolios {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    portfolios: (Portfolios | null)[] | null;
  };

  export type Portfolios = {
    __typename?: 'PortfolioGraph';

    id: Guid;

    title: string;

    metadata: string | null;

    agencies: (Agencies | null)[] | null;
  };

  export type Agencies = {
    __typename?: 'AgencyGraph';

    id: Guid;

    metadata: string | null;

    title: string;
  };
}

export namespace AllPrograms {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    programs: (Programs | null)[] | null;
  };

  export type Programs = {
    __typename?: 'ProgramGraph';

    id: Guid;

    name: string;

    agency: Agency | null;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;

    title: string;
  };
}

export namespace CreateStatisticReportAccessControl {
  export type Variables = {
    data?: CreateStatisticReportAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createStatisticReportAccessControl: CreateStatisticReportAccessControl | null;
  };

  export type CreateStatisticReportAccessControl = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    rights: string;

    rowVersion: string;
  };
}

export namespace UpdateStatisticReportAccessControl {
  export type Variables = {
    data?: UpdateStatisticReportAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateStatisticReportAccessControl: UpdateStatisticReportAccessControl | null;
  };

  export type UpdateStatisticReportAccessControl = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    rights: string;

    rowVersion: string;
  };
}

export namespace DeleteStatisticReportAccessControl {
  export type Variables = {
    data?: DeleteStatisticReportAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteStatisticReportAccessControl: boolean | null;
  };
}

export namespace StatisticReport {
  export type Variables = {
    reportId: string;
  };

  export type Query = {
    __typename?: 'Query';

    statisticReports: (StatisticReports | null)[] | null;
  };

  export type StatisticReports = {
    __typename?: 'StatisticReportGraph';

    id: Guid;

    name: string;

    notes: string | null;

    rowVersion: string;

    statisticId: Guid;

    accessControlList: (AccessControlList | null)[] | null;
  };

  export type AccessControlList = {
    __typename?: 'AccessControlListGraph';

    id: Guid;

    accessControlEntries: (AccessControlEntries | null)[] | null;
  };

  export type AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    accessControlGroup: AccessControlGroup | null;

    rights: string;

    rowVersion: string;
  };

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;
  };
}

export namespace CreateStatisticReport {
  export type Variables = {
    data: CreateStatisticReportInputGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createStatisticReport: CreateStatisticReport | null;
  };

  export type CreateStatisticReport = {
    __typename?: 'StatisticReportGraph';

    id: Guid;

    name: string;

    notes: string | null;

    statisticId: Guid;
  };
}

export namespace UpdateStatisticReport {
  export type Variables = {
    data?: UpdateStatisticReportInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateStatisticReport: UpdateStatisticReport | null;
  };

  export type UpdateStatisticReport = {
    __typename?: 'StatisticReportGraph';

    id: Guid;

    name: string;

    notes: string | null;

    statisticId: Guid;
  };
}

export namespace CreateStatistic {
  export type Variables = {
    data: CreateStatisticInputGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createStatistic: CreateStatistic | null;
  };

  export type CreateStatistic = {
    __typename?: 'StatisticGraph';

    id: Guid;

    name: string;

    agency: Agency | null;

    externalId: string | null;

    rowVersion: string;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;
  };
}

export namespace UpdateStatistic {
  export type Variables = {
    data: UpdateStatisticInputGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateStatistic: UpdateStatistic | null;
  };

  export type UpdateStatistic = {
    __typename?: 'StatisticGraph';

    id: Guid;

    name: string;

    agency: Agency | null;

    externalId: string | null;

    rowVersion: string;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;
  };
}

export namespace DeleteStatisticReport {
  export type Variables = {
    data: DeleteStatisticReportInputGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteStatisticReport: boolean | null;
  };
}

export namespace DeleteStatistic {
  export type Variables = {
    data: DeleteStatisticInputGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteStatistic: boolean | null;
  };
}

export namespace CreateStatisticAccessControl {
  export type Variables = {
    data?: CreateStatisticAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createStatisticAccessControl: CreateStatisticAccessControl | null;
  };

  export type CreateStatisticAccessControl = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    rights: string;

    rowVersion: string;
  };
}

export namespace DeleteStatisticAccessControl {
  export type Variables = {
    data?: DeleteStatisticAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteStatisticAccessControl: boolean | null;
  };
}

export namespace UpdateStatisticAccessControl {
  export type Variables = {
    data?: UpdateStatisticAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateStatisticAccessControl: UpdateStatisticAccessControl | null;
  };

  export type UpdateStatisticAccessControl = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    rights: string;

    rowVersion: string;
  };
}

export namespace AllStatistics {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    statistics: (Statistics | null)[] | null;
  };

  export type Statistics = {
    __typename?: 'StatisticGraph';

    id: Guid;

    name: string;

    agency: Agency | null;

    statisticReports: (StatisticReports | null)[] | null;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;

    title: string;
  };

  export type StatisticReports = {
    __typename?: 'StatisticReportGraph';

    id: Guid;

    name: string;

    notes: string | null;
  };
}

export namespace Statistic {
  export type Variables = {
    statisticId: string;
  };

  export type Query = {
    __typename?: 'Query';

    statistics: (Statistics | null)[] | null;
  };

  export type Statistics = {
    __typename?: 'StatisticGraph';

    id: Guid;

    agency: Agency | null;

    accessControlList: (AccessControlList | null)[] | null;

    name: string;

    externalId: string | null;

    rowVersion: string;

    statisticReports: (StatisticReports | null)[] | null;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;

    title: string;
  };

  export type AccessControlList = {
    __typename?: 'AccessControlListGraph';

    id: Guid;

    accessControlEntries: (AccessControlEntries | null)[] | null;
  };

  export type AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph';

    id: string;

    rights: string;

    rowVersion: string;

    accessControlGroup: AccessControlGroup | null;
  };

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;
  };

  export type StatisticReports = {
    __typename?: 'StatisticReportGraph';

    id: Guid;

    name: string;

    notes: string | null;
  };
}

export namespace AllAgencies {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    agencies: (Agencies | null)[] | null;
  };

  export type Agencies = {
    __typename?: 'AgencyGraph';

    id: Guid;

    metadata: string | null;

    title: string;
  };
}

export namespace User {
  export type Variables = {
    userId: string;
  };

  export type Query = {
    __typename?: 'Query';

    users: (Users | null)[] | null;
  };

  export type Users = {
    __typename?: 'UserGraph';

    id: Guid;

    emailAddress: string;

    agency: Agency | null;

    apiKeys: (ApiKeys | null)[] | null;

    lastLogin: DateTimeOffset | null;

    rowVersion: string;
  };

  export type Agency = {
    __typename?: 'AgencyGraph';

    id: Guid;

    title: string;
  };

  export type ApiKeys = {
    __typename?: 'ApiKeyGraph';

    id: Guid;

    key: string;

    rowVersion: string;

    disable: boolean;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

import gql from 'graphql-tag';

// ====================================================
// Apollo Services
// ====================================================

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
  `;
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
  `;
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
  `;
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
  `;
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
  `;
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
  `;
}
@Injectable({
  providedIn: 'root'
})
export class GroupGQL extends Apollo.Query<Group.Query, Group.Variables> {
  document: any = gql`
    query group($groupId: String!) {
      groups(ids: [$groupId]) {
        id
        rowVersion
        title
        members(orderBy: { path: "emailAddress" }) {
          id
          emailAddress
          lastLogin
          rowVersion
        }
      }
    }
  `;
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
  `;
}
@Injectable({
  providedIn: 'root'
})
export class DeleteReportAccessControlGQL extends Apollo.Mutation<
  DeleteReportAccessControl.Mutation,
  DeleteReportAccessControl.Variables
> {
  document: any = gql`
    mutation deleteReportAccessControl(
      $data: DeleteReportAccessControlInputGraph
    ) {
      deleteReportAccessControl(input: $data)
    }
  `;
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
  `;
}
@Injectable({
  providedIn: 'root'
})
export class UpdateReportAccessControlGQL extends Apollo.Mutation<
  UpdateReportAccessControl.Mutation,
  UpdateReportAccessControl.Variables
> {
  document: any = gql`
    mutation updateReportAccessControl(
      $data: UpdateReportAccessControlInputGraph
    ) {
      updateReportAccessControl(input: $data) {
        id
        rights
        rowVersion
      }
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class ReportGQL extends Apollo.Query<Report.Query, Report.Variables> {
  document: any = gql`
    query report($reportId: String!) {
      reports(ids: [$reportId]) {
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
      }
    }
  `;
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
  `;
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
  `;
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
  `;
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
  `;
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
  `;
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
  `;
}
@Injectable({
  providedIn: 'root'
})
export class UpdateProgramAccessControlGQL extends Apollo.Mutation<
  UpdateProgramAccessControl.Mutation,
  UpdateProgramAccessControl.Variables
> {
  document: any = gql`
    mutation updateProgramAccessControl(
      $data: UpdateProgramAccessControlInputGraph
    ) {
      updateProgramAccessControl(input: $data) {
        rights
        id
        rowVersion
      }
    }
  `;
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
  `;
}
@Injectable({
  providedIn: 'root'
})
export class DeleteProgramAccessControlGQL extends Apollo.Mutation<
  DeleteProgramAccessControl.Mutation,
  DeleteProgramAccessControl.Variables
> {
  document: any = gql`
    mutation deleteProgramAccessControl(
      $data: DeleteProgramAccessControlInputGraph
    ) {
      deleteProgramAccessControl(input: $data)
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class ProgramGQL extends Apollo.Query<Program.Query, Program.Variables> {
  document: any = gql`
    query program($programId: String!) {
      programs(ids: [$programId]) {
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
        projects {
          id
          name
          status
          notes
          electorates {
            id
            name
          }
        }
      }
    }
  `;
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
      programs(ids: [$programId]) {
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
  `;
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
  `;
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
  `;
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
  `;
}
@Injectable({
  providedIn: 'root'
})
export class UpdateStatisticReportAccessControlGQL extends Apollo.Mutation<
  UpdateStatisticReportAccessControl.Mutation,
  UpdateStatisticReportAccessControl.Variables
> {
  document: any = gql`
    mutation updateStatisticReportAccessControl(
      $data: UpdateStatisticReportAccessControlInputGraph
    ) {
      updateStatisticReportAccessControl(input: $data) {
        id
        rights
        rowVersion
      }
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class DeleteStatisticReportAccessControlGQL extends Apollo.Mutation<
  DeleteStatisticReportAccessControl.Mutation,
  DeleteStatisticReportAccessControl.Variables
> {
  document: any = gql`
    mutation deleteStatisticReportAccessControl(
      $data: DeleteStatisticReportAccessControlInputGraph
    ) {
      deleteStatisticReportAccessControl(input: $data)
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class StatisticReportGQL extends Apollo.Query<
  StatisticReport.Query,
  StatisticReport.Variables
> {
  document: any = gql`
    query statisticReport($reportId: String!) {
      statisticReports(ids: [$reportId]) {
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
      }
    }
  `;
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
  `;
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
  `;
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
  `;
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
  `;
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
  `;
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
  `;
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
  `;
}
@Injectable({
  providedIn: 'root'
})
export class DeleteStatisticAccessControlGQL extends Apollo.Mutation<
  DeleteStatisticAccessControl.Mutation,
  DeleteStatisticAccessControl.Variables
> {
  document: any = gql`
    mutation deleteStatisticAccessControl(
      $data: DeleteStatisticAccessControlInputGraph
    ) {
      deleteStatisticAccessControl(input: $data)
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class UpdateStatisticAccessControlGQL extends Apollo.Mutation<
  UpdateStatisticAccessControl.Mutation,
  UpdateStatisticAccessControl.Variables
> {
  document: any = gql`
    mutation updateStatisticAccessControl(
      $data: UpdateStatisticAccessControlInputGraph
    ) {
      updateStatisticAccessControl(input: $data) {
        id
        rights
        rowVersion
      }
    }
  `;
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
  `;
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
      statistics(ids: [$statisticId]) {
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
  `;
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
  `;
}
@Injectable({
  providedIn: 'root'
})
export class UserGQL extends Apollo.Query<User.Query, User.Variables> {
  document: any = gql`
    query user($userId: String!) {
      users(ids: [$userId]) {
        id
        emailAddress
        agency {
          id
          title
        }
        apiKeys {
          id
          key
          rowVersion
          disable
        }
        lastLogin
        rowVersion
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
