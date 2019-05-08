type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Guid: any
  DateTimeOffset: any
  Json: any
  UInt32: any
  Date: any
  DateTime: any
  Decimal: any
  Milliseconds: any
  Seconds: any
}

export type ActivateElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
}

export type AgencyGraph = {
  metadata?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  portfolio?: Maybe<PortfolioGraph>
  id: Scalars['Guid']
  title: Scalars['String']
  portfolioId: Scalars['Guid']
}

export type AnnouncementTypeGraph = {
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  colour?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  sortOrder: Scalars['Int']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type AnnouncementTypeGraphCommitmentsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type AppropriationGraph = {
  rowVersion: Scalars['String']
  program?: Maybe<ProgramGraph>
  budget?: Maybe<BudgetGraph>
  budgetYear?: Maybe<Scalars['UInt32']>
  id: Scalars['Guid']
  financialYear: Scalars['String']
  dollars: Scalars['UInt32']
  programId: Scalars['Guid']
  budgetId: Scalars['Guid']
}

export type BriefCommitmentGraph = {
  brief?: Maybe<BriefGraph>
  commitment?: Maybe<CommitmentGraph>
  briefId: Scalars['Guid']
  commitmentId: Scalars['Int']
}

export type BriefGraph = {
  briefCommitments?: Maybe<Array<Maybe<BriefCommitmentGraph>>>
  briefRecommendations?: Maybe<Array<Maybe<BriefRecommendationGraph>>>
  recommendationCount?: Maybe<Scalars['Int']>
  commitmentCount?: Maybe<Scalars['Int']>
  responseRecommendationCount?: Maybe<Scalars['Int']>
  id: Scalars['Guid']
  webUrl: Scalars['String']
  listId: Scalars['Guid']
  listItemId: Scalars['Int']
  webTitle: Scalars['String']
  internalVersion: Scalars['UInt32']
  webId: Scalars['Guid']
  title: Scalars['String']
  reference: Scalars['String']
}

export type BriefGraphBriefCommitmentsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type BriefGraphBriefRecommendationsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type BriefRecommendationGraph = {
  brief?: Maybe<BriefGraph>
  id: Scalars['Guid']
  webUrl: Scalars['String']
  listId: Scalars['Guid']
  listItemId: Scalars['Int']
  webTitle: Scalars['String']
  internalVersion: Scalars['UInt32']
  webId: Scalars['Guid']
  title: Scalars['String']
  hasResponse: Scalars['Boolean']
  briefId: Scalars['Guid']
}

export type BudgetGraph = {
  rowVersion: Scalars['String']
  appropriations?: Maybe<Array<Maybe<AppropriationGraph>>>
  id: Scalars['Guid']
  year: Scalars['UInt32']
}

export type BudgetGraphAppropriationsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ColumnGraph = {
  parentLabel?: Maybe<Scalars['String']>
  format: Scalars['String']
  label: Scalars['String']
}

export type CommitmentGraph = {
  bookType: Scalars['String']
  cost?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  commitmentLocations?: Maybe<Array<Maybe<CommitmentLocationGraph>>>
  commitmentMapPoints?: Maybe<Array<Maybe<CommitmentMapPointGraph>>>
  commitmentPackageTypes?: Maybe<Array<Maybe<CommitmentPackageTypeGraph>>>
  commitmentPortfolioLookups?: Maybe<
    Array<Maybe<CommitmentPortfolioLookupGraph>>
  >
  briefCommitments?: Maybe<Array<Maybe<BriefCommitmentGraph>>>
  announcedBy?: Maybe<Scalars['String']>
  status?: Maybe<StatusGraph>
  commitmentType?: Maybe<CommitmentTypeGraph>
  announcementType?: Maybe<AnnouncementTypeGraph>
  portfolioLookup?: Maybe<PortfolioLookupGraph>
  criticalDate?: Maybe<CriticalDateGraph>
  date?: Maybe<Scalars['DateTimeOffset']>
  announcementTypeId?: Maybe<Scalars['Int']>
  criticalDateId?: Maybe<Scalars['Int']>
  portfolioLookupId?: Maybe<Scalars['Int']>
  commitmentTypeId?: Maybe<Scalars['Int']>
  politicalParty: Scalars['String']
  statusId?: Maybe<Scalars['Int']>
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type CommitmentGraphCommitmentLocationsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphCommitmentMapPointsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphCommitmentPackageTypesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphCommitmentPortfolioLookupsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphBriefCommitmentsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentLocationGraph = {
  description?: Maybe<Scalars['String']>
  commitment?: Maybe<CommitmentGraph>
  location?: Maybe<LocationGraph>
  commitmentId: Scalars['Int']
  locationId: Scalars['Int']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type CommitmentMapPointGraph = {
  description?: Maybe<Scalars['String']>
  commitment?: Maybe<CommitmentGraph>
  mapPoint?: Maybe<MapPointGraph>
  commitmentId: Scalars['Int']
  mapPointId: Scalars['Int']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type CommitmentPackageTypeGraph = {
  description?: Maybe<Scalars['String']>
  commitment?: Maybe<CommitmentGraph>
  packageType?: Maybe<PackageTypeGraph>
  commitmentId: Scalars['Int']
  packageTypeId: Scalars['Int']
  primaryPackage: Scalars['Boolean']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type CommitmentPortfolioLookupGraph = {
  description?: Maybe<Scalars['String']>
  commitment?: Maybe<CommitmentGraph>
  portfolioLookup?: Maybe<PortfolioLookupGraph>
  commitmentId: Scalars['Int']
  portfolioLookupId: Scalars['Int']
  primaryPortfolio: Scalars['Boolean']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type CommitmentRefinerGraph = {
  commitmentTypes?: Maybe<Array<Maybe<Scalars['Int']>>>
  criticalDates?: Maybe<Array<Maybe<Scalars['Int']>>>
  portfolioLookups?: Maybe<Array<Maybe<Scalars['Int']>>>
  deckItems?: Maybe<Array<Maybe<Scalars['Guid']>>>
}

export type CommitmentTypeGraph = {
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  colour?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  sortOrder: Scalars['Int']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type CommitmentTypeGraphCommitmentsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
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

export type CreateBriefCommitmentInputGraph = {
  briefId: Scalars['Guid']
  commitmentId: Scalars['Int']
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
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  colour?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  sortOrder: Scalars['Int']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type CriticalDateGraphCommitmentsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type DeactivateElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
}

export type DeckItemBriefSummaryBriefGraph = {
  brief?: Maybe<BriefGraph>
  deckItemBriefSummary?: Maybe<DeckItemBriefSummaryGraph>
  id: Scalars['Guid']
  briefId: Scalars['Guid']
  deckItemBriefSummaryId: Scalars['Guid']
}

export type DeckItemBriefSummaryContentGraph = {
  briefId: Scalars['Guid']
  title: Scalars['String']
  reference: Scalars['String']
  commitmentCount: Scalars['Int']
  recommendationCount: Scalars['Int']
  responseRecommendationCount: Scalars['Int']
  webUrl: Scalars['String']
  webTitle: Scalars['String']
  listItemId: Scalars['Int']
}

export type DeckItemBriefSummaryGraph = {
  deckItemBriefSummaryBriefs?: Maybe<
    Array<Maybe<DeckItemBriefSummaryBriefGraph>>
  >
  briefs?: Maybe<Array<Maybe<BriefGraph>>>
  id: Scalars['Guid']
  webUrl: Scalars['String']
  listId: Scalars['Guid']
  listItemId: Scalars['Int']
  internalVersion: Scalars['UInt32']
  webTitle: Scalars['String']
  webId: Scalars['Guid']
  title: Scalars['String']
  colour: Scalars['String']
  actions: Scalars['String']
  size: Scalars['Int']
  sortOrder: Scalars['Int']
  parentId?: Maybe<Scalars['Int']>
}

export type DeckItemBriefSummaryGraphDeckItemBriefSummaryBriefsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type DeckItemBriefSummaryGraphBriefsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type DeleteBriefCommitmentInputGraph = {
  briefId: Scalars['Guid']
  commitmentId: Scalars['Int']
}

export type ElectorateAdviceGraph = {
  electorate?: Maybe<ElectorateGraph>
  id: Scalars['Guid']
  electorateId: Scalars['Guid']
  active: Scalars['Boolean']
  createdById: Scalars['Guid']
  timestamp: Scalars['DateTimeOffset']
  advice: Scalars['String']
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
  rowVersion: Scalars['String']
  state?: Maybe<StateGraph>
  electorateAdvice?: Maybe<Array<Maybe<ElectorateAdviceGraph>>>
  programs?: Maybe<Array<Maybe<ProgramGraph>>>
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  id: Scalars['Guid']
  population: Scalars['UInt32']
  name: Scalars['String']
  member: Scalars['String']
  party: Scalars['String']
  percentOfStatePopulation: Scalars['Float']
  stateId: Scalars['Guid']
}

export type ElectorateGraphElectorateAdviceArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ElectorateGraphProgramsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ElectorateGraphProjectsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type LocationGraph = {
  description?: Maybe<Scalars['String']>
  commitmentLocations?: Maybe<Array<Maybe<CommitmentLocationGraph>>>
  state: Scalars['String']
  area: Scalars['String']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type LocationGraphCommitmentLocationsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type MapPointGraph = {
  description?: Maybe<Scalars['String']>
  commitmentMapPoints?: Maybe<Array<Maybe<CommitmentMapPointGraph>>>
  latitude: Scalars['Float']
  longitude: Scalars['Float']
  placeId: Scalars['String']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type MapPointGraphCommitmentMapPointsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type MarkdownGraph = {
  text: Scalars['String']
}

export type ModifyElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
  advice: Scalars['String']
}

export type Mutation = {
  createElectorateAdvice?: Maybe<MutationResultGraph>
  modifyElectorateAdvice?: Maybe<MutationResultGraph>
  activateElectorateAdvice?: Maybe<MutationResultGraph>
  deactivateElectorateAdvice?: Maybe<MutationResultGraph>
  testMessage?: Maybe<MutationResultGraph>
  createStatisticReport?: Maybe<MutationResultGraph>
  createStatisticElectorateTableReport?: Maybe<MutationResultGraph>
  createNationalTableReport?: Maybe<MutationResultGraph>
  createNationalBarchartReport?: Maybe<MutationResultGraph>
  createNationalMarkdownReport?: Maybe<MutationResultGraph>
  createStateTableReport?: Maybe<MutationResultGraph>
  createElectorateTableReport?: Maybe<MutationResultGraph>
  createElectorateBarchartReport?: Maybe<MutationResultGraph>
  createStateBarchartReport?: Maybe<MutationResultGraph>
  createElectorateMarkdownReport?: Maybe<MutationResultGraph>
  createStateMarkdownReport?: Maybe<MutationResultGraph>
  requestElectorateBrief?: Maybe<MutationResultGraph>
  createBriefCommitment?: Maybe<MutationResultGraph>
  deleteBriefCommitment?: Maybe<MutationResultGraph>
}

export type MutationCreateElectorateAdviceArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  advice?: Maybe<CreateElectorateAdviceGraph>
}

export type MutationModifyElectorateAdviceArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  advice?: Maybe<ModifyElectorateAdviceGraph>
}

export type MutationActivateElectorateAdviceArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  advice?: Maybe<ActivateElectorateAdviceGraph>
}

export type MutationDeactivateElectorateAdviceArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  advice?: Maybe<DeactivateElectorateAdviceGraph>
}

export type MutationTestMessageArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  message?: Maybe<SendTestMessageGraph>
}

export type MutationCreateStatisticReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  statisticReport?: Maybe<CreateStatisticReportGraph>
}

export type MutationCreateStatisticElectorateTableReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  statisticElectorateTableReport?: Maybe<
    CreateStatisticElectorateTableReportGraph
  >
}

export type MutationCreateNationalTableReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  nationalTableReport?: Maybe<CreateNationalTableReportGraph>
}

export type MutationCreateNationalBarchartReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  nationalBarchartReport?: Maybe<CreateNationalBarchartReportGraph>
}

export type MutationCreateNationalMarkdownReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  nationalMarkdownReport?: Maybe<CreateNationalMarkdownReportGraph>
}

export type MutationCreateStateTableReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  stateTableReport?: Maybe<CreateStateTableReportGraph>
}

export type MutationCreateElectorateTableReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  electorateTableReport?: Maybe<CreateElectorateTableReportGraph>
}

export type MutationCreateElectorateBarchartReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  electorateBarchartReport?: Maybe<CreateElectorateBarchartReportGraph>
}

export type MutationCreateStateBarchartReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  stateBarchartReport?: Maybe<CreateStateBarchartReportGraph>
}

export type MutationCreateElectorateMarkdownReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  electorateMarkdownReport?: Maybe<CreateElectorateMarkdownReportGraph>
}

export type MutationCreateStateMarkdownReportArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  stateMarkdownReport?: Maybe<CreateStateMarkdownReportGraph>
}

export type MutationRequestElectorateBriefArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  requestElectorateBrief?: Maybe<RequestElectorateBriefGraph>
}

export type MutationCreateBriefCommitmentArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  createBriefCommitment?: Maybe<CreateBriefCommitmentInputGraph>
}

export type MutationDeleteBriefCommitmentArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  deleteBriefCommitment?: Maybe<DeleteBriefCommitmentInputGraph>
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
  commitmentPackageTypes?: Maybe<Array<Maybe<CommitmentPackageTypeGraph>>>
  colour?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  sortOrder: Scalars['Int']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type PackageTypeGraphCommitmentPackageTypesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type PortfolioGraph = {
  rowVersion: Scalars['String']
  metadata?: Maybe<Scalars['String']>
  agencies?: Maybe<Array<Maybe<AgencyGraph>>>
  id: Scalars['Guid']
  title: Scalars['String']
}

export type PortfolioGraphAgenciesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type PortfolioLookupGraph = {
  commitmentPortfolioLookups?: Maybe<
    Array<Maybe<CommitmentPortfolioLookupGraph>>
  >
  colour?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  agencyType: Scalars['String']
  sortOrder: Scalars['Int']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type PortfolioLookupGraphCommitmentPortfolioLookupsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraph = {
  id: Scalars['Guid']
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  commitments?: Maybe<Scalars['String']>
  agency?: Maybe<AgencyGraph>
  appropriations?: Maybe<Array<Maybe<AppropriationGraph>>>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  reports?: Maybe<Array<Maybe<ReportGraph>>>
  programSubmissions?: Maybe<Array<Maybe<ProgramSubmissionGraph>>>
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
}

export type ProgramGraphAppropriationsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraphProjectsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  electorate?: Maybe<Scalars['String']>
}

export type ProgramGraphReportsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraphProgramSubmissionsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraphElectoratesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramSubmissionGraph = {
  program?: Maybe<ProgramGraph>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  id: Scalars['Guid']
  dataDate: Scalars['DateTimeOffset']
  timeStamp: Scalars['DateTimeOffset']
  programId: Scalars['Guid']
  submittedById: Scalars['Guid']
}

export type ProgramSubmissionGraphProjectsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProjectGraph = {
  id: Scalars['Guid']
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  organisation?: Maybe<Scalars['String']>
  sensitivities?: Maybe<Scalars['String']>
  start?: Maybe<Scalars['String']>
  end?: Maybe<Scalars['String']>
  markdown?: Maybe<Scalars['String']>
  committed: Scalars['UInt32']
  spent: Scalars['UInt32']
  program?: Maybe<ProgramGraph>
  programSubmission?: Maybe<ProgramSubmissionGraph>
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
}

export type ProjectGraphElectoratesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type Query = {
  agency?: Maybe<AgencyGraph>
  agencies?: Maybe<Array<Maybe<AgencyGraph>>>
  electorate?: Maybe<ElectorateGraph>
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  state?: Maybe<StateGraph>
  states?: Maybe<Array<Maybe<StateGraph>>>
  portfolios?: Maybe<Array<Maybe<PortfolioGraph>>>
  program?: Maybe<ProgramGraph>
  programs?: Maybe<Array<Maybe<ProgramGraph>>>
  project?: Maybe<ProjectGraph>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  deckItemBriefSummaryContent?: Maybe<
    Array<Maybe<DeckItemBriefSummaryContentGraph>>
  >
  report?: Maybe<ReportGraph>
  reports?: Maybe<Array<Maybe<ReportGraph>>>
  statisticReport?: Maybe<StatisticReportGraph>
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  statistic?: Maybe<StatisticGraph>
  statistics?: Maybe<Array<Maybe<StatisticGraph>>>
  programSubmission?: Maybe<ProgramSubmissionGraph>
  programSubmissions?: Maybe<Array<Maybe<ProgramSubmissionGraph>>>
  announcementTypes?: Maybe<Array<Maybe<AnnouncementTypeGraph>>>
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  commitmentLocations?: Maybe<Array<Maybe<CommitmentLocationGraph>>>
  locations?: Maybe<Array<Maybe<LocationGraph>>>
  commitmentMapPoints?: Maybe<Array<Maybe<CommitmentMapPointGraph>>>
  commitmentPackageTypes?: Maybe<Array<Maybe<CommitmentPackageTypeGraph>>>
  commitmentPortfolioLookups?: Maybe<
    Array<Maybe<CommitmentPortfolioLookupGraph>>
  >
  commitmentTypes?: Maybe<Array<Maybe<CommitmentTypeGraph>>>
  criticalDates?: Maybe<Array<Maybe<CriticalDateGraph>>>
  mapPoints?: Maybe<Array<Maybe<MapPointGraph>>>
  packageTypes?: Maybe<Array<Maybe<PackageTypeGraph>>>
  portfolioLookups?: Maybe<Array<Maybe<PortfolioLookupGraph>>>
  briefs?: Maybe<Array<Maybe<BriefGraph>>>
  briefCommitments?: Maybe<Array<Maybe<BriefCommitmentGraph>>>
  deckItemBriefSummaries?: Maybe<Array<Maybe<DeckItemBriefSummaryGraph>>>
  deckItemBriefSummary?: Maybe<DeckItemBriefSummaryGraph>
}

export type QueryAgencyArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryAgenciesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryElectorateArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryElectoratesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStateArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryPortfoliosArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProgramArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProgramsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProjectArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProjectsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  electorate?: Maybe<Scalars['String']>
}

export type QueryDeckItemBriefSummaryContentArgs = {
  briefIds?: Maybe<Array<Maybe<Scalars['Guid']>>>
}

export type QueryReportArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryReportsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatisticReportArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatisticReportsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatisticArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatisticsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProgramSubmissionArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryProgramSubmissionsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryAnnouncementTypesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  refiner?: Maybe<CommitmentRefinerGraph>
  bookType?: Maybe<Scalars['String']>
}

export type QueryCommitmentLocationsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryLocationsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentMapPointsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentPackageTypesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentPortfolioLookupsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentTypesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCriticalDatesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryMapPointsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  refiner?: Maybe<CommitmentRefinerGraph>
  bookType?: Maybe<Scalars['String']>
}

export type QueryPackageTypesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryPortfolioLookupsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryBriefsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryBriefCommitmentsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryDeckItemBriefSummariesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  webId?: Maybe<Scalars['Guid']>
}

export type QueryDeckItemBriefSummaryArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ReportDataGraph = {
  id: Scalars['Guid']
  reportVersion?: Maybe<ReportVersionGraph>
  data?: Maybe<Scalars['Json']>
}

export type ReportGraph = {
  rowVersion: Scalars['String']
  notes?: Maybe<Scalars['String']>
  program?: Maybe<ProgramGraph>
  reportVersions?: Maybe<Array<Maybe<ReportVersionGraph>>>
  latestVersion?: Maybe<ReportVersionGraph>
  data?: Maybe<ReportDataGraph>
  id: Scalars['Guid']
  name: Scalars['String']
  programId: Scalars['Guid']
}

export type ReportGraphReportVersionsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ReportGraphDataArgs = {
  electorate?: Maybe<Scalars['String']>
}

export type ReportVersionGraph = {
  rowVersion: Scalars['String']
  notes?: Maybe<Scalars['String']>
  reportFormat?: Maybe<Scalars['String']>
  report?: Maybe<ReportGraph>
  reportData?: Maybe<Array<Maybe<ReportDataGraph>>>
  schema?: Maybe<Scalars['Json']>
  electorateData?: Maybe<Scalars['Json']>
  nationalData?: Maybe<Scalars['Json']>
  id: Scalars['Guid']
  timestamp: Scalars['DateTimeOffset']
  dataDate: Scalars['DateTimeOffset']
  reportId: Scalars['Guid']
}

export type ReportVersionGraphReportDataArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ReportVersionGraphSchemaArgs = {
  electorate?: Maybe<Scalars['String']>
}

export type ReportVersionGraphElectorateDataArgs = {
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
  rowVersion: Scalars['String']
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  id: Scalars['Guid']
  population: Scalars['UInt32']
  name: Scalars['String']
  abbreviation: Scalars['String']
}

export type StateGraphProjectsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StateGraphElectoratesArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticDataGraph = {
  markdown?: Maybe<Scalars['String']>
  statisticReportVersion?: Maybe<StatisticReportVersionGraph>
  data?: Maybe<Scalars['Json']>
  id: Scalars['Guid']
  statisticReportVersionId: Scalars['Guid']
  statisticReportId: Scalars['Guid']
  statisticReport: StatisticReportGraph
  sortOrder: Scalars['UInt32']
}

export type StatisticGraph = {
  rowVersion: Scalars['String']
  agency?: Maybe<AgencyGraph>
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  id: Scalars['Guid']
  name: Scalars['String']
  agencyId?: Maybe<Scalars['Guid']>
  externalId: Scalars['String']
}

export type StatisticGraphStatisticReportsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticReportGraph = {
  id: Scalars['Guid']
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  statistic?: Maybe<StatisticGraph>
  statisticReportVersions?: Maybe<Array<Maybe<StatisticReportVersionGraph>>>
  latestVersion?: Maybe<StatisticReportVersionGraph>
  data?: Maybe<StatisticDataGraph>
}

export type StatisticReportGraphStatisticReportVersionsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticReportGraphDataArgs = {
  electorate?: Maybe<Scalars['String']>
}

export type StatisticReportVersionGraph = {
  id: Scalars['Guid']
  dataDate: Scalars['DateTimeOffset']
  notes?: Maybe<Scalars['String']>
  timestamp: Scalars['DateTimeOffset']
  schema?: Maybe<Scalars['Json']>
  reportFormat?: Maybe<Scalars['String']>
  statisticReport?: Maybe<StatisticReportGraph>
  electorateData?: Maybe<Scalars['Json']>
  nationalData?: Maybe<Scalars['Json']>
}

export type StatisticReportVersionGraphSchemaArgs = {
  electorate?: Maybe<Scalars['String']>
}

export type StatisticReportVersionGraphElectorateDataArgs = {
  electorate: Scalars['String']
}

export type StatusGraph = {
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  colour?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  publish: Scalars['Boolean']
  sortOrder: Scalars['Int']
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type StatusGraphCommitmentsArgs = {
  id?: Maybe<Scalars['String']>
  ids?: Maybe<Array<Maybe<Scalars['String']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
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
export type GetCommitmentDetailQueryVariables = {
  id: Scalars['String']
  bookType: Scalars['String']
}

export type GetCommitmentDetailQuery = { __typename?: 'Query' } & {
  commitments: Maybe<
    Array<
      Maybe<
        { __typename?: 'CommitmentGraph' } & Pick<
          CommitmentGraph,
          | 'id'
          | 'title'
          | 'description'
          | 'bookType'
          | 'cost'
          | 'date'
          | 'politicalParty'
          | 'statusId'
          | 'announcedBy'
        >
      >
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

export type CommitmentsMapPointSearchQueryVariables = {
  commitmentMapPointsWhere?: Maybe<WhereExpressionGraph>
}

export type CommitmentsMapPointSearchQuery = { __typename?: 'Query' } & {
  commitmentMapPoints: Maybe<
    Array<
      Maybe<
        { __typename?: 'CommitmentMapPointGraph' } & Pick<
          CommitmentMapPointGraph,
          'id'
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
          }
      >
    >
  >
}

export type CommitmentsSearchQueryVariables = {
  refiner: CommitmentRefinerGraph
  bookType: Scalars['String']
}

export type CommitmentsSearchQuery = { __typename?: 'Query' } & {
  commitments: Maybe<
    Array<
      Maybe<
        { __typename?: 'CommitmentGraph' } & Pick<
          CommitmentGraph,
          'id' | 'title'
        > & {
            commitmentType: Maybe<
              { __typename?: 'CommitmentTypeGraph' } & Pick<
                CommitmentTypeGraph,
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

export type MapPointsSearchQueryVariables = {
  refiner: CommitmentRefinerGraph
  bookType: Scalars['String']
}

export type MapPointsSearchQuery = { __typename?: 'Query' } & {
  mapPoints: Maybe<
    Array<
      Maybe<
        { __typename?: 'MapPointGraph' } & Pick<
          MapPointGraph,
          'id' | 'title' | 'placeId' | 'latitude' | 'longitude'
        > & {
            commitmentMapPoints: Maybe<
              Array<
                Maybe<
                  { __typename?: 'CommitmentMapPointGraph' } & {
                    commitment: Maybe<
                      { __typename?: 'CommitmentGraph' } & Pick<
                        CommitmentGraph,
                        'id' | 'title' | 'portfolioLookupId'
                      > & {
                          commitmentType: Maybe<
                            { __typename?: 'CommitmentTypeGraph' } & Pick<
                              CommitmentTypeGraph,
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
                  }
                >
              >
            >
          }
      >
    >
  >
}

import gql from 'graphql-tag'
import { Injectable } from '@angular/core'
import * as Apollo from 'apollo-angular'

export const GetCommitmentDetailDocument = gql`
  query getCommitmentDetail($id: String!, $bookType: String!) {
    commitments(id: $id, bookType: $bookType) {
      id
      title
      description
      bookType
      cost
      date
      politicalParty
      statusId
      announcedBy
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetCommitmentDetailGQL extends Apollo.Query<
  GetCommitmentDetailQuery,
  GetCommitmentDetailQueryVariables
> {
  document = GetCommitmentDetailDocument
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
export const CommitmentsMapPointSearchDocument = gql`
  query CommitmentsMapPointSearch(
    $commitmentMapPointsWhere: WhereExpressionGraph
  ) {
    commitmentMapPoints(where: [$commitmentMapPointsWhere]) {
      id
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
    }
  }
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
  query CommitmentsSearch(
    $refiner: CommitmentRefinerGraph!
    $bookType: String!
  ) {
    commitments(refiner: $refiner, bookType: $bookType) {
      id
      title
      commitmentType {
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
export class CommitmentsSearchGQL extends Apollo.Query<
  CommitmentsSearchQuery,
  CommitmentsSearchQueryVariables
> {
  document = CommitmentsSearchDocument
}
export const MapPointsSearchDocument = gql`
  query MapPointsSearch($refiner: CommitmentRefinerGraph!, $bookType: String!) {
    mapPoints(refiner: $refiner, bookType: $bookType) {
      id
      title
      placeId
      latitude
      longitude
      commitmentMapPoints {
        commitment {
          id
          title
          commitmentType {
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
          portfolioLookupId
        }
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class MapPointsSearchGQL extends Apollo.Query<
  MapPointsSearchQuery,
  MapPointsSearchQueryVariables
> {
  document = MapPointsSearchDocument
}
