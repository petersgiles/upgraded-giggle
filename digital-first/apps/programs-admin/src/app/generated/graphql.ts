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

export interface CreatePortfolioGraph {
  title: string;

  metadata?: string | null;
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

export interface DeletePortfolioGraph {
  id: Guid;
}

export interface InputDeleteProgramGraph {
  id: Guid;
}

export interface InputDeleteReportGraph {
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

export interface InputProgramGraph {
  id?: Guid | null;

  name: string;

  agencyId: Guid;

  externalId?: string | null;

  notes?: string | null;

  commitments?: string | null;

  rowVersion?: string | null;
}

export interface InputReportGraph {
  id?: Guid | null;

  name: string;

  programId: Guid;

  notes?: string | null;

  rowVersion?: string | null;
}

export enum ComparisonGraph {
  Contains = 'contains',
  EndsWith = 'endsWith',
  Equal = 'equal',
  GreaterThan = 'greaterThan',
  GreaterThanOrEqual = 'greaterThanOrEqual',
  In = 'in',
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

    program: Program | null;
  };

  export type Program = {
    __typename?: 'ProgramGraph';

    id: Guid;

    rowVersion: string;
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

    accessControlEntries: (AccessControlEntries | null)[] | null;
  };

  export type AccessControlEntries = {
    __typename?: 'AccessControlEntryGraph';

    rights: string;

    group: (Group | null)[] | null;
  };

  export type Group = {
    __typename?: 'AccessControlGroupGraph';

    title: string;

    members: (Members | null)[] | null;
  };

  export type Members = {
    __typename?: 'UserGraph';

    emailAddress: string;
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

    group: (_Group | null)[] | null;
  };

  export type _Group = {
    __typename?: 'AccessControlGroupGraph';

    title: string;

    members: (_Members | null)[] | null;
  };

  export type _Members = {
    __typename?: 'UserGraph';

    emailAddress: string;
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
      program(inputProgram: $data) {
        id
        rowVersion
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
      agencies {
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
export class AllPortfoliosGQL extends Apollo.Query<
  AllPortfolios.Query,
  AllPortfolios.Variables
> {
  document: any = gql`
    query allPortfolios {
      portfolios {
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
      statistics {
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
      programs {
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
          accessControlEntries {
            rights
            group {
              title
              members {
                emailAddress
              }
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
              group {
                title
                members {
                  emailAddress
                }
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

// ====================================================
// END: Apollo Angular template
// ====================================================
