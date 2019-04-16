type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Guid */
  Guid: any
  /** The `DateTimeOffset` scalar type represents a date, time and offset from UTC.
   * `DateTimeOffset` expects timestamps to be formatted in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
   */
  DateTimeOffset: any
  /** UInt32 */
  UInt32: any
  /** For passing untyped JSON */
  Json: any
  /** The `Date` scalar type represents a year, month and day in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard (yyyy-MM-dd).
   */
  Date: any
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects
   * timestamps to be formatted in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
   */
  DateTime: any
  Decimal: any
  /** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
  Milliseconds: any
  /** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
  Seconds: any
}

export type ActivateElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
}

export type AgencyGraph = {
  id: Scalars['Guid']
  metadata?: Maybe<Scalars['String']>
  portfolio?: Maybe<PortfolioGraph>
  portfolioId: Scalars['Guid']
  rowVersion: Scalars['String']
  title: Scalars['String']
}

export type AgencyGraphPortfolioArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type AnnouncementTypeGraph = {
  colour: Scalars['String']
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  description: Scalars['String']
  icon: Scalars['String']
  id: Scalars['Int']
  inactive: Scalars['Boolean']
  internalVersion: Scalars['UInt32']
  sortOrder: Scalars['Int']
  title: Scalars['String']
}

export type AnnouncementTypeGraphCommitmentsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type AppropriationGraph = {
  budget?: Maybe<BudgetGraph>
  budgetId: Scalars['Guid']
  budgetYear?: Maybe<Scalars['UInt32']>
  dollars: Scalars['UInt32']
  financialYear: Scalars['String']
  id: Scalars['Guid']
  program?: Maybe<ProgramGraph>
  programId: Scalars['Guid']
  rowVersion: Scalars['String']
}

export type AppropriationGraphBudgetArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type AppropriationGraphProgramArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type BudgetGraph = {
  appropriations?: Maybe<Array<Maybe<AppropriationGraph>>>
  id: Scalars['Guid']
  rowVersion: Scalars['String']
  year: Scalars['UInt32']
}

export type BudgetGraphAppropriationsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ColumnGraph = {
  parentLabel?: Maybe<Scalars['String']>
  format: Scalars['String']
  label: Scalars['String']
}

export type CommitmentElectorateGraph = {
  commitment?: Maybe<CommitmentGraph>
  commitmentId: Scalars['Int']
  description: Scalars['String']
  electorate?: Maybe<ElectorateGraph>
  electorateId: Scalars['Guid']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type CommitmentElectorateGraphCommitmentArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentElectorateGraphElectorateArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentGraph = {
  announcedBy?: Maybe<Scalars['String']>
  announcementType?: Maybe<AnnouncementTypeGraph>
  announcementTypeId?: Maybe<Scalars['Int']>
  bookType: Scalars['String']
  commitmentElectorates?: Maybe<Array<Maybe<CommitmentElectorateGraph>>>
  commitmentMapPoints?: Maybe<Array<Maybe<CommitmentMapPointGraph>>>
  commitmentPackageTypes?: Maybe<Array<Maybe<CommitmentPackageTypeGraph>>>
  commitmentPortfolioLookups?: Maybe<
    Array<Maybe<CommitmentPortfolioLookupGraph>>
  >
  commitmentType?: Maybe<CommitmentTypeGraph>
  commitmentTypeId: Scalars['Int']
  cost?: Maybe<Scalars['String']>
  criticalDate?: Maybe<CriticalDateGraph>
  criticalDateId?: Maybe<Scalars['Int']>
  date: Scalars['DateTimeOffset']
  description: Scalars['String']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  politicalParty: Scalars['String']
  portfolioLookup?: Maybe<PortfolioLookupGraph>
  portfolioLookupId?: Maybe<Scalars['Int']>
  status: Scalars['String']
  title: Scalars['String']
}

export type CommitmentGraphAnnouncedByArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentGraphAnnouncementTypeArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentGraphCommitmentElectoratesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentGraphCommitmentMapPointsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentGraphCommitmentPackageTypesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentGraphCommitmentPortfolioLookupsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentGraphCommitmentTypeArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentGraphCriticalDateArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentGraphPortfolioLookupArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentMapPointGraph = {
  commitment?: Maybe<CommitmentGraph>
  commitmentId: Scalars['Int']
  description: Scalars['String']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  mapPoint?: Maybe<MapPointGraph>
  mapPointId: Scalars['Int']
  title: Scalars['String']
}

export type CommitmentMapPointGraphCommitmentArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentMapPointGraphMapPointArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentPackageTypeGraph = {
  commitment?: Maybe<CommitmentGraph>
  commitmentId: Scalars['Int']
  description: Scalars['String']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  packageType?: Maybe<PackageTypeGraph>
  packageTypeId: Scalars['Int']
  primaryPackage: Scalars['Boolean']
  title: Scalars['String']
}

export type CommitmentPackageTypeGraphCommitmentArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentPackageTypeGraphPackageTypeArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentPortfolioLookupGraph = {
  commitment?: Maybe<CommitmentGraph>
  commitmentId: Scalars['Int']
  description: Scalars['String']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  portfolioLookup?: Maybe<PortfolioLookupGraph>
  portfolioLookupId: Scalars['Int']
  primaryPortfolio: Scalars['Boolean']
  title: Scalars['String']
}

export type CommitmentPortfolioLookupGraphCommitmentArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentPortfolioLookupGraphPortfolioLookupArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type CommitmentRefinerGraph = {
  commitmentTypes?: Maybe<Array<Maybe<Scalars['Int']>>>
  criticalDates?: Maybe<Array<Maybe<Scalars['Int']>>>
  portfolioLookups?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type CommitmentTypeGraph = {
  colour: Scalars['String']
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  description: Scalars['String']
  icon: Scalars['String']
  id: Scalars['Int']
  inactive: Scalars['Boolean']
  internalVersion: Scalars['UInt32']
  sortOrder: Scalars['Int']
  title: Scalars['String']
}

export type CommitmentTypeGraphCommitmentsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
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

export type CreateElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
  electorateId: Scalars['Guid']
  advice: Scalars['String']
}

export type CreateElectorateBarchartReportGraph = {
  reportId: Scalars['Guid']
  notes?: Maybe<Scalars['String']>
  dataDate: Scalars['DateTimeOffset']
  electorateData?: Maybe<Array<Maybe<ElectorateChartDataGraph>>>
}

export type CreateElectorateMarkdownReportGraph = {
  reportId: Scalars['Guid']
  notes?: Maybe<Scalars['String']>
  dataDate: Scalars['DateTimeOffset']
  electorateData?: Maybe<Array<Maybe<ElectorateDataMarkdownGraph>>>
}

export type CreateElectorateTableReportGraph = {
  reportId: Scalars['Guid']
  schema?: Maybe<SchemaGraph>
  notes?: Maybe<Scalars['String']>
  dataDate: Scalars['DateTimeOffset']
  electorateData?: Maybe<Array<Maybe<ElectorateDataGraph>>>
}

export type CreateNationalBarchartReportGraph = {
  reportId: Scalars['Guid']
  notes?: Maybe<Scalars['String']>
  dataDate?: Maybe<Scalars['Date']>
  nationalData?: Maybe<SeriesChartGraph>
}

export type CreateNationalMarkdownReportGraph = {
  reportId: Scalars['Guid']
  notes?: Maybe<Scalars['String']>
  dataDate?: Maybe<Scalars['Date']>
  nationalData?: Maybe<NationalDataGraph>
}

export type CreateNationalTableReportGraph = {
  reportId: Scalars['Guid']
  schema?: Maybe<SchemaGraph>
  notes?: Maybe<Scalars['String']>
  dataDate: Scalars['DateTimeOffset']
  nationalData?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>
}

export type CreateStateBarchartReportGraph = {
  reportId: Scalars['Guid']
  notes?: Maybe<Scalars['String']>
  dataDate: Scalars['DateTimeOffset']
  stateData?: Maybe<Array<Maybe<StateChartDataGraph>>>
}

export type CreateStateMarkdownReportGraph = {
  reportId: Scalars['Guid']
  notes?: Maybe<Scalars['String']>
  dataDate: Scalars['DateTimeOffset']
  stateData?: Maybe<Array<Maybe<StateDataMarkdownGraph>>>
}

export type CreateStateTableReportGraph = {
  reportId: Scalars['Guid']
  schema?: Maybe<SchemaGraph>
  notes?: Maybe<Scalars['String']>
  dataDate: Scalars['DateTimeOffset']
  stateData?: Maybe<Array<Maybe<StateDataGraph>>>
}

export type CreateStatisticElectorateTableReportGraph = {
  statisticReportId: Scalars['Guid']
  schema?: Maybe<SchemaGraph>
  dataDate: Scalars['DateTimeOffset']
  electorateData?: Maybe<Array<Maybe<ElectorateDataGraph>>>
}

export type CreateStatisticReportGraph = {
  name: Scalars['String']
  notes: Scalars['String']
  statisticId: Scalars['Guid']
}

export type CriticalDateGraph = {
  colour: Scalars['String']
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  description: Scalars['String']
  icon: Scalars['String']
  id: Scalars['Int']
  inactive: Scalars['Boolean']
  internalVersion: Scalars['UInt32']
  sortOrder: Scalars['Int']
  title: Scalars['String']
}

export type CriticalDateGraphCommitmentsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type DeactivateElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
}

export type ElectorateAdviceGraph = {
  active: Scalars['Boolean']
  advice: Scalars['String']
  createdById: Scalars['Guid']
  electorate?: Maybe<ElectorateGraph>
  electorateId: Scalars['Guid']
  id: Scalars['Guid']
  timestamp: Scalars['DateTimeOffset']
}

export type ElectorateAdviceGraphElectorateArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ElectorateChartDataGraph = {
  electorateId: Scalars['Guid']
  data?: Maybe<SeriesChartGraph>
}

export type ElectorateDataGraph = {
  data?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>
  electorateId: Scalars['Guid']
}

export type ElectorateDataMarkdownGraph = {
  electorateId: Scalars['Guid']
  data?: Maybe<MarkdownGraph>
}

export type ElectorateGraph = {
  electorateAdvice?: Maybe<Array<Maybe<ElectorateAdviceGraph>>>
  id: Scalars['Guid']
  member: Scalars['String']
  name: Scalars['String']
  party: Scalars['String']
  percentOfStatePopulation: Scalars['Float']
  population: Scalars['UInt32']
  programs?: Maybe<Array<Maybe<ProgramGraph>>>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  rowVersion: Scalars['String']
  state?: Maybe<StateGraph>
  stateId: Scalars['Guid']
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
}

export type ElectorateGraphElectorateAdviceArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ElectorateGraphProgramsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ElectorateGraphProjectsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ElectorateGraphStateArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type MapPointGraph = {
  commitmentMapPoints?: Maybe<Array<Maybe<CommitmentMapPointGraph>>>
  description: Scalars['String']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  latitude: Scalars['Float']
  longitude: Scalars['Float']
  placeId: Scalars['String']
  title: Scalars['String']
}

export type MapPointGraphCommitmentMapPointsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type MarkdownGraph = {
  text: Scalars['String']
}

export type ModifyElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
  advice: Scalars['String']
}

export type Mutation = {
  activateElectorateAdvice?: Maybe<MutationResultGraph>
  createElectorateAdvice?: Maybe<MutationResultGraph>
  createElectorateBarchartReport?: Maybe<MutationResultGraph>
  createElectorateMarkdownReport?: Maybe<MutationResultGraph>
  createElectorateTableReport?: Maybe<MutationResultGraph>
  createNationalBarchartReport?: Maybe<MutationResultGraph>
  createNationalMarkdownReport?: Maybe<MutationResultGraph>
  createNationalTableReport?: Maybe<MutationResultGraph>
  createStateBarchartReport?: Maybe<MutationResultGraph>
  createStateMarkdownReport?: Maybe<MutationResultGraph>
  createStateTableReport?: Maybe<MutationResultGraph>
  createStatisticElectorateTableReport?: Maybe<MutationResultGraph>
  createStatisticReport?: Maybe<MutationResultGraph>
  deactivateElectorateAdvice?: Maybe<MutationResultGraph>
  modifyElectorateAdvice?: Maybe<MutationResultGraph>
  requestElectorateBrief?: Maybe<MutationResultGraph>
  testMessage?: Maybe<MutationResultGraph>
}

export type MutationActivateElectorateAdviceArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  advice: ActivateElectorateAdviceGraph
}

export type MutationCreateElectorateAdviceArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  advice: CreateElectorateAdviceGraph
}

export type MutationCreateElectorateBarchartReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  electorateBarchartReport: CreateElectorateBarchartReportGraph
}

export type MutationCreateElectorateMarkdownReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  electorateMarkdownReport: CreateElectorateMarkdownReportGraph
}

export type MutationCreateElectorateTableReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  electorateTableReport: CreateElectorateTableReportGraph
}

export type MutationCreateNationalBarchartReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  nationalBarchartReport: CreateNationalBarchartReportGraph
}

export type MutationCreateNationalMarkdownReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  nationalMarkdownReport: CreateNationalMarkdownReportGraph
}

export type MutationCreateNationalTableReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  nationalTableReport: CreateNationalTableReportGraph
}

export type MutationCreateStateBarchartReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  stateBarchartReport: CreateStateBarchartReportGraph
}

export type MutationCreateStateMarkdownReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  stateMarkdownReport: CreateStateMarkdownReportGraph
}

export type MutationCreateStateTableReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  stateTableReport: CreateStateTableReportGraph
}

export type MutationCreateStatisticElectorateTableReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  statisticElectorateTableReport: CreateStatisticElectorateTableReportGraph
}

export type MutationCreateStatisticReportArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  statisticReport: CreateStatisticReportGraph
}

export type MutationDeactivateElectorateAdviceArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  advice: DeactivateElectorateAdviceGraph
}

export type MutationModifyElectorateAdviceArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  advice: ModifyElectorateAdviceGraph
}

export type MutationRequestElectorateBriefArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  requestElectorateBrief: RequestElectorateBriefGraph
}

export type MutationTestMessageArgs = {
  messageId: Scalars['Guid']
  conversationId: Scalars['Guid']
  message: SendTestMessageGraph
}

export type MutationResultGraph = {
  id?: Maybe<Scalars['Guid']>
}

export type NationalDataGraph = {
  data?: Maybe<MarkdownGraph>
}

export type OrderByGraph = {
  path: Scalars['String']
  descending?: Maybe<Scalars['Boolean']>
}

export type PackageTypeGraph = {
  colour: Scalars['String']
  commitmentPackageTypes?: Maybe<Array<Maybe<CommitmentPackageTypeGraph>>>
  description: Scalars['String']
  icon: Scalars['String']
  id: Scalars['Int']
  inactive: Scalars['Boolean']
  internalVersion: Scalars['UInt32']
  sortOrder: Scalars['Int']
  title: Scalars['String']
}

export type PackageTypeGraphCommitmentPackageTypesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type PortfolioGraph = {
  agencies?: Maybe<Array<Maybe<AgencyGraph>>>
  id: Scalars['Guid']
  metadata?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  title: Scalars['String']
}

export type PortfolioGraphAgenciesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type PortfolioLookupGraph = {
  colour: Scalars['String']
  commitmentPortfolioLookups?: Maybe<
    Array<Maybe<CommitmentPortfolioLookupGraph>>
  >
  description: Scalars['String']
  icon: Scalars['String']
  id: Scalars['Int']
  inactive: Scalars['Boolean']
  internalVersion: Scalars['UInt32']
  sortOrder: Scalars['Int']
  title: Scalars['String']
}

export type PortfolioLookupGraphCommitmentPortfolioLookupsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProgramGraph = {
  agency?: Maybe<AgencyGraph>
  appropriations?: Maybe<Array<Maybe<AppropriationGraph>>>
  commitments?: Maybe<Scalars['String']>
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  id: Scalars['Guid']
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  programSubmissions?: Maybe<Array<Maybe<ProgramSubmissionGraph>>>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  reports?: Maybe<Array<Maybe<ReportGraph>>>
}

export type ProgramGraphAgencyArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProgramGraphAppropriationsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProgramGraphElectoratesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProgramGraphProgramSubmissionsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProgramGraphProjectsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
  electorate: Scalars['String']
}

export type ProgramGraphReportsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProgramSubmissionGraph = {
  dataDate: Scalars['DateTimeOffset']
  id: Scalars['Guid']
  program?: Maybe<ProgramGraph>
  programId: Scalars['Guid']
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  submittedById: Scalars['Guid']
  timeStamp: Scalars['DateTimeOffset']
}

export type ProgramSubmissionGraphProgramArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProgramSubmissionGraphProjectsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProjectGraph = {
  committed: Scalars['UInt32']
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  end?: Maybe<Scalars['String']>
  id: Scalars['Guid']
  markdown?: Maybe<Scalars['String']>
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  organisation?: Maybe<Scalars['String']>
  program?: Maybe<ProgramGraph>
  programSubmission?: Maybe<ProgramSubmissionGraph>
  sensitivities?: Maybe<Scalars['String']>
  spent: Scalars['UInt32']
  start?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
}

export type ProjectGraphElectoratesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProjectGraphProgramArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ProjectGraphProgramSubmissionArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type Query = {
  agencies?: Maybe<Array<Maybe<AgencyGraph>>>
  agency?: Maybe<AgencyGraph>
  announcementTypes?: Maybe<Array<Maybe<AnnouncementTypeGraph>>>
  commitmentElectorates?: Maybe<Array<Maybe<CommitmentElectorateGraph>>>
  commitmentMapPoints?: Maybe<Array<Maybe<CommitmentMapPointGraph>>>
  commitmentPackageTypes?: Maybe<Array<Maybe<CommitmentPackageTypeGraph>>>
  commitmentPortfolioLookups?: Maybe<
    Array<Maybe<CommitmentPortfolioLookupGraph>>
  >
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  commitmentTypes?: Maybe<Array<Maybe<CommitmentTypeGraph>>>
  criticalDates?: Maybe<Array<Maybe<CriticalDateGraph>>>
  electorate?: Maybe<ElectorateGraph>
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  mapPoints?: Maybe<Array<Maybe<MapPointGraph>>>
  packageTypes?: Maybe<Array<Maybe<PackageTypeGraph>>>
  portfolioLookups?: Maybe<Array<Maybe<PortfolioLookupGraph>>>
  portfolios?: Maybe<Array<Maybe<PortfolioGraph>>>
  program?: Maybe<ProgramGraph>
  programs?: Maybe<Array<Maybe<ProgramGraph>>>
  programSubmission?: Maybe<ProgramSubmissionGraph>
  programSubmissions?: Maybe<Array<Maybe<ProgramSubmissionGraph>>>
  project?: Maybe<ProjectGraph>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  report?: Maybe<ReportGraph>
  reports?: Maybe<Array<Maybe<ReportGraph>>>
  state?: Maybe<StateGraph>
  states?: Maybe<Array<Maybe<StateGraph>>>
  statistic?: Maybe<StatisticGraph>
  statisticReport?: Maybe<StatisticReportGraph>
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  statistics?: Maybe<Array<Maybe<StatisticGraph>>>
}

export type QueryAgenciesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryAgencyArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryAnnouncementTypesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryCommitmentElectoratesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryCommitmentMapPointsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryCommitmentPackageTypesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryCommitmentPortfolioLookupsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryCommitmentsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
  refiner: CommitmentRefinerGraph
}

export type QueryCommitmentTypesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryCriticalDatesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryElectorateArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryElectoratesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryMapPointsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryPackageTypesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryPortfolioLookupsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryPortfoliosArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryProgramArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryProgramsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryProgramSubmissionArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryProgramSubmissionsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryProjectArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryProjectsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
  electorate: Scalars['String']
}

export type QueryReportArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryReportsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryStateArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryStatesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryStatisticArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryStatisticReportArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryStatisticReportsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryStatisticsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ReportDataGraph = {
  data?: Maybe<Scalars['Json']>
  id: Scalars['Guid']
  reportVersion?: Maybe<ReportVersionGraph>
}

export type ReportDataGraphReportVersionArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ReportGraph = {
  data?: Maybe<ReportDataGraph>
  id: Scalars['Guid']
  latestVersion?: Maybe<ReportVersionGraph>
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  program?: Maybe<ProgramGraph>
  programId: Scalars['Guid']
  reportVersions?: Maybe<Array<Maybe<ReportVersionGraph>>>
  rowVersion: Scalars['String']
}

export type ReportGraphDataArgs = {
  electorate: Scalars['String']
}

export type ReportGraphProgramArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ReportGraphReportVersionsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ReportVersionGraph = {
  dataDate: Scalars['DateTimeOffset']
  electorateData?: Maybe<Scalars['Json']>
  id: Scalars['Guid']
  nationalData?: Maybe<Scalars['Json']>
  notes?: Maybe<Scalars['String']>
  report?: Maybe<ReportGraph>
  reportData?: Maybe<Array<Maybe<ReportDataGraph>>>
  reportFormat?: Maybe<Scalars['String']>
  reportId: Scalars['Guid']
  rowVersion: Scalars['String']
  schema?: Maybe<Scalars['Json']>
  timestamp: Scalars['DateTimeOffset']
}

export type ReportVersionGraphElectorateDataArgs = {
  electorate: Scalars['String']
}

export type ReportVersionGraphReportArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ReportVersionGraphReportDataArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type ReportVersionGraphSchemaArgs = {
  electorate: Scalars['String']
}

export type RequestElectorateBriefGraph = {
  electorateId: Scalars['Guid']
  userId: Scalars['Guid']
}

export type RowGraph = {
  label: Scalars['String']
  format?: Maybe<Scalars['String']>
}

export type SchemaGraph = {
  columns?: Maybe<Array<Maybe<ColumnGraph>>>
  rows?: Maybe<Array<Maybe<RowGraph>>>
}

export type SendTestMessageGraph = {
  content: Scalars['String']
}

export type SeriesChartGraph = {
  title: Scalars['String']
  type: Scalars['String']
  xAxisLabel?: Maybe<Scalars['String']>
  data?: Maybe<Array<Maybe<SeriesDataGraph>>>
}

export type SeriesDataGraph = {
  name: Scalars['String']
  series?: Maybe<Array<Maybe<SeriesGraph>>>
}

export type SeriesGraph = {
  name: Scalars['String']
  value: Scalars['Float']
}

export type StateChartDataGraph = {
  stateId: Scalars['Guid']
  data?: Maybe<SeriesChartGraph>
}

export type StateDataGraph = {
  data?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>
  stateId: Scalars['Guid']
}

export type StateDataMarkdownGraph = {
  stateId: Scalars['Guid']
  data?: Maybe<MarkdownGraph>
}

export type StateGraph = {
  abbreviation: Scalars['String']
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  id: Scalars['Guid']
  name: Scalars['String']
  population: Scalars['UInt32']
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  rowVersion: Scalars['String']
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
}

export type StateGraphElectoratesArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type StateGraphProjectsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type StatisticDataGraph = {
  data?: Maybe<Scalars['Json']>
  id: Scalars['Guid']
  markdown?: Maybe<Scalars['String']>
  sortOrder: Scalars['UInt32']
  statisticReport: StatisticReportGraph
  statisticReportId: Scalars['Guid']
  statisticReportVersion?: Maybe<StatisticReportVersionGraph>
  statisticReportVersionId: Scalars['Guid']
}

export type StatisticDataGraphStatisticReportVersionArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type StatisticGraph = {
  agency?: Maybe<AgencyGraph>
  agencyId?: Maybe<Scalars['Guid']>
  externalId: Scalars['String']
  id: Scalars['Guid']
  name: Scalars['String']
  rowVersion: Scalars['String']
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
}

export type StatisticGraphAgencyArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type StatisticGraphStatisticReportsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type StatisticReportGraph = {
  data?: Maybe<StatisticDataGraph>
  id: Scalars['Guid']
  latestVersion?: Maybe<StatisticReportVersionGraph>
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  statistic?: Maybe<StatisticGraph>
  statisticReportVersions?: Maybe<Array<Maybe<StatisticReportVersionGraph>>>
}

export type StatisticReportGraphDataArgs = {
  electorate: Scalars['String']
}

export type StatisticReportGraphStatisticArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type StatisticReportGraphStatisticReportVersionsArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type StatisticReportVersionGraph = {
  dataDate: Scalars['DateTimeOffset']
  electorateData?: Maybe<Scalars['Json']>
  id: Scalars['Guid']
  nationalData?: Maybe<Scalars['Json']>
  notes?: Maybe<Scalars['String']>
  reportFormat?: Maybe<Scalars['String']>
  schema?: Maybe<Scalars['Json']>
  statisticReport?: Maybe<StatisticReportGraph>
  timestamp: Scalars['DateTimeOffset']
}

export type StatisticReportVersionGraphElectorateDataArgs = {
  electorate: Scalars['String']
}

export type StatisticReportVersionGraphSchemaArgs = {
  electorate: Scalars['String']
}

export type StatisticReportVersionGraphStatisticReportArgs = {
  id: Scalars['String']
  ids: Array<Maybe<Scalars['String']>>
  orderBy: Array<Maybe<OrderByGraph>>
  where: Array<Maybe<WhereExpressionGraph>>
  skip: Scalars['Int']
  take: Scalars['Int']
}

export enum StringComparison {
  CurrentCulture = 'CURRENT_CULTURE',
  CurrentCultureIgnoreCase = 'CURRENT_CULTURE_IGNORE_CASE',
  InvariantCulture = 'INVARIANT_CULTURE',
  InvariantCultureIgnoreCase = 'INVARIANT_CULTURE_IGNORE_CASE',
  Ordinal = 'ORDINAL',
  OrdinalIgnoreCase = 'ORDINAL_IGNORE_CASE'
}

export type WhereExpressionGraph = {
  path: Scalars['String']
  comparison?: Maybe<ComparisonGraph>
  case?: Maybe<StringComparison>
  value?: Maybe<Array<Maybe<Scalars['String']>>>
}
export type PlannerCommitmentsQueryVariables = {
  refiner: CommitmentRefinerGraph
}

export type PlannerCommitmentsQuery = { __typename?: 'Query' } & {
  commitments: Maybe<
    Array<
      Maybe<
        { __typename?: 'CommitmentGraph' } & Pick<
          CommitmentGraph,
          'id' | 'title' | 'politicalParty' | 'announcedBy'
        > & {
            announcementType: Maybe<
              { __typename?: 'AnnouncementTypeGraph' } & Pick<
                AnnouncementTypeGraph,
                'id' | 'title'
              >
            >
            criticalDate: Maybe<
              { __typename?: 'CriticalDateGraph' } & Pick<
                CriticalDateGraph,
                'id' | 'title'
              >
            >
            portfolioLookup: Maybe<
              { __typename?: 'PortfolioLookupGraph' } & Pick<
                PortfolioLookupGraph,
                'id' | 'title'
              >
            >
          }
      >
    >
  >
}

export type CommitmentsMapPointAllQueryVariables = {}

export type CommitmentsMapPointAllQuery = { __typename?: 'Query' } & {
  commitmentMapPoints: Maybe<
    Array<
      Maybe<
        { __typename?: 'CommitmentMapPointGraph' } & Pick<
          CommitmentMapPointGraph,
          'id' | 'internalVersion' | 'title' | 'description'
        > & {
            commitment: Maybe<
              { __typename?: 'CommitmentGraph' } & Pick<
                CommitmentGraph,
                'id' | 'title' | 'politicalParty' | 'announcedBy'
              > & {
                  announcementType: Maybe<
                    { __typename?: 'AnnouncementTypeGraph' } & Pick<
                      AnnouncementTypeGraph,
                      'id' | 'title'
                    >
                  >
                  criticalDate: Maybe<
                    { __typename?: 'CriticalDateGraph' } & Pick<
                      CriticalDateGraph,
                      'id' | 'title'
                    >
                  >
                  portfolioLookup: Maybe<
                    { __typename?: 'PortfolioLookupGraph' } & Pick<
                      PortfolioLookupGraph,
                      'id' | 'title'
                    >
                  >
                }
            >
            mapPoint: Maybe<
              { __typename?: 'MapPointGraph' } & Pick<
                MapPointGraph,
                'id' | 'placeId' | 'title' | 'latitude' | 'longitude'
              >
            >
          }
      >
    >
  >
}

export type CommitmentsMapPointSearchQueryVariables = {
  commitmentWhere?: Maybe<WhereExpressionGraph>
}

export type CommitmentsMapPointSearchQuery = { __typename?: 'Query' } & {
  commitmentMapPoints: Maybe<
    Array<
      Maybe<
        { __typename?: 'CommitmentMapPointGraph' } & Pick<
          CommitmentMapPointGraph,
          'id' | 'internalVersion' | 'title' | 'description'
        > & {
            commitment: Maybe<
              { __typename?: 'CommitmentGraph' } & CommitmentPartsFragment
            >
            mapPoint: Maybe<
              { __typename?: 'MapPointGraph' } & Pick<
                MapPointGraph,
                'id' | 'placeId' | 'title' | 'latitude' | 'longitude'
              >
            >
          }
      >
    >
  >
}

export type CommitmentsSearchQueryVariables = {
  refiner: CommitmentRefinerGraph
}

export type CommitmentsSearchQuery = { __typename?: 'Query' } & {
  commitments: Maybe<
    Array<Maybe<{ __typename?: 'CommitmentGraph' } & CommitmentPartsFragment>>
  >
}

export type CommitmentPartsFragment = { __typename?: 'CommitmentGraph' } & Pick<
  CommitmentGraph,
  'id' | 'title' | 'politicalParty' | 'announcedBy'
> & {
    announcementType: Maybe<
      { __typename?: 'AnnouncementTypeGraph' } & Pick<
        AnnouncementTypeGraph,
        'id' | 'title'
      >
    >
    criticalDate: Maybe<
      { __typename?: 'CriticalDateGraph' } & Pick<
        CriticalDateGraph,
        'id' | 'title'
      >
    >
    portfolioLookup: Maybe<
      { __typename?: 'PortfolioLookupGraph' } & Pick<
        PortfolioLookupGraph,
        'id' | 'title'
      >
    >
  }

export type GetRefinerTagsQueryVariables = {}

export type GetRefinerTagsQuery = { __typename?: 'Query' } & {
  commitmentTypes: Maybe<
    Array<
      Maybe<
        { __typename?: 'CommitmentTypeGraph' } & Pick<
          CommitmentTypeGraph,
          'id' | 'title'
        >
      >
    >
  >
  criticalDates: Maybe<
    Array<
      Maybe<
        { __typename?: 'CriticalDateGraph' } & Pick<
          CriticalDateGraph,
          'id' | 'title'
        >
      >
    >
  >
  portfolioLookups: Maybe<
    Array<
      Maybe<
        { __typename?: 'PortfolioLookupGraph' } & Pick<
          PortfolioLookupGraph,
          'id' | 'title'
        >
      >
    >
  >
}

import gql from 'graphql-tag'
import { Injectable } from '@angular/core'
import * as Apollo from 'apollo-angular'
export const CommitmentPartsFragmentDoc = gql`
  fragment CommitmentParts on CommitmentGraph {
    id
    title
    politicalParty
    announcedBy
    announcementType {
      id
      title
    }
    criticalDate {
      id
      title
    }
    portfolioLookup {
      id
      title
    }
  }
`
export const PlannerCommitmentsDocument = gql`
  query PlannerCommitments($refiner: CommitmentRefinerGraph!) {
    commitments(refiner: $refiner) {
      id
      title
      politicalParty
      announcedBy
      announcementType {
        id
        title
      }
      criticalDate {
        id
        title
      }
      portfolioLookup {
        id
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class PlannerCommitmentsGQL extends Apollo.Query<
  PlannerCommitmentsQuery,
  PlannerCommitmentsQueryVariables
> {
  document = PlannerCommitmentsDocument
}
export const CommitmentsMapPointAllDocument = gql`
  query CommitmentsMapPointAll {
    commitmentMapPoints {
      id
      internalVersion
      title
      description
      commitment {
        id
        title
        politicalParty
        announcedBy
        announcementType {
          id
          title
        }
        criticalDate {
          id
          title
        }
        portfolioLookup {
          id
          title
        }
      }
      mapPoint {
        id
        placeId
        title
        latitude
        longitude
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CommitmentsMapPointAllGQL extends Apollo.Query<
  CommitmentsMapPointAllQuery,
  CommitmentsMapPointAllQueryVariables
> {
  document = CommitmentsMapPointAllDocument
}
export const CommitmentsMapPointSearchDocument = gql`
  query CommitmentsMapPointSearch($commitmentWhere: WhereExpressionGraph) {
    commitmentMapPoints(where: [$commitmentWhere]) {
      id
      internalVersion
      title
      description
      commitment {
        ...CommitmentParts
      }
      mapPoint {
        id
        placeId
        title
        latitude
        longitude
      }
    }
  }
  ${CommitmentPartsFragmentDoc}
`

@Injectable({
  providedIn: 'root'
})
export class CommitmentsMapPointSearchGQL extends Apollo.Query<
  CommitmentsMapPointSearchQuery,
  CommitmentsMapPointSearchQueryVariables
> {
  document = CommitmentsMapPointSearchDocument
}
export const CommitmentsSearchDocument = gql`
  query CommitmentsSearch($refiner: CommitmentRefinerGraph!) {
    commitments(refiner: $refiner) {
      ...CommitmentParts
    }
  }
  ${CommitmentPartsFragmentDoc}
`

@Injectable({
  providedIn: 'root'
})
export class CommitmentsSearchGQL extends Apollo.Query<
  CommitmentsSearchQuery,
  CommitmentsSearchQueryVariables
> {
  document = CommitmentsSearchDocument
}
export const GetRefinerTagsDocument = gql`
  query GetRefinerTags {
    commitmentTypes {
      id
      title
    }
    criticalDates {
      id
      title
    }
    portfolioLookups {
      id
      title
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetRefinerTagsGQL extends Apollo.Query<
  GetRefinerTagsQuery,
  GetRefinerTagsQueryVariables
> {
  document = GetRefinerTagsDocument
}
