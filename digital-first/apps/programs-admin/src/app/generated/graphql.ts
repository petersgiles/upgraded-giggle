/* tslint:disable */
import {GraphQLResolveInfo} from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<Result,
  Parent = any,
  Context = any,
  Args = any> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

/** Guid */
export type Guid = any;

/** UInt32 */
export type UInt32 = any;

/** The `DateTimeOffset` scalar type represents a date, time and offset from UTC. `DateTimeOffset` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type DateTimeOffset = any;

/** For passing untyped JSON */
export type Json = any;

/** The `Date` scalar type represents a year, month and day in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type Date = any;

/** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
export type DateTime = any;

/** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
export type Seconds = any;

/** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
export type Milliseconds = any;

export type Decimal = any;

export interface Query {
  agencies?: (AgencyGraph | null)[] | null;
  displayGroupPrograms?: (DisplayGroupProgramGraph | null)[] | null;
  displayGroups?: (DisplayGroupGraph | null)[] | null;
  displayGroupStatistics?: (DisplayGroupStatisticGraph | null)[] | null;
  electorate?: ElectorateGraph | null;
  electorates?: (ElectorateGraph | null)[] | null;
  latestElectorateReportData?: (ReportDataGraph | null)[] | null;
  latestElectorateStatisticData?: (StatisticDataGraph | null)[] | null;
  latestNationalReportData?: (ReportDataGraph | null)[] | null;
  latestNationalStatisticData?: (StatisticDataGraph | null)[] | null;
  latestStateReportData?: (ReportDataGraph | null)[] | null;
  latestStateStatisticData?: (StatisticDataGraph | null)[] | null;
  portfolios?: (PortfolioGraph | null)[] | null;
  programs?: (ProgramGraph | null)[] | null;
  statistics?: (StatisticGraph | null)[] | null;
}

export interface AgencyGraph {
  id: Guid;
  metadata?: string | null;
  title: string;
}

export interface DisplayGroupProgramGraph {
  metadata: string;
  program?: ProgramGraph | null;
  sortOrder: UInt32;
}

export interface ProgramGraph {
  agency?: AgencyGraph | null;
  appropriations?: (AppropriationGraph | null)[] | null;
  commitments?: string | null;
  electorates?: (ElectorateGraph | null)[] | null;
  id: Guid;
  name: string;
  notes?: string | null;
  projects?: (ProjectGraph | null)[] | null;
  reports?: (ReportGraph | null)[] | null;
}

export interface AppropriationGraph {
  budgetYear?: UInt32 | null;
  dollars: UInt32;
  financialYear: string;
  id: Guid;
}

export interface ElectorateGraph {
  id: Guid;
  member: string;
  name: string;
  party: string;
  percentOfStatePopulation: number;
  population: UInt32;
  programs?: (ProgramGraph | null)[] | null;
  projects?: (ProjectGraph | null)[] | null;
  state?: StateGraph | null;
}

export interface ProjectGraph {
  electorates?: (ElectorateGraph | null)[] | null;
  id: Guid;
  name: string;
  notes?: string | null;
  program?: ProgramGraph | null;
  projectFundingSnapshots?: (ProjectFundingSnapshotGraph | null)[] | null;
  status: string;
}

export interface ProjectFundingSnapshotGraph {
  committed: UInt32;
  id: Guid;
  project?: ProjectGraph | null;
  spent: UInt32;
  timestamp: DateTimeOffset;
}

export interface StateGraph {
  abbreviation: string;
  id: Guid;
  name: string;
  population: UInt32;
}

export interface ReportGraph {
  id: Guid;
  name: string;
  notes?: string | null;
}

export interface DisplayGroupGraph {
  id: Guid;
  metadata: string;
  parentId?: Guid | null;
  programGrouping?: (DisplayGroupProgramGraph | null)[] | null;
  sortOrder: UInt32;
  statisticGrouping?: (DisplayGroupStatisticGraph | null)[] | null;
  title: string;
}

export interface DisplayGroupStatisticGraph {
  metadata: string;
  sortOrder: UInt32;
  statistic?: StatisticGraph | null;
}

export interface StatisticGraph {
  agency?: AgencyGraph | null;
  id: Guid;
  name: string;
  statisticReports?: (StatisticReportGraph | null)[] | null;
}

export interface StatisticReportGraph {
  id: Guid;
  name: string;
  notes?: string | null;
}

export interface ReportDataGraph {
  data?: Json | null;
  id: Guid;
  reportVersion?: ReportVersionGraph | null;
}

export interface ReportVersionGraph {
  dataDate: DateTimeOffset;
  id: Guid;
  notes: string;
  report?: ReportGraph | null;
  reportFormat?: string | null;
  schema?: string | null;
  timestamp: DateTimeOffset;
}

export interface StatisticDataGraph {
  data?: Json | null;
  id: Guid;
  statisticReportVersion?: StatisticReportVersionGraph | null;
}

export interface StatisticReportVersionGraph {
  dataDate: DateTimeOffset;
  id: Guid;
  notes: string;
  reportFormat?: string | null;
  schema: string;
  statisticReport?: StatisticReportGraph | null;
  timestamp: DateTimeOffset;
}

export interface PortfolioGraph {
  agencies?: (AgencyGraph | null)[] | null;
  id: Guid;
  metadata?: string | null;
  title: string;
}

export interface Mutation {
  createElectorateBarchartReport?: MutationResultGraph | null;
  createElectorateMarkdownReport?: MutationResultGraph | null;
  createElectorateTableReport?: MutationResultGraph | null;
  createNationalBarchartReport?: MutationResultGraph | null;
  createNationalMarkdownReport?: MutationResultGraph | null;
  createNationalTableReport?: MutationResultGraph | null;
  createStateBarchartReport?: MutationResultGraph | null;
  createStateMarkdownReport?: MutationResultGraph | null;
  createStateTableReport?: MutationResultGraph | null;
  createStatisticElectorateTableReport?: MutationResultGraph | null;
  createStatisticReport?: MutationResultGraph | null;
  sendTest?: MutationResultGraph | null;
}

export interface MutationResultGraph {
  id?: Guid | null;
}

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

export interface AgenciesQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface DisplayGroupProgramsQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface DisplayGroupsQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface DisplayGroupStatisticsQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ElectorateQueryArgs {
  name?: string | null;
}

export interface ElectoratesQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface LatestElectorateReportDataQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
  electorate?: string | null;
  programId?: string | null;
}

export interface LatestElectorateStatisticDataQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
  electorate?: string | null;
  statisticId?: string | null;
}

export interface LatestNationalReportDataQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
  programId?: string | null;
}

export interface LatestNationalStatisticDataQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
  statisticId?: string | null;
}

export interface LatestStateReportDataQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
  state?: string | null;
  programId?: string | null;
}

export interface LatestStateStatisticDataQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
  state?: string | null;
  statisticId?: string | null;
}

export interface PortfoliosQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ProgramsQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface StatisticsQueryArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ProgramDisplayGroupProgramGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface AgencyProgramGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface AppropriationsProgramGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ElectoratesProgramGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ProjectsProgramGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ReportsProgramGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ProgramsElectorateGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ProjectsElectorateGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface StateElectorateGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ElectoratesProjectGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ProgramProjectGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ProjectFundingSnapshotsProjectGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ProjectProjectFundingSnapshotGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ProgramGroupingDisplayGroupGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface StatisticGroupingDisplayGroupGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface StatisticDisplayGroupStatisticGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface AgencyStatisticGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface StatisticReportsStatisticGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ReportVersionReportDataGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface ReportReportVersionGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface StatisticReportVersionStatisticDataGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface StatisticReportStatisticReportVersionGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface AgenciesPortfolioGraphArgs {
  ids?: (string | null)[] | null;
  orderBy?: (OrderByGraph | null)[] | null;
  where?: (WhereExpressionGraph | null)[] | null;
  skip?: number | null;
  take?: number | null;
}

export interface CreateElectorateBarchartReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  electorateBarchartReport?: CreateElectorateBarchartReportGraph | null;
}

export interface CreateElectorateMarkdownReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  electorateMarkdownReport?: CreateElectorateMarkdownReportGraph | null;
}

export interface CreateElectorateTableReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  electorateTableReport?: CreateElectorateTableReportGraph | null;
}

export interface CreateNationalBarchartReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  nationalBarchartReport?: CreateNationalBarchartReportGraph | null;
}

export interface CreateNationalMarkdownReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  nationalMarkdownReport?: CreateNationalMarkdownReportGraph | null;
}

export interface CreateNationalTableReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  nationalTableReport?: CreateNationalTableReportGraph | null;
}

export interface CreateStateBarchartReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  stateBarchartReport?: CreateStateBarchartReportGraph | null;
}

export interface CreateStateMarkdownReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  stateMarkdownReport?: CreateStateMarkdownReportGraph | null;
}

export interface CreateStateTableReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  stateTableReport?: CreateStateTableReportGraph | null;
}

export interface CreateStatisticElectorateTableReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  statisticElectorateTableReport?: CreateStatisticElectorateTableReportGraph | null;
}

export interface CreateStatisticReportMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  statisticReport?: CreateStatisticReportGraph | null;
}

export interface SendTestMutationArgs {
  messageId: Guid
  /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
  ;
  conversationId?: Guid | null
  /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
  ;
  message?: SendTestMessageGraph | null;
}

export enum ComparisonGraph {
  contains = "contains",
  endsWith = "endsWith",
  equal = "equal",
  greaterThan = "greaterThan",
  greaterThanOrEqual = "greaterThanOrEqual",
  in = "in",
  lessThan = "lessThan",
  lessThanOrEqual = "lessThanOrEqual",
  like = "like",
  notEqual = "notEqual",
  startsWith = "startsWith"
}

export enum StringComparison {
  CURRENT_CULTURE = "CURRENT_CULTURE",
  CURRENT_CULTURE_IGNORE_CASE = "CURRENT_CULTURE_IGNORE_CASE",
  INVARIANT_CULTURE = "INVARIANT_CULTURE",
  INVARIANT_CULTURE_IGNORE_CASE = "INVARIANT_CULTURE_IGNORE_CASE",
  ORDINAL = "ORDINAL",
  ORDINAL_IGNORE_CASE = "ORDINAL_IGNORE_CASE"
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    agencies?: AgenciesResolver<(AgencyGraph | null)[] | null, any, Context>;
    displayGroupPrograms?: DisplayGroupProgramsResolver<(DisplayGroupProgramGraph | null)[] | null,
      any,
      Context>;
    displayGroups?: DisplayGroupsResolver<(DisplayGroupGraph | null)[] | null,
      any,
      Context>;
    displayGroupStatistics?: DisplayGroupStatisticsResolver<(DisplayGroupStatisticGraph | null)[] | null,
      any,
      Context>;
    electorate?: ElectorateResolver<ElectorateGraph | null, any, Context>;
    electorates?: ElectoratesResolver<(ElectorateGraph | null)[] | null,
      any,
      Context>;
    latestElectorateReportData?: LatestElectorateReportDataResolver<(ReportDataGraph | null)[] | null,
      any,
      Context>;
    latestElectorateStatisticData?: LatestElectorateStatisticDataResolver<(StatisticDataGraph | null)[] | null,
      any,
      Context>;
    latestNationalReportData?: LatestNationalReportDataResolver<(ReportDataGraph | null)[] | null,
      any,
      Context>;
    latestNationalStatisticData?: LatestNationalStatisticDataResolver<(StatisticDataGraph | null)[] | null,
      any,
      Context>;
    latestStateReportData?: LatestStateReportDataResolver<(ReportDataGraph | null)[] | null,
      any,
      Context>;
    latestStateStatisticData?: LatestStateStatisticDataResolver<(StatisticDataGraph | null)[] | null,
      any,
      Context>;
    portfolios?: PortfoliosResolver<(PortfolioGraph | null)[] | null,
      any,
      Context>;
    programs?: ProgramsResolver<(ProgramGraph | null)[] | null, any, Context>;
    statistics?: StatisticsResolver<(StatisticGraph | null)[] | null,
      any,
      Context>;
  }

  export type AgenciesResolver<R = (AgencyGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, AgenciesArgs>;

  export interface AgenciesArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type DisplayGroupProgramsResolver<R = (DisplayGroupProgramGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, DisplayGroupProgramsArgs>;

  export interface DisplayGroupProgramsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type DisplayGroupsResolver<R = (DisplayGroupGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, DisplayGroupsArgs>;

  export interface DisplayGroupsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type DisplayGroupStatisticsResolver<R = (DisplayGroupStatisticGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, DisplayGroupStatisticsArgs>;

  export interface DisplayGroupStatisticsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type ElectorateResolver<R = ElectorateGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ElectorateArgs>;

  export interface ElectorateArgs {
    name?: string | null;
  }

  export type ElectoratesResolver<R = (ElectorateGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ElectoratesArgs>;

  export interface ElectoratesArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type LatestElectorateReportDataResolver<R = (ReportDataGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, LatestElectorateReportDataArgs>;

  export interface LatestElectorateReportDataArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
    electorate?: string | null;
    programId?: string | null;
  }

  export type LatestElectorateStatisticDataResolver<R = (StatisticDataGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, LatestElectorateStatisticDataArgs>;

  export interface LatestElectorateStatisticDataArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
    electorate?: string | null;
    statisticId?: string | null;
  }

  export type LatestNationalReportDataResolver<R = (ReportDataGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, LatestNationalReportDataArgs>;

  export interface LatestNationalReportDataArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
    programId?: string | null;
  }

  export type LatestNationalStatisticDataResolver<R = (StatisticDataGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, LatestNationalStatisticDataArgs>;

  export interface LatestNationalStatisticDataArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
    statisticId?: string | null;
  }

  export type LatestStateReportDataResolver<R = (ReportDataGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, LatestStateReportDataArgs>;

  export interface LatestStateReportDataArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
    state?: string | null;
    programId?: string | null;
  }

  export type LatestStateStatisticDataResolver<R = (StatisticDataGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, LatestStateStatisticDataArgs>;

  export interface LatestStateStatisticDataArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
    state?: string | null;
    statisticId?: string | null;
  }

  export type PortfoliosResolver<R = (PortfolioGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, PortfoliosArgs>;

  export interface PortfoliosArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type ProgramsResolver<R = (ProgramGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ProgramsArgs>;

  export interface ProgramsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type StatisticsResolver<R = (StatisticGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, StatisticsArgs>;

  export interface StatisticsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }
}

export namespace AgencyGraphResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<Guid, any, Context>;
    metadata?: MetadataResolver<string | null, any, Context>;
    title?: TitleResolver<string, any, Context>;
  }

  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type MetadataResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type TitleResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
}

export namespace DisplayGroupProgramGraphResolvers {
  export interface Resolvers<Context = any> {
    metadata?: MetadataResolver<string, any, Context>;
    program?: ProgramResolver<ProgramGraph | null, any, Context>;
    sortOrder?: SortOrderResolver<UInt32, any, Context>;
  }

  export type MetadataResolver<R = string,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type ProgramResolver<R = ProgramGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ProgramArgs>;

  export interface ProgramArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type SortOrderResolver<R = UInt32,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
}

export namespace ProgramGraphResolvers {
  export interface Resolvers<Context = any> {
    agency?: AgencyResolver<AgencyGraph | null, any, Context>;
    appropriations?: AppropriationsResolver<(AppropriationGraph | null)[] | null,
      any,
      Context>;
    commitments?: CommitmentsResolver<string | null, any, Context>;
    electorates?: ElectoratesResolver<(ElectorateGraph | null)[] | null,
      any,
      Context>;
    id?: IdResolver<Guid, any, Context>;
    name?: NameResolver<string, any, Context>;
    notes?: NotesResolver<string | null, any, Context>;
    projects?: ProjectsResolver<(ProjectGraph | null)[] | null, any, Context>;
    reports?: ReportsResolver<(ReportGraph | null)[] | null, any, Context>;
  }

  export type AgencyResolver<R = AgencyGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, AgencyArgs>;

  export interface AgencyArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type AppropriationsResolver<R = (AppropriationGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, AppropriationsArgs>;

  export interface AppropriationsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type CommitmentsResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type ElectoratesResolver<R = (ElectorateGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ElectoratesArgs>;

  export interface ElectoratesArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NotesResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type ProjectsResolver<R = (ProjectGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ProjectsArgs>;

  export interface ProjectsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type ReportsResolver<R = (ReportGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ReportsArgs>;

  export interface ReportsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }
}

export namespace AppropriationGraphResolvers {
  export interface Resolvers<Context = any> {
    budgetYear?: BudgetYearResolver<UInt32 | null, any, Context>;
    dollars?: DollarsResolver<UInt32, any, Context>;
    financialYear?: FinancialYearResolver<string, any, Context>;
    id?: IdResolver<Guid, any, Context>;
  }

  export type BudgetYearResolver<R = UInt32 | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type DollarsResolver<R = UInt32,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type FinancialYearResolver<R = string,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
}

export namespace ElectorateGraphResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<Guid, any, Context>;
    member?: MemberResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    party?: PartyResolver<string, any, Context>;
    percentOfStatePopulation?: PercentOfStatePopulationResolver<number,
      any,
      Context>;
    population?: PopulationResolver<UInt32, any, Context>;
    programs?: ProgramsResolver<(ProgramGraph | null)[] | null, any, Context>;
    projects?: ProjectsResolver<(ProjectGraph | null)[] | null, any, Context>;
    state?: StateResolver<StateGraph | null, any, Context>;
  }

  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type MemberResolver<R = string,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type PartyResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type PercentOfStatePopulationResolver<R = number,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type PopulationResolver<R = UInt32,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type ProgramsResolver<R = (ProgramGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ProgramsArgs>;

  export interface ProgramsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type ProjectsResolver<R = (ProjectGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ProjectsArgs>;

  export interface ProjectsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type StateResolver<R = StateGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, StateArgs>;

  export interface StateArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }
}

export namespace ProjectGraphResolvers {
  export interface Resolvers<Context = any> {
    electorates?: ElectoratesResolver<(ElectorateGraph | null)[] | null,
      any,
      Context>;
    id?: IdResolver<Guid, any, Context>;
    name?: NameResolver<string, any, Context>;
    notes?: NotesResolver<string | null, any, Context>;
    program?: ProgramResolver<ProgramGraph | null, any, Context>;
    projectFundingSnapshots?: ProjectFundingSnapshotsResolver<(ProjectFundingSnapshotGraph | null)[] | null,
      any,
      Context>;
    status?: StatusResolver<string, any, Context>;
  }

  export type ElectoratesResolver<R = (ElectorateGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ElectoratesArgs>;

  export interface ElectoratesArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NotesResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type ProgramResolver<R = ProgramGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ProgramArgs>;

  export interface ProgramArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type ProjectFundingSnapshotsResolver<R = (ProjectFundingSnapshotGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ProjectFundingSnapshotsArgs>;

  export interface ProjectFundingSnapshotsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type StatusResolver<R = string,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
}

export namespace ProjectFundingSnapshotGraphResolvers {
  export interface Resolvers<Context = any> {
    committed?: CommittedResolver<UInt32, any, Context>;
    id?: IdResolver<Guid, any, Context>;
    project?: ProjectResolver<ProjectGraph | null, any, Context>;
    spent?: SpentResolver<UInt32, any, Context>;
    timestamp?: TimestampResolver<DateTimeOffset, any, Context>;
  }

  export type CommittedResolver<R = UInt32,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type ProjectResolver<R = ProjectGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ProjectArgs>;

  export interface ProjectArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type SpentResolver<R = UInt32, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type TimestampResolver<R = DateTimeOffset,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
}

export namespace StateGraphResolvers {
  export interface Resolvers<Context = any> {
    abbreviation?: AbbreviationResolver<string, any, Context>;
    id?: IdResolver<Guid, any, Context>;
    name?: NameResolver<string, any, Context>;
    population?: PopulationResolver<UInt32, any, Context>;
  }

  export type AbbreviationResolver<R = string,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type PopulationResolver<R = UInt32,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
}

export namespace ReportGraphResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<Guid, any, Context>;
    name?: NameResolver<string, any, Context>;
    notes?: NotesResolver<string | null, any, Context>;
  }

  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NotesResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
}

export namespace DisplayGroupGraphResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<Guid, any, Context>;
    metadata?: MetadataResolver<string, any, Context>;
    parentId?: ParentIdResolver<Guid | null, any, Context>;
    programGrouping?: ProgramGroupingResolver<(DisplayGroupProgramGraph | null)[] | null,
      any,
      Context>;
    sortOrder?: SortOrderResolver<UInt32, any, Context>;
    statisticGrouping?: StatisticGroupingResolver<(DisplayGroupStatisticGraph | null)[] | null,
      any,
      Context>;
    title?: TitleResolver<string, any, Context>;
  }

  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type MetadataResolver<R = string,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type ParentIdResolver<R = Guid | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type ProgramGroupingResolver<R = (DisplayGroupProgramGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ProgramGroupingArgs>;

  export interface ProgramGroupingArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type SortOrderResolver<R = UInt32,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type StatisticGroupingResolver<R = (DisplayGroupStatisticGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, StatisticGroupingArgs>;

  export interface StatisticGroupingArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type TitleResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
}

export namespace DisplayGroupStatisticGraphResolvers {
  export interface Resolvers<Context = any> {
    metadata?: MetadataResolver<string, any, Context>;
    sortOrder?: SortOrderResolver<UInt32, any, Context>;
    statistic?: StatisticResolver<StatisticGraph | null, any, Context>;
  }

  export type MetadataResolver<R = string,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type SortOrderResolver<R = UInt32,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type StatisticResolver<R = StatisticGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, StatisticArgs>;

  export interface StatisticArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }
}

export namespace StatisticGraphResolvers {
  export interface Resolvers<Context = any> {
    agency?: AgencyResolver<AgencyGraph | null, any, Context>;
    id?: IdResolver<Guid, any, Context>;
    name?: NameResolver<string, any, Context>;
    statisticReports?: StatisticReportsResolver<(StatisticReportGraph | null)[] | null,
      any,
      Context>;
  }

  export type AgencyResolver<R = AgencyGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, AgencyArgs>;

  export interface AgencyArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type StatisticReportsResolver<R = (StatisticReportGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, StatisticReportsArgs>;

  export interface StatisticReportsArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }
}

export namespace StatisticReportGraphResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<Guid, any, Context>;
    name?: NameResolver<string, any, Context>;
    notes?: NotesResolver<string | null, any, Context>;
  }

  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NotesResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
}

export namespace ReportDataGraphResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Json | null, any, Context>;
    id?: IdResolver<Guid, any, Context>;
    reportVersion?: ReportVersionResolver<ReportVersionGraph | null,
      any,
      Context>;
  }

  export type DataResolver<R = Json | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type ReportVersionResolver<R = ReportVersionGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ReportVersionArgs>;

  export interface ReportVersionArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }
}

export namespace ReportVersionGraphResolvers {
  export interface Resolvers<Context = any> {
    dataDate?: DataDateResolver<DateTimeOffset, any, Context>;
    id?: IdResolver<Guid, any, Context>;
    notes?: NotesResolver<string, any, Context>;
    report?: ReportResolver<ReportGraph | null, any, Context>;
    reportFormat?: ReportFormatResolver<string | null, any, Context>;
    schema?: SchemaResolver<string | null, any, Context>;
    timestamp?: TimestampResolver<DateTimeOffset, any, Context>;
  }

  export type DataDateResolver<R = DateTimeOffset,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NotesResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type ReportResolver<R = ReportGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, ReportArgs>;

  export interface ReportArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type ReportFormatResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type SchemaResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type TimestampResolver<R = DateTimeOffset,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
}

export namespace StatisticDataGraphResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Json | null, any, Context>;
    id?: IdResolver<Guid, any, Context>;
    statisticReportVersion?: StatisticReportVersionResolver<StatisticReportVersionGraph | null,
      any,
      Context>;
  }

  export type DataResolver<R = Json | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type StatisticReportVersionResolver<R = StatisticReportVersionGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, StatisticReportVersionArgs>;

  export interface StatisticReportVersionArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }
}

export namespace StatisticReportVersionGraphResolvers {
  export interface Resolvers<Context = any> {
    dataDate?: DataDateResolver<DateTimeOffset, any, Context>;
    id?: IdResolver<Guid, any, Context>;
    notes?: NotesResolver<string, any, Context>;
    reportFormat?: ReportFormatResolver<string | null, any, Context>;
    schema?: SchemaResolver<string, any, Context>;
    statisticReport?: StatisticReportResolver<StatisticReportGraph | null,
      any,
      Context>;
    timestamp?: TimestampResolver<DateTimeOffset, any, Context>;
  }

  export type DataDateResolver<R = DateTimeOffset,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type NotesResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type ReportFormatResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type SchemaResolver<R = string,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type StatisticReportResolver<R = StatisticReportGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, StatisticReportArgs>;

  export interface StatisticReportArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type TimestampResolver<R = DateTimeOffset,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
}

export namespace PortfolioGraphResolvers {
  export interface Resolvers<Context = any> {
    agencies?: AgenciesResolver<(AgencyGraph | null)[] | null, any, Context>;
    id?: IdResolver<Guid, any, Context>;
    metadata?: MetadataResolver<string | null, any, Context>;
    title?: TitleResolver<string, any, Context>;
  }

  export type AgenciesResolver<R = (AgencyGraph | null)[] | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, AgenciesArgs>;

  export interface AgenciesArgs {
    ids?: (string | null)[] | null;
    orderBy?: (OrderByGraph | null)[] | null;
    where?: (WhereExpressionGraph | null)[] | null;
    skip?: number | null;
    take?: number | null;
  }

  export type IdResolver<R = Guid, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
  export type MetadataResolver<R = string | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
  export type TitleResolver<R = string, Parent = any, Context = any> = Resolver<R,
    Parent,
    Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    createElectorateBarchartReport?: CreateElectorateBarchartReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createElectorateMarkdownReport?: CreateElectorateMarkdownReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createElectorateTableReport?: CreateElectorateTableReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createNationalBarchartReport?: CreateNationalBarchartReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createNationalMarkdownReport?: CreateNationalMarkdownReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createNationalTableReport?: CreateNationalTableReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createStateBarchartReport?: CreateStateBarchartReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createStateMarkdownReport?: CreateStateMarkdownReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createStateTableReport?: CreateStateTableReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createStatisticElectorateTableReport?: CreateStatisticElectorateTableReportResolver<MutationResultGraph | null,
      any,
      Context>;
    createStatisticReport?: CreateStatisticReportResolver<MutationResultGraph | null,
      any,
      Context>;
    sendTest?: SendTestResolver<MutationResultGraph | null, any, Context>;
  }

  export type CreateElectorateBarchartReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateElectorateBarchartReportArgs>;

  export interface CreateElectorateBarchartReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    electorateBarchartReport?: CreateElectorateBarchartReportGraph | null;
  }

  export type CreateElectorateMarkdownReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateElectorateMarkdownReportArgs>;

  export interface CreateElectorateMarkdownReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    electorateMarkdownReport?: CreateElectorateMarkdownReportGraph | null;
  }

  export type CreateElectorateTableReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateElectorateTableReportArgs>;

  export interface CreateElectorateTableReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    electorateTableReport?: CreateElectorateTableReportGraph | null;
  }

  export type CreateNationalBarchartReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateNationalBarchartReportArgs>;

  export interface CreateNationalBarchartReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    nationalBarchartReport?: CreateNationalBarchartReportGraph | null;
  }

  export type CreateNationalMarkdownReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateNationalMarkdownReportArgs>;

  export interface CreateNationalMarkdownReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    nationalMarkdownReport?: CreateNationalMarkdownReportGraph | null;
  }

  export type CreateNationalTableReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateNationalTableReportArgs>;

  export interface CreateNationalTableReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    nationalTableReport?: CreateNationalTableReportGraph | null;
  }

  export type CreateStateBarchartReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateStateBarchartReportArgs>;

  export interface CreateStateBarchartReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    stateBarchartReport?: CreateStateBarchartReportGraph | null;
  }

  export type CreateStateMarkdownReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateStateMarkdownReportArgs>;

  export interface CreateStateMarkdownReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    stateMarkdownReport?: CreateStateMarkdownReportGraph | null;
  }

  export type CreateStateTableReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateStateTableReportArgs>;

  export interface CreateStateTableReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    stateTableReport?: CreateStateTableReportGraph | null;
  }

  export type CreateStatisticElectorateTableReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateStatisticElectorateTableReportArgs>;

  export interface CreateStatisticElectorateTableReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    statisticElectorateTableReport?: CreateStatisticElectorateTableReportGraph | null;
  }

  export type CreateStatisticReportResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, CreateStatisticReportArgs>;

  export interface CreateStatisticReportArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    statisticReport?: CreateStatisticReportGraph | null;
  }

  export type SendTestResolver<R = MutationResultGraph | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context, SendTestArgs>;

  export interface SendTestArgs {
    messageId: Guid
    /** Every request requires a unique identity. If, due to connectivity issues, a request needs to be retried, every retry should use the same value for messageId. */
    ;
    conversationId?: Guid | null
    /** Used for debugging purposes to correlate between multiple client requests. The same conversationId should shared across all requests that are related. So on the initial request, a new guid is created, and used for that request and all other related requests that are performed. */
    ;
    message?: SendTestMessageGraph | null;
  }
}

export namespace MutationResultGraphResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<Guid | null, any, Context>;
  }

  export type IdResolver<R = Guid | null,
    Parent = any,
    Context = any> = Resolver<R, Parent, Context>;
}

export namespace AllAgencies {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    agencies?: (Agencies | null)[] | null;
  };

  export type Agencies = {
    __typename?: "AgencyGraph";
    id: Guid;
    metadata?: string | null;
    title: string;
  };
}

export namespace AllStatistics {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    statistics?: (Statistics | null)[] | null;
  };

  export type Statistics = {
    __typename?: "StatisticGraph";
    id: Guid;
    name: string;
    agency?: Agency | null;
    statisticReports?: (StatisticReports | null)[] | null;
  };

  export type Agency = {
    __typename?: "AgencyGraph";
    id: Guid;
    title: string;
  };

  export type StatisticReports = {
    __typename?: "StatisticReportGraph";
    id: Guid;
    name: string;
    notes?: string | null;
  };
}



export namespace AllPortfolios {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    portfolios?: (Portfolios | null)[] | null;
  };

  export type Portfolios = {
    __typename?: "PortfolioGraph";
    id: Guid;
    title: string;
    metadata?: string | null;
    agencies?: (Agencies | null)[] | null;
  };

  export type Agencies = {
    __typename?: "AgencyGraph";
    id: Guid;
    metadata?: string | null;
    title: string;
  };
}

import {Injectable} from "@angular/core";

import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class AllAgenciesGQL extends Apollo.Query<AllAgencies.Query,
  AllAgencies.Variables> {
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
  providedIn: "root"
})
export class AllPortfoliosGQL extends Apollo.Query<AllPortfolios.Query,
  AllPortfolios.Variables> {
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


export namespace MutatePortfolio {
  export type Variables = {
    portfolio: ModifyPortfolioGraph;
    messageId: Guid;
    conversationId: Guid;
  };

  export type Mutation = {
    __typename?: "Mutation";
    modifyPortfolio?: ModifyPortfolio | null;
  };

  export type ModifyPortfolio = {
    __typename?: "MutationResultGraph";
    id?: Guid | null;
  };
}


export interface ModifyPortfolioGraph {
  id: Guid;
  title: string;
  metadata?: string | null;
}


@Injectable({
  providedIn: "root"
})
export class MutatePortfolioGQL extends Apollo.Mutation<MutatePortfolio.Mutation,
  MutatePortfolio.Variables> {
  document: any = gql`
    mutation mutatePortfolio(
      $portfolio: ModifyPortfolioGraph!
      $messageId: Guid!
      $conversationId: Guid!
    ) {
      modifyPortfolio(
        messageId: $messageId
        conversationId: $conversationId
        portfolio: $portfolio
      ) {
        id
      }
    }
  `;
}

@Injectable({
  providedIn: "root"
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




