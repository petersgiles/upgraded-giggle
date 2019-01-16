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

export interface ProgramAccessControlInputGraph {
  programId: Guid;

  accessControlGroupId: Guid;

  rowVersion: string;

  accessRights?: AccessRights | null;
}

export interface ReportAccessControlInputGraph {
  reportId: Guid;

  accessControlGroupId: Guid;

  rowVersion: string;

  accessRights?: AccessRights | null;
}

export interface InputGroupUserGraph {
  accessControlGroupId: Guid;

  userId: Guid;
}

export interface CreateAgencyGraph {
  title: string;

  emailDomain: string;

  portfolioId: Guid;
}

export interface CreateDisplayGroupGraph {
  title: string;

  sortOrder: UInt32;

  metadata?: string | null;

  parentId?: Guid | null;
}

export interface CreateDisplayGroupProgramGraph {
  programId: Guid;

  displayGroupId: Guid;

  sortOrder: UInt32;

  metadata?: string | null;
}

export interface CreateDisplayGroupStatisticGraph {
  statisticId: Guid;

  displayGroupId: Guid;

  sortOrder: UInt32;

  metadata?: string | null;
}

export interface CreateAccessControlGroupGraph {
  title: string;
}

export interface InputProgramGraph {
  id?: Guid | null;

  name: string;

  agencyId: Guid;

  externalId?: string | null;

  notes?: string | null;

  commitments?: string | null;

  rowVersion?: string | null;
}

export interface InputStatisticGraph {
  id?: Guid | null;

  name: string;

  agencyId: Guid;

  externalId?: string | null;

  rowVersion?: string | null;
}

export interface InputStatisticReportGraph {
  id?: Guid | null;

  name: string;

  notes?: string | null;

  statisticId: Guid;

  rowVersion?: string | null;
}

export interface CreatePortfolioGraph {
  title: string;

  metadata?: string | null;
}

export interface CreateProgramGraph {
  name: string;

  agencyId: Guid;

  externalId?: string | null;

  notes?: string | null;

  commitments?: string | null;
}

export interface CreateProjectGraph {
  name: string;

  externalId?: string | null;

  committed?: UInt32 | null;

  programId: Guid;

  notes?: string | null;

  status?: string | null;

  spent?: UInt32 | null;

  default?: (LocationGraph | null)[] | null;
}

export interface LocationGraph {
  electorateId: Guid;

  featureCollection: string;
}

export interface CreateReportGraph {
  name: string;

  programId: Guid;

  notes?: string | null;
}

export interface CreateStatisticGraph {
  name: string;

  agencyId: Guid;

  externalId?: string | null;
}

export interface DeleteDisplayGroupGraph {
  id: Guid;
}

export interface DeleteDisplayGroupProgramGraph {
  programId: Guid;

  displayGroupId: Guid;
}

export interface DeleteDisplayGroupStatisticGraph {
  statisticId: Guid;

  displayGroupId: Guid;
}

export interface DeleteAccessControlGroupGraph {
  id: Guid;
}

export interface DeletePortfolioGraph {
  id: Guid;
}

export interface InputDeleteProgramGraph {
  id: Guid;
}

export interface InputDeleteReportGraph {
  id: Guid;
}

export interface InputDeleteGraph {
  id: Guid;
}

export interface ModifyDisplayGroupGraph {
  id: Guid;

  title: string;

  sortOrder: UInt32;

  metadata?: string | null;

  parentId?: Guid | null;
}

export interface ModifyDisplayGroupProgramGraph {
  programId: Guid;

  displayGroupId: Guid;

  sortOrder: UInt32;

  metadata?: string | null;
}

export interface ModifyDisplayGroupStatisticGraph {
  statisticId: Guid;

  displayGroupId: Guid;

  sortOrder: UInt32;

  metadata?: string | null;
}

export interface ModifyPortfolioGraph {
  id: Guid;

  title: string;

  metadata?: string | null;
}

export interface AccessControlInputGraph {
  accessControlListId: Guid;

  accessControlGroupId: Guid;
}

export interface InputGroupReportGraph {
  accessControlListId: Guid;

  accessControlGroupId: Guid;
}

export interface InputReportGraph {
  id?: Guid | null;

  name: string;

  programId: Guid;

  notes?: string | null;

  rowVersion?: string | null;
}

export interface UpdateAccessControlGroupGraph {
  id: Guid;

  title: string;

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

export namespace DeleteProgram {
  export type Variables = {
    data?: InputDeleteProgramGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteProgram: boolean | null;
  };
}

export namespace CreateProgram {
  export type Variables = {
    data: InputProgramGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createNewProgram: CreateNewProgram | null;
  };

  export type CreateNewProgram = {
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
    data: InputProgramGraph;
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

export namespace AssignGroupToProgram {
  export type Variables = {
    data?: ProgramAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    assignGroupToProgram: AssignGroupToProgram | null;
  };

  export type AssignGroupToProgram = {
    __typename?: 'AccessControlEntryGraph';

    rights: string;

    accessControlGroup: AccessControlGroup | null;

    rowVersion: string;
  };

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;
  };
}

export namespace UpdateGroupPermissionsForProgram {
  export type Variables = {
    data?: ProgramAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateGroupPermissionsForProgram: UpdateGroupPermissionsForProgram | null;
  };

  export type UpdateGroupPermissionsForProgram = {
    __typename?: 'AccessControlEntryGraph';

    rights: string;

    id: string;

    rowVersion: string;
  };
}

export namespace RemoveGroupFromProgram {
  export type Variables = {
    data?: AccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    removeGroupFromProgram: boolean | null;
  };
}

export namespace AddReport {
  export type Variables = {
    data?: InputReportGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    report: Report | null;
  };

  export type Report = {
    __typename?: 'ReportGraph';

    id: Guid;

    notes: string | null;

    rowVersion: string;
  };
}

export namespace DeleteReport {
  export type Variables = {
    data?: InputDeleteReportGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteReport: boolean | null;
  };
}

export namespace AssignGroupToReport {
  export type Variables = {
    data?: ReportAccessControlInputGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    assignGroupToReport: AssignGroupToReport | null;
  };

  export type AssignGroupToReport = {
    __typename?: 'AccessControlEntryGraph';

    rights: string;

    accessControlGroup: AccessControlGroup | null;

    rowVersion: string;
  };

  export type AccessControlGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;
  };
}

export namespace CreateGroup {
  export type Variables = {
    data?: CreateAccessControlGroupGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createGroup: CreateGroup | null;
  };

  export type CreateGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;

    rowVersion: string;
  };
}

export namespace UpdateGroup {
  export type Variables = {
    data?: UpdateAccessControlGroupGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateGroup: UpdateGroup | null;
  };

  export type UpdateGroup = {
    __typename?: 'AccessControlGroupGraph';

    id: Guid;

    title: string;

    rowVersion: string;
  };
}

export namespace DeleteGroup {
  export type Variables = {
    data?: DeleteAccessControlGroupGraph | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteGroup: boolean | null;
  };
}

export namespace CreateStatistic {
  export type Variables = {
    data: InputStatisticGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createNewStatistic: CreateNewStatistic | null;
  };

  export type CreateNewStatistic = {
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
    data: InputStatisticGraph;
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

export namespace DeleteStatistic {
  export type Variables = {
    data: InputDeleteGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteStatistic: boolean | null;
  };
}

export namespace AssignUserToGroup {
  export type Variables = {
    data: InputGroupUserGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    assignUserToGroup: AssignUserToGroup | null;
  };

  export type AssignUserToGroup = {
    __typename?: 'AccessControlGroupUserGraph';

    accessControlGroupId: Guid;

    userId: Guid;
  };
}

export namespace RemoveUserFromGroup {
  export type Variables = {
    data: InputGroupUserGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    removeUserFromGroup: boolean | null;
  };
}

export namespace CreateStatisticReport {
  export type Variables = {
    data: InputStatisticReportGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createNewStatisticReport: CreateNewStatisticReport | null;
  };

  export type CreateNewStatisticReport = {
    __typename?: 'StatisticReportGraph';

    id: Guid;

    name: string;

    notes: string | null;

    statisticId: Guid;
  };
}

export namespace DeleteStatisticReport {
  export type Variables = {
    data: InputDeleteGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteStatisticReport: boolean | null;
  };
}

export namespace RemoveGroupFromReport {
  export type Variables = {
    data: InputGroupReportGraph;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    removeGroupFromReport: boolean | null;
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

    members: (Members | null)[] | null;
  };

  export type Members = {
    __typename?: 'UserGraph';

    id: Guid;

    emailAddress: string;
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

    members: (Members | null)[] | null;
  };

  export type Members = {
    __typename?: 'UserGraph';

    id: Guid;

    emailAddress: string;
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
export class DeleteProgramGQL extends Apollo.Mutation<
  DeleteProgram.Mutation,
  DeleteProgram.Variables
> {
  document: any = gql`
    mutation deleteProgram($data: InputDeleteProgramGraph) {
      deleteProgram(inputDeleteProgram: $data)
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
    mutation createProgram($data: InputProgramGraph!) {
      createNewProgram(inputProgram: $data) {
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
    mutation updateProgram($data: InputProgramGraph!) {
      updateProgram(inputProgram: $data) {
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
export class AssignGroupToProgramGQL extends Apollo.Mutation<
  AssignGroupToProgram.Mutation,
  AssignGroupToProgram.Variables
> {
  document: any = gql`
    mutation assignGroupToProgram($data: ProgramAccessControlInputGraph) {
      assignGroupToProgram(programAccessControlInput: $data) {
        rights
        accessControlGroup {
          id
          title
        }
        rowVersion
      }
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class UpdateGroupPermissionsForProgramGQL extends Apollo.Mutation<
  UpdateGroupPermissionsForProgram.Mutation,
  UpdateGroupPermissionsForProgram.Variables
> {
  document: any = gql`
    mutation updateGroupPermissionsForProgram(
      $data: ProgramAccessControlInputGraph
    ) {
      updateGroupPermissionsForProgram(programAccessControlInput: $data) {
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
export class RemoveGroupFromProgramGQL extends Apollo.Mutation<
  RemoveGroupFromProgram.Mutation,
  RemoveGroupFromProgram.Variables
> {
  document: any = gql`
    mutation removeGroupFromProgram($data: AccessControlInputGraph) {
      removeGroupFromProgram(accessControlInputGraph: $data)
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class AddReportGQL extends Apollo.Mutation<
  AddReport.Mutation,
  AddReport.Variables
> {
  document: any = gql`
    mutation addReport($data: InputReportGraph) {
      report(inputReport: $data) {
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
export class DeleteReportGQL extends Apollo.Mutation<
  DeleteReport.Mutation,
  DeleteReport.Variables
> {
  document: any = gql`
    mutation deleteReport($data: InputDeleteReportGraph) {
      deleteReport(inputDeleteReport: $data)
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class AssignGroupToReportGQL extends Apollo.Mutation<
  AssignGroupToReport.Mutation,
  AssignGroupToReport.Variables
> {
  document: any = gql`
    mutation assignGroupToReport($data: ReportAccessControlInputGraph) {
      assignGroupToReport(reportAccessControlInput: $data) {
        rights
        accessControlGroup {
          id
          title
        }
        rowVersion
      }
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class CreateGroupGQL extends Apollo.Mutation<
  CreateGroup.Mutation,
  CreateGroup.Variables
> {
  document: any = gql`
    mutation createGroup($data: CreateAccessControlGroupGraph) {
      createGroup(inputGroup: $data) {
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
export class UpdateGroupGQL extends Apollo.Mutation<
  UpdateGroup.Mutation,
  UpdateGroup.Variables
> {
  document: any = gql`
    mutation updateGroup($data: UpdateAccessControlGroupGraph) {
      updateGroup(inputUpdateGroup: $data) {
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
export class DeleteGroupGQL extends Apollo.Mutation<
  DeleteGroup.Mutation,
  DeleteGroup.Variables
> {
  document: any = gql`
    mutation deleteGroup($data: DeleteAccessControlGroupGraph) {
      deleteGroup(inputDeleteGroup: $data)
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
    mutation createStatistic($data: InputStatisticGraph!) {
      createNewStatistic(inputStatistic: $data) {
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
    mutation updateStatistic($data: InputStatisticGraph!) {
      updateStatistic(inputStatistic: $data) {
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
export class DeleteStatisticGQL extends Apollo.Mutation<
  DeleteStatistic.Mutation,
  DeleteStatistic.Variables
> {
  document: any = gql`
    mutation deleteStatistic($data: InputDeleteGraph!) {
      deleteStatistic(inputDelete: $data)
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class AssignUserToGroupGQL extends Apollo.Mutation<
  AssignUserToGroup.Mutation,
  AssignUserToGroup.Variables
> {
  document: any = gql`
    mutation assignUserToGroup($data: InputGroupUserGraph!) {
      assignUserToGroup(inputGroupUserGraph: $data) {
        accessControlGroupId
        userId
      }
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class RemoveUserFromGroupGQL extends Apollo.Mutation<
  RemoveUserFromGroup.Mutation,
  RemoveUserFromGroup.Variables
> {
  document: any = gql`
    mutation removeUserFromGroup($data: InputGroupUserGraph!) {
      removeUserFromGroup(inputGroupUserGraph: $data)
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
    mutation createStatisticReport($data: InputStatisticReportGraph!) {
      createNewStatisticReport(inputStatisticReport: $data) {
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
export class DeleteStatisticReportGQL extends Apollo.Mutation<
  DeleteStatisticReport.Mutation,
  DeleteStatisticReport.Variables
> {
  document: any = gql`
    mutation deleteStatisticReport($data: InputDeleteGraph!) {
      deleteStatisticReport(inputDelete: $data)
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class RemoveGroupFromReportGQL extends Apollo.Mutation<
  RemoveGroupFromReport.Mutation,
  RemoveGroupFromReport.Variables
> {
  document: any = gql`
    mutation removeGroupFromReport($data: InputGroupReportGraph!) {
      removeGroupFromReport(inputGroupReportGraph: $data)
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
export class ReportGQL extends Apollo.Query<Report.Query, Report.Variables> {
  document: any = gql`
    query report($reportId: String!) {
      reports(ids: [$reportId]) {
        id
        name
        notes
        rowVersion
        accessControlList {
          id
          accessControlEntries(orderBy: { path: "accessControlGroup.title" }) {
            id
            accessControlGroup {
              id
              title
              members {
                id
                emailAddress
              }
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
export class StatisticReportGQL extends Apollo.Query<
  StatisticReport.Query,
  StatisticReport.Variables
> {
  document: any = gql`
    query statisticReport($reportId: String!) {
      statisticReports(ids: [$reportId]) {
        id
        name
        accessControlList {
          id
          accessControlEntries(orderBy: { path: "accessControlGroup.title" }) {
            id
            accessControlGroup {
              id
              title
              members {
                id
                emailAddress
              }
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

// ====================================================
// END: Apollo Angular template
// ====================================================
