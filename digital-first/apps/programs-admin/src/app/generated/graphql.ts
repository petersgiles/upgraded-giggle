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

export interface CreateElectorateBarchartReportGraph {
  reportId: Guid;

  notes?: string | null;

  dataDate: DateTimeOffset;

  chartData?: (ElectorateChartDataGraph | null)[] | null;
}

export interface ElectorateChartDataGraph {
  electorateId: Guid;

  data?: SeriesChartGraph | null;
}

export interface SeriesChartGraph {
  title: string;

  type: string;

  xAxisLabel?: string | null;

  data?: (SeriesDataGraph | null)[] | null;
}

export interface SeriesDataGraph {
  name: string;

  series?: (SeriesGraph | null)[] | null;
}

export interface SeriesGraph {
  name: string;

  value: number;
}

export interface CreateElectorateMarkdownReportGraph {
  reportId: Guid;

  notes?: string | null;

  dataDate: DateTimeOffset;

  electorateData?: (ElectorateDataMarkdownGraph | null)[] | null;
}

export interface ElectorateDataMarkdownGraph {
  electorateId: Guid;

  data?: MarkdownGraph | null;
}

export interface MarkdownGraph {
  text: string;
}

export interface CreateElectorateTableReportGraph {
  reportId: Guid;

  schema?: SchemaGraph | null;

  notes?: string | null;

  dataDate: DateTimeOffset;

  electorateData?: (ElectorateDataGraph | null)[] | null;
}

export interface SchemaGraph {
  columns?: (ColumnGraph | null)[] | null;

  rows?: (RowGraph | null)[] | null;
}

export interface ColumnGraph {
  parentLabel?: string | null;

  format: string;

  label: string;
}

export interface RowGraph {
  label: string;

  format?: string | null;
}

export interface ElectorateDataGraph {
  data?: (string | null)[][] | null;

  electorateId: Guid;
}

export interface CreateNationalBarchartReportGraph {
  reportId: Guid;

  notes?: string | null;

  dataDate: DateTimeOffset;

  chartData?: SeriesChartGraph | null;
}

export interface CreateNationalMarkdownReportGraph {
  reportId: Guid;

  notes?: string | null;

  dataDate: DateTimeOffset;

  nationalData?: NationalDataGraph | null;
}

export interface NationalDataGraph {
  data?: MarkdownGraph | null;
}

export interface CreateNationalTableReportGraph {
  reportId: Guid;

  schema?: SchemaGraph | null;

  notes?: string | null;

  dataDate: DateTimeOffset;

  data?: (string | null)[][] | null;
}

export interface CreateStateBarchartReportGraph {
  reportId: Guid;

  notes?: string | null;

  dataDate: DateTimeOffset;

  chartData?: (StateChartDataGraph | null)[] | null;
}

export interface StateChartDataGraph {
  stateId: Guid;

  data?: SeriesChartGraph | null;
}

export interface CreateStateMarkdownReportGraph {
  reportId: Guid;

  notes?: string | null;

  dataDate: DateTimeOffset;

  stateData?: (StateDataMarkdownGraph | null)[] | null;
}

export interface StateDataMarkdownGraph {
  stateId: Guid;

  data?: MarkdownGraph | null;
}

export interface CreateStateTableReportGraph {
  reportId: Guid;

  schema?: SchemaGraph | null;

  notes?: string | null;

  dataDate: DateTimeOffset;

  stateData?: (StateDataGraph | null)[] | null;
}

export interface StateDataGraph {
  data?: (string | null)[][] | null;

  stateId: Guid;
}

export interface CreateStatisticElectorateTableReportGraph {
  statisticReportId: Guid;

  schema?: SchemaGraph | null;

  dataDate: DateTimeOffset;

  electorateData?: (ElectorateDataGraph | null)[] | null;
}

export interface CreateStatisticReportGraph {
  name: string;

  notes: string;

  statisticId: Guid;
}

export interface SendTestMessageGraph {
  content: string;
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

/** UInt32 */
export type UInt32 = any;

/** The `DateTimeOffset` scalar type represents a date, time and offset from UTC.`DateTimeOffset` expects timestamps to be formatted in accordance with the[ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type DateTimeOffset = any;

/** For passing untyped JSON */
export type Json = any;

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
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
