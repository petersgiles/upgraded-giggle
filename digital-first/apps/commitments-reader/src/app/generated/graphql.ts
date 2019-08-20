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
  Json: any
  UInt32: any
  Decimal: any
  UInt16: any
  Date: any
  DateTime: any
  Milliseconds: any
  Seconds: any
}

export type ActivateElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
}

export type AgencyGraph = {
  __typename?: 'AgencyGraph'
  metadata?: Maybe<Scalars['String']>
  rowVersion: Scalars['String']
  portfolio?: Maybe<PortfolioGraph>
  id: Scalars['Guid']
  title: Scalars['String']
  portfolioId: Scalars['Guid']
}

export type AnnouncementTypeGraph = {
  __typename?: 'AnnouncementTypeGraph'
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
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ApplyCommitmentDisplayOrderGraph = {
  webId: Scalars['Guid']
  siteId: Scalars['Guid']
  orderedCommitmentIds: Array<Scalars['Int']>
}

export type AppropriationGraph = {
  __typename?: 'AppropriationGraph'
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

export enum BookType {
  None = 'None',
  Blue = 'Blue',
  Red = 'Red'
}

export type BriefCommitmentGraph = {
  __typename?: 'BriefCommitmentGraph'
  brief?: Maybe<BriefGraph>
  commitment?: Maybe<CommitmentGraph>
  briefId: Scalars['Guid']
  commitmentId: Scalars['Int']
}

export type BriefGraph = {
  __typename?: 'BriefGraph'
  briefCommitments?: Maybe<Array<Maybe<BriefCommitmentGraph>>>
  briefRecommendations?: Maybe<Array<Maybe<BriefRecommendationGraph>>>
  deckItemBriefSummaryBriefs?: Maybe<
    Array<Maybe<DeckItemBriefSummaryBriefGraph>>
  >
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
  siteId: Scalars['Guid']
}

export type BriefGraphBriefCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type BriefGraphBriefRecommendationsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type BriefGraphDeckItemBriefSummaryBriefsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type BriefRecommendationGraph = {
  __typename?: 'BriefRecommendationGraph'
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
  siteId: Scalars['Guid']
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

export type CandidateGraph = {
  __typename?: 'CandidateGraph'
  familyName: Scalars['String']
  givenNames: Scalars['String']
  party: Scalars['String']
  votes: Scalars['UInt32']
  swing: Scalars['Decimal']
}

export type ColumnGraph = {
  parentLabel?: Maybe<Scalars['String']>
  format: Scalars['String']
  label: Scalars['String']
}

export type CommitmentGraph = {
  __typename?: 'CommitmentGraph'
  book: BookType
  bookType: Scalars['String']
  cost?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  commitmentLocations?: Maybe<Array<Maybe<CommitmentLocationGraph>>>
  commitmentMapPoints?: Maybe<Array<Maybe<CommitmentMapPointGraph>>>
  commitmentPackageTypes?: Maybe<Array<Maybe<CommitmentPackageTypeGraph>>>
  commitmentPortfolioLookups?: Maybe<
    Array<Maybe<CommitmentPortfolioLookupGraph>>
  >
  pmcHandlingAdviceCommitments?: Maybe<
    Array<Maybe<PmcHandlingAdviceCommitmentGraph>>
  >
  pmoHandlingAdviceCommitments?: Maybe<
    Array<Maybe<PmoHandlingAdviceCommitmentGraph>>
  >
  briefCommitments?: Maybe<Array<Maybe<BriefCommitmentGraph>>>
  relatedLinks?: Maybe<Array<Maybe<RelatedLinkGraph>>>
  announcedBy?: Maybe<Scalars['String']>
  status?: Maybe<StatusGraph>
  commitmentType?: Maybe<CommitmentTypeGraph>
  announcementType?: Maybe<AnnouncementTypeGraph>
  portfolioLookup?: Maybe<PortfolioLookupGraph>
  criticalDate?: Maybe<CriticalDateGraph>
  displayOrder?: Maybe<Scalars['UInt32']>
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
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphCommitmentMapPointsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphCommitmentPackageTypesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphCommitmentPortfolioLookupsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphPmcHandlingAdviceCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphPmoHandlingAdviceCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphBriefCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphRelatedLinksArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type CommitmentGraphDisplayOrderArgs = {
  siteId?: Maybe<Scalars['Guid']>
  webId?: Maybe<Scalars['Guid']>
}

export type CommitmentGraphConnection = {
  __typename?: 'CommitmentGraphConnection'
  totalCount?: Maybe<Scalars['Int']>
  pageInfo: PageInfo
  edges?: Maybe<Array<Maybe<CommitmentGraphEdge>>>
  items?: Maybe<Array<Maybe<CommitmentGraph>>>
}

export type CommitmentGraphEdge = {
  __typename?: 'CommitmentGraphEdge'
  cursor: Scalars['String']
  node?: Maybe<CommitmentGraph>
}

export type CommitmentLocationGraph = {
  __typename?: 'CommitmentLocationGraph'
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
  __typename?: 'CommitmentMapPointGraph'
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
  __typename?: 'CommitmentPackageTypeGraph'
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
  __typename?: 'CommitmentPortfolioLookupGraph'
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
  deckItemBriefSummaries?: Maybe<Array<Maybe<Scalars['Guid']>>>
  electorates?: Maybe<Array<Maybe<Scalars['Int']>>>
  states?: Maybe<Array<Maybe<Scalars['Int']>>>
  text?: Maybe<Scalars['String']>
}

export type CommitmentTypeGraph = {
  __typename?: 'CommitmentTypeGraph'
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

export type CreateBriefCommitmentInputGraph = {
  webId: Scalars['Guid']
  siteId: Scalars['Guid']
  listId: Scalars['Guid']
  listItemId: Scalars['Int']
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
  __typename?: 'CriticalDateGraph'
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
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type DeactivateElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
}

export type DeckItemBriefSummaryBriefGraph = {
  __typename?: 'DeckItemBriefSummaryBriefGraph'
  brief?: Maybe<BriefGraph>
  deckItemBriefSummary?: Maybe<DeckItemBriefSummaryGraph>
  id: Scalars['Guid']
  briefId: Scalars['Guid']
  deckItemBriefSummaryId: Scalars['Guid']
}

export type DeckItemBriefSummaryContentGraph = {
  __typename?: 'DeckItemBriefSummaryContentGraph'
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
  __typename?: 'DeckItemBriefSummaryGraph'
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
  siteId: Scalars['Guid']
}

export type DeckItemBriefSummaryGraphDeckItemBriefSummaryBriefsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type DeckItemBriefSummaryGraphBriefsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type DeleteBriefCommitmentInputGraph = {
  webId: Scalars['Guid']
  listId: Scalars['Guid']
  siteId: Scalars['Guid']
  listItemId: Scalars['Int']
  commitmentId: Scalars['Int']
}

export type ElectorateAdviceGraph = {
  __typename?: 'ElectorateAdviceGraph'
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
  __typename?: 'ElectorateGraph'
  rowVersion: Scalars['String']
  state?: Maybe<StateGraph>
  electorateAdvice?: Maybe<Array<Maybe<ElectorateAdviceGraph>>>
  parliament?: Maybe<ParliamentGraph>
  programs?: Maybe<Array<Maybe<ProgramGraph>>>
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  twoCandidatePreferred?: Maybe<TwoCandidatePreferredGraph>
  enrollment?: Maybe<Scalars['String']>
  area?: Maybe<Scalars['Decimal']>
  currentMember?: Maybe<MemberGraph>
  members?: Maybe<Array<Maybe<MemberGraph>>>
  locations?: Maybe<Array<Maybe<ElectorateLocationGraph>>>
  id: Scalars['Guid']
  population: Scalars['UInt32']
  name: Scalars['String']
  member: Scalars['String']
  party: Scalars['String']
  parliamentId: Scalars['UInt32']
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

export type ElectorateLocationGraph = {
  __typename?: 'ElectorateLocationGraph'
  localities?: Maybe<Array<Maybe<Scalars['String']>>>
  postcode: Scalars['Int']
}

export type HandlingAdviceGraph = {
  __typename?: 'HandlingAdviceGraph'
  pmcHandlingAdviceCommitments?: Maybe<
    Array<Maybe<PmcHandlingAdviceCommitmentGraph>>
  >
  pmoHandlingAdviceCommitments?: Maybe<
    Array<Maybe<PmoHandlingAdviceCommitmentGraph>>
  >
  id: Scalars['Guid']
  title: Scalars['String']
  sortOrder: Scalars['Int']
  colour: Scalars['String']
  icon: Scalars['String']
}

export type HandlingAdviceGraphPmcHandlingAdviceCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type HandlingAdviceGraphPmoHandlingAdviceCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type LocationGraph = {
  __typename?: 'LocationGraph'
  description?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  area?: Maybe<Scalars['String']>
  commitmentLocations?: Maybe<Array<Maybe<CommitmentLocationGraph>>>
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  title: Scalars['String']
}

export type LocationGraphCommitmentLocationsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type MapPointGraph = {
  __typename?: 'MapPointGraph'
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
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type MarkdownGraph = {
  text: Scalars['String']
}

export type MemberGraph = {
  __typename?: 'MemberGraph'
  familyName: Scalars['String']
  givenNames: Scalars['String']
  begin: Scalars['UInt16']
  end?: Maybe<Scalars['UInt16']>
  party: Scalars['String']
}

export type ModifyElectorateAdviceGraph = {
  adviceId: Scalars['Guid']
  advice: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
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
  applyCommitmentDisplayOrder?: Maybe<MutationResultGraph>
  requestElectorateBrief?: Maybe<MutationResultGraph>
  updatePmcHandlingAdviceCommitment?: Maybe<MutationResultGraph>
  updatePmoHandlingAdviceCommitment?: Maybe<MutationResultGraph>
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

export type MutationApplyCommitmentDisplayOrderArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  applyCommitmentDisplayOrder?: Maybe<ApplyCommitmentDisplayOrderGraph>
}

export type MutationRequestElectorateBriefArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  requestElectorateBrief?: Maybe<RequestElectorateBriefGraph>
}

export type MutationUpdatePmcHandlingAdviceCommitmentArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  updatePmcHandlingAdviceCommitment?: Maybe<
    UpdatePmcHandlingAdviceCommitmentGraph
  >
}

export type MutationUpdatePmoHandlingAdviceCommitmentArgs = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  updatePmoHandlingAdviceCommitment?: Maybe<
    UpdatePmoHandlingAdviceCommitmentGraph
  >
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

export type MutationMessageResultGraph = {
  __typename?: 'MutationMessageResultGraph'
  messageId: Scalars['Guid']
  failed: Scalars['Boolean']
  user?: Maybe<Scalars['String']>
  errorDetails?: Maybe<Scalars['String']>
}

export type MutationResultGraph = {
  __typename?: 'MutationResultGraph'
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
  __typename?: 'PackageTypeGraph'
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
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
  endCursor?: Maybe<Scalars['String']>
}

export type ParliamentGraph = {
  __typename?: 'ParliamentGraph'
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  id: Scalars['UInt32']
  startDate: Scalars['DateTimeOffset']
}

export type ParliamentGraphElectoratesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type PmcHandlingAdviceCommitmentGraph = {
  __typename?: 'PmcHandlingAdviceCommitmentGraph'
  handlingAdvice?: Maybe<HandlingAdviceGraph>
  commitment?: Maybe<CommitmentGraph>
  webId: Scalars['Guid']
  siteId: Scalars['Guid']
  commitmentId: Scalars['Int']
  handlingAdviceId: Scalars['Guid']
}

export type PmoHandlingAdviceCommitmentGraph = {
  __typename?: 'PmoHandlingAdviceCommitmentGraph'
  handlingAdvice?: Maybe<HandlingAdviceGraph>
  commitment?: Maybe<CommitmentGraph>
  webId: Scalars['Guid']
  siteId: Scalars['Guid']
  commitmentId: Scalars['Int']
  handlingAdviceId: Scalars['Guid']
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

export type PortfolioLookupGraph = {
  __typename?: 'PortfolioLookupGraph'
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
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type ProgramGraph = {
  __typename?: 'ProgramGraph'
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
  electorate?: Maybe<Scalars['String']>
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

export type ProgramSubmissionGraph = {
  __typename?: 'ProgramSubmissionGraph'
  program?: Maybe<ProgramGraph>
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  id: Scalars['Guid']
  dataDate: Scalars['DateTimeOffset']
  timeStamp: Scalars['DateTimeOffset']
  programId: Scalars['Guid']
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
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  agency: AgencyGraph
  agencies?: Maybe<Array<Maybe<AgencyGraph>>>
  electorate: ElectorateGraph
  electorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  currentElectorates?: Maybe<Array<Maybe<ElectorateGraph>>>
  state: StateGraph
  states?: Maybe<Array<Maybe<StateGraph>>>
  portfolios?: Maybe<Array<Maybe<PortfolioGraph>>>
  program: ProgramGraph
  programs?: Maybe<Array<Maybe<ProgramGraph>>>
  project: ProjectGraph
  projects?: Maybe<Array<Maybe<ProjectGraph>>>
  deckItemBriefSummaryContent?: Maybe<
    Array<Maybe<DeckItemBriefSummaryContentGraph>>
  >
  report: ReportGraph
  reports?: Maybe<Array<Maybe<ReportGraph>>>
  statisticReport: StatisticReportGraph
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  statistic: StatisticGraph
  statistics?: Maybe<Array<Maybe<StatisticGraph>>>
  announcementTypes?: Maybe<Array<Maybe<AnnouncementTypeGraph>>>
  commitment: CommitmentGraph
  commitments?: Maybe<Array<Maybe<CommitmentGraph>>>
  commitmentsConnection?: Maybe<CommitmentGraphConnection>
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
  portfolioLookup: PortfolioLookupGraph
  briefs?: Maybe<Array<Maybe<BriefGraph>>>
  brief: BriefGraph
  briefCommitments?: Maybe<Array<Maybe<BriefCommitmentGraph>>>
  briefCommitment: BriefCommitmentGraph
  deckItemBriefSummaries?: Maybe<Array<Maybe<DeckItemBriefSummaryGraph>>>
  deckItemBriefSummary: DeckItemBriefSummaryGraph
  handlingAdvices?: Maybe<Array<Maybe<HandlingAdviceGraph>>>
  pmcHandlingAdviceCommitments?: Maybe<
    Array<Maybe<PmcHandlingAdviceCommitmentGraph>>
  >
  pmoHandlingAdviceCommitments?: Maybe<
    Array<Maybe<PmoHandlingAdviceCommitmentGraph>>
  >
  relatedLinks?: Maybe<Array<Maybe<RelatedLinkGraph>>>
  siteCommitmentDisplayOrders?: Maybe<
    Array<Maybe<SiteCommitmentDisplayOrderGraph>>
  >
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

export type QueryCurrentElectoratesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStateArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryStatesArgs = {
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
  electorate?: Maybe<Scalars['String']>
}

export type QueryDeckItemBriefSummaryContentArgs = {
  briefIds?: Maybe<Array<Maybe<Scalars['Guid']>>>
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

export type QueryAnnouncementTypesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  refiner?: Maybe<CommitmentRefinerGraph>
  bookType?: Maybe<Scalars['String']>
  book?: Maybe<BookType>
}

export type QueryCommitmentsConnectionArgs = {
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  refiner?: Maybe<CommitmentRefinerGraph>
  bookType?: Maybe<Scalars['String']>
  book?: Maybe<BookType>
}

export type QueryCommitmentLocationsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryLocationsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentMapPointsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentPackageTypesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentPortfolioLookupsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCommitmentTypesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryCriticalDatesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryMapPointsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  refiner?: Maybe<CommitmentRefinerGraph>
  book: BookType
}

export type QueryPackageTypesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryPortfolioLookupsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryPortfolioLookupArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryBriefsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryBriefArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryBriefCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryBriefCommitmentArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryDeckItemBriefSummariesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  siteId: Scalars['Guid']
}

export type QueryDeckItemBriefSummaryArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryHandlingAdvicesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryPmcHandlingAdviceCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryPmoHandlingAdviceCommitmentsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QueryRelatedLinksArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type QuerySiteCommitmentDisplayOrdersArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  siteId: Scalars['Guid']
  webId: Scalars['Guid']
}

export type RelatedLinkGraph = {
  __typename?: 'RelatedLinkGraph'
  commitment?: Maybe<CommitmentGraph>
  id: Scalars['Int']
  internalVersion: Scalars['UInt32']
  commitmentId: Scalars['Int']
  title: Scalars['String']
  url: Scalars['String']
}

export type ReportGraph = {
  __typename?: 'ReportGraph'
  rowVersion: Scalars['String']
  notes?: Maybe<Scalars['String']>
  program?: Maybe<ProgramGraph>
  reportVersions?: Maybe<Array<Maybe<ReportVersionGraph>>>
  latestVersion?: Maybe<ReportVersionGraph>
  id: Scalars['Guid']
  name: Scalars['String']
  programId: Scalars['Guid']
}

export type ReportGraphReportVersionsArgs = {
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
  notes?: Maybe<Scalars['String']>
  reportFormat?: Maybe<Scalars['String']>
  report?: Maybe<ReportGraph>
  schema?: Maybe<Scalars['Json']>
  electorateData?: Maybe<Scalars['Json']>
  nationalData?: Maybe<Scalars['Json']>
  id: Scalars['Guid']
  timestamp: Scalars['DateTimeOffset']
  dataDate: Scalars['DateTimeOffset']
  reportId: Scalars['Guid']
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

export type SiteCommitmentDisplayOrderGraph = {
  __typename?: 'SiteCommitmentDisplayOrderGraph'
  rowVersion: Scalars['String']
  commitment?: Maybe<CommitmentGraph>
  id: Scalars['Guid']
  webId: Scalars['Guid']
  siteId: Scalars['Guid']
  commitmentId: Scalars['Int']
  displayOrder: Scalars['UInt32']
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
  __typename?: 'StateGraph'
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
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StateGraphElectoratesArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticGraph = {
  __typename?: 'StatisticGraph'
  rowVersion: Scalars['String']
  agency?: Maybe<AgencyGraph>
  statisticReports?: Maybe<Array<Maybe<StatisticReportGraph>>>
  id: Scalars['Guid']
  name: Scalars['String']
  agencyId?: Maybe<Scalars['Guid']>
  externalId: Scalars['String']
}

export type StatisticGraphStatisticReportsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticReportGraph = {
  __typename?: 'StatisticReportGraph'
  id: Scalars['Guid']
  name: Scalars['String']
  notes?: Maybe<Scalars['String']>
  statistic?: Maybe<StatisticGraph>
  statisticReportVersions?: Maybe<Array<Maybe<StatisticReportVersionGraph>>>
  latestVersion?: Maybe<StatisticReportVersionGraph>
}

export type StatisticReportGraphStatisticReportVersionsArgs = {
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
  orderBy?: Maybe<Array<Maybe<OrderByGraph>>>
  where?: Maybe<Array<Maybe<WhereExpressionGraph>>>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
}

export type StatisticReportVersionGraph = {
  __typename?: 'StatisticReportVersionGraph'
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
  __typename?: 'StatusGraph'
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
  id?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>
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

export type Subscription = {
  __typename?: 'Subscription'
  mutationMessageResults?: Maybe<MutationMessageResultGraph>
  mutationMessageResultsById?: Maybe<MutationMessageResultGraph>
  mutationMessageResultsByUser?: Maybe<MutationMessageResultGraph>
}

export type SubscriptionMutationMessageResultsByIdArgs = {
  messageId?: Maybe<Scalars['Guid']>
}

export type SubscriptionMutationMessageResultsByUserArgs = {
  user?: Maybe<Scalars['String']>
}

export type TwoCandidatePreferredGraph = {
  __typename?: 'TwoCandidatePreferredGraph'
  elected: CandidateGraph
  other: CandidateGraph
}

export type UpdatePmcHandlingAdviceCommitmentGraph = {
  commitmentId: Scalars['Int']
  handlingAdviceId?: Maybe<Scalars['Guid']>
  webId: Scalars['Guid']
  siteId: Scalars['Guid']
}

export type UpdatePmoHandlingAdviceCommitmentGraph = {
  commitmentId: Scalars['Int']
  handlingAdviceId?: Maybe<Scalars['Guid']>
  webId: Scalars['Guid']
  siteId: Scalars['Guid']
}

export type WhereExpressionGraph = {
  path: Scalars['String']
  comparison?: Maybe<ComparisonGraph>
  case?: Maybe<StringComparison>
  value?: Maybe<Array<Maybe<Scalars['String']>>>
}
export type ApplyCommitmentDisplayOrderMutationVariables = {
  applyCommitmentDisplayOrder: ApplyCommitmentDisplayOrderGraph
  messageId: Scalars['Guid']
}

export type ApplyCommitmentDisplayOrderMutation = {
  __typename?: 'Mutation'
} & {
  applyCommitmentDisplayOrder: Maybe<
    { __typename?: 'MutationResultGraph' } & Pick<MutationResultGraph, 'id'>
  >
}

export type GetCommitmentDetailQueryVariables = {
  id: Scalars['ID']
  webId?: Maybe<Array<Maybe<Scalars['String']>>>
  siteId?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type GetCommitmentDetailQuery = { __typename?: 'Query' } & {
  commitment: { __typename?: 'CommitmentGraph' } & Pick<
    CommitmentGraph,
    | 'id'
    | 'title'
    | 'description'
    | 'cost'
    | 'date'
    | 'politicalParty'
    | 'statusId'
    | 'announcedBy'
  > & { bookType: CommitmentGraph['book'] } & {
      pmcHandlingAdviceCommitments: Maybe<
        Array<
          Maybe<
            { __typename?: 'PmcHandlingAdviceCommitmentGraph' } & Pick<
              PmcHandlingAdviceCommitmentGraph,
              'webId' | 'siteId'
            > & {
                handlingAdvice: Maybe<
                  { __typename?: 'HandlingAdviceGraph' } & {
                    value: HandlingAdviceGraph['id']
                    label: HandlingAdviceGraph['title']
                  }
                >
              }
          >
        >
      >
      pmoHandlingAdviceCommitments: Maybe<
        Array<
          Maybe<
            { __typename?: 'PmoHandlingAdviceCommitmentGraph' } & Pick<
              PmoHandlingAdviceCommitmentGraph,
              'webId' | 'siteId'
            > & {
                handlingAdvice: Maybe<
                  { __typename?: 'HandlingAdviceGraph' } & {
                    value: HandlingAdviceGraph['id']
                    label: HandlingAdviceGraph['title']
                  }
                >
              }
          >
        >
      >
      commitmentType: Maybe<
        { __typename?: 'CommitmentTypeGraph' } & Pick<
          CommitmentTypeGraph,
          'id' | 'title'
        >
      >
      announcementType: Maybe<
        { __typename?: 'AnnouncementTypeGraph' } & Pick<
          AnnouncementTypeGraph,
          'id' | 'title'
        >
      >
      portfolioLookup: Maybe<
        { __typename?: 'PortfolioLookupGraph' } & Pick<
          PortfolioLookupGraph,
          'id' | 'title'
        >
      >
      status: Maybe<
        { __typename?: 'StatusGraph' } & Pick<StatusGraph, 'id' | 'title'>
      >
      criticalDate: Maybe<
        { __typename?: 'CriticalDateGraph' } & Pick<
          CriticalDateGraph,
          'id' | 'title'
        >
      >
      relatedLinks: Maybe<
        Array<
          Maybe<
            { __typename?: 'RelatedLinkGraph' } & Pick<
              RelatedLinkGraph,
              'id' | 'url' | 'title'
            >
          >
        >
      >
      commitmentLocations: Maybe<
        Array<
          Maybe<
            { __typename?: 'CommitmentLocationGraph' } & Pick<
              CommitmentLocationGraph,
              'commitmentId'
            > & {
                location: Maybe<
                  { __typename?: 'LocationGraph' } & Pick<
                    LocationGraph,
                    'id' | 'title'
                  >
                >
              }
          >
        >
      >
      commitmentPackageTypes: Maybe<
        Array<
          Maybe<
            { __typename?: 'CommitmentPackageTypeGraph' } & Pick<
              CommitmentPackageTypeGraph,
              'id'
            > & {
                packageType: Maybe<
                  { __typename?: 'PackageTypeGraph' } & Pick<
                    PackageTypeGraph,
                    'id' | 'title'
                  >
                >
              }
          >
        >
      >
      commitmentPortfolioLookups: Maybe<
        Array<
          Maybe<
            { __typename?: 'CommitmentPortfolioLookupGraph' } & Pick<
              CommitmentPortfolioLookupGraph,
              'commitmentId'
            > & {
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
}

export type GetRefinerTagsQueryVariables = {
  siteId: Scalars['Guid']
}

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
  deckItemBriefSummaries: Maybe<
    Array<
      Maybe<
        { __typename?: 'DeckItemBriefSummaryGraph' } & Pick<
          DeckItemBriefSummaryGraph,
          'id' | 'title'
        >
      >
    >
  >
  states: Maybe<
    Array<
      Maybe<
        { __typename?: 'LocationGraph' } & Pick<
          LocationGraph,
          'id' | 'title' | 'state'
        >
      >
    >
  >
  electorates: Maybe<
    Array<
      Maybe<
        { __typename?: 'LocationGraph' } & Pick<
          LocationGraph,
          'id' | 'title' | 'state'
        >
      >
    >
  >
}

export type CommitmentsSearchQueryVariables = {
  refiner: CommitmentRefinerGraph
  book: BookType
  webId: Scalars['Guid']
  siteId: Scalars['Guid']
}

export type CommitmentsSearchQuery = { __typename?: 'Query' } & {
  commitments: Maybe<
    Array<
      Maybe<
        { __typename?: 'CommitmentGraph' } & Pick<
          CommitmentGraph,
          'id' | 'title' | 'politicalParty' | 'announcedBy' | 'displayOrder'
        > & { bookType: CommitmentGraph['book'] } & {
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

export type GetSiteCommitmentDisplayOrdersQueryVariables = {
  webId: Scalars['Guid']
  siteId: Scalars['Guid']
}

export type GetSiteCommitmentDisplayOrdersQuery = { __typename?: 'Query' } & {
  siteCommitmentDisplayOrders: Maybe<
    Array<
      Maybe<
        { __typename?: 'SiteCommitmentDisplayOrderGraph' } & Pick<
          SiteCommitmentDisplayOrderGraph,
          'commitmentId' | 'displayOrder'
        > & {
            commitment: Maybe<
              { __typename?: 'CommitmentGraph' } & Pick<
                CommitmentGraph,
                'title'
              > & {
                  portfolioLookup: Maybe<
                    { __typename?: 'PortfolioLookupGraph' } & Pick<
                      PortfolioLookupGraph,
                      'title'
                    >
                  >
                }
            >
          }
      >
    >
  >
}

export type GetHandlingAdvicesQueryVariables = {}

export type GetHandlingAdvicesQuery = { __typename?: 'Query' } & {
  handlingAdvices: Maybe<
    Array<
      Maybe<
        { __typename?: 'HandlingAdviceGraph' } & {
          value: HandlingAdviceGraph['id']
          label: HandlingAdviceGraph['title']
        }
      >
    >
  >
}

export type MapPointsSearchQueryVariables = {
  refiner: CommitmentRefinerGraph
  book: BookType
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

export type UpdatePmcHandlingAdviceCommitmentMutationVariables = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  data: UpdatePmcHandlingAdviceCommitmentGraph
}

export type UpdatePmcHandlingAdviceCommitmentMutation = {
  __typename?: 'Mutation'
} & {
  updatePmcHandlingAdviceCommitment: Maybe<
    { __typename?: 'MutationResultGraph' } & Pick<MutationResultGraph, 'id'>
  >
}

export type UpdatePmoHandlingAdviceCommitmentMutationVariables = {
  messageId: Scalars['Guid']
  conversationId?: Maybe<Scalars['Guid']>
  data: UpdatePmoHandlingAdviceCommitmentGraph
}

export type UpdatePmoHandlingAdviceCommitmentMutation = {
  __typename?: 'Mutation'
} & {
  updatePmoHandlingAdviceCommitment: Maybe<
    { __typename?: 'MutationResultGraph' } & Pick<MutationResultGraph, 'id'>
  >
}

export const ApplyCommitmentDisplayOrderDocument = gql`
  mutation ApplyCommitmentDisplayOrder(
    $applyCommitmentDisplayOrder: ApplyCommitmentDisplayOrderGraph!
    $messageId: Guid!
  ) {
    applyCommitmentDisplayOrder(
      applyCommitmentDisplayOrder: $applyCommitmentDisplayOrder
      messageId: $messageId
    ) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class ApplyCommitmentDisplayOrderGQL extends Apollo.Mutation<
  ApplyCommitmentDisplayOrderMutation,
  ApplyCommitmentDisplayOrderMutationVariables
> {
  document = ApplyCommitmentDisplayOrderDocument
}
export const GetCommitmentDetailDocument = gql`
  query getCommitmentDetail($id: ID!, $webId: [String], $siteId: [String]) {
    commitment(id: $id) {
      id
      title
      description
      bookType: book
      cost
      date
      politicalParty
      statusId
      announcedBy
      pmcHandlingAdviceCommitments(
        where: [
          { path: "webId", comparison: equal, value: $webId }
          { path: "siteId", comparison: equal, value: $siteId }
        ]
      ) {
        webId
        siteId
        handlingAdvice {
          value: id
          label: title
        }
      }
      pmoHandlingAdviceCommitments(
        where: [
          { path: "webId", comparison: equal, value: $webId }
          { path: "siteId", comparison: equal, value: $siteId }
        ]
      ) {
        webId
        siteId
        handlingAdvice {
          value: id
          label: title
        }
      }
      commitmentType {
        id
        title
      }
      announcementType {
        id
        title
      }
      portfolioLookup {
        id
        title
      }
      status {
        id
        title
      }
      criticalDate {
        id
        title
      }
      relatedLinks {
        id
        url
        title
      }
      commitmentLocations {
        commitmentId
        location {
          id
          title
        }
      }
      commitmentPackageTypes {
        id
        packageType {
          id
          title
        }
      }
      commitmentPortfolioLookups {
        commitmentId
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
export class GetCommitmentDetailGQL extends Apollo.Query<
  GetCommitmentDetailQuery,
  GetCommitmentDetailQueryVariables
> {
  document = GetCommitmentDetailDocument
}
export const GetRefinerTagsDocument = gql`
  query GetRefinerTags($siteId: Guid!) {
    commitmentTypes(orderBy: { path: "sortOrder" }) {
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
    deckItemBriefSummaries(siteId: $siteId) {
      id
      title
    }
    states: locations(
      orderBy: { path: "title" }
      where: [
        { path: "State", comparison: equal }
        { path: "Title", comparison: notEqual, value: "National" }
      ]
    ) {
      id
      title
      state
    }
    electorates: locations(
      orderBy: { path: "title" }
      where: { path: "State", comparison: notEqual }
    ) {
      id
      title
      state
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
export const CommitmentsSearchDocument = gql`
  query CommitmentsSearch(
    $refiner: CommitmentRefinerGraph!
    $book: BookType!
    $webId: Guid!
    $siteId: Guid!
  ) {
    commitments(refiner: $refiner, book: $book) {
      id
      title
      bookType: book
      politicalParty
      announcedBy
      displayOrder(siteId: $siteId, webId: $webId)
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
export class CommitmentsSearchGQL extends Apollo.Query<
  CommitmentsSearchQuery,
  CommitmentsSearchQueryVariables
> {
  document = CommitmentsSearchDocument
}
export const GetSiteCommitmentDisplayOrdersDocument = gql`
  query getSiteCommitmentDisplayOrders($webId: Guid!, $siteId: Guid!) {
    siteCommitmentDisplayOrders(
      orderBy: { path: "displayOrder" }
      webId: $webId
      siteId: $siteId
    ) {
      commitmentId
      displayOrder
      commitment {
        title
        portfolioLookup {
          title
        }
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetSiteCommitmentDisplayOrdersGQL extends Apollo.Query<
  GetSiteCommitmentDisplayOrdersQuery,
  GetSiteCommitmentDisplayOrdersQueryVariables
> {
  document = GetSiteCommitmentDisplayOrdersDocument
}
export const GetHandlingAdvicesDocument = gql`
  query getHandlingAdvices {
    handlingAdvices {
      value: id
      label: title
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetHandlingAdvicesGQL extends Apollo.Query<
  GetHandlingAdvicesQuery,
  GetHandlingAdvicesQueryVariables
> {
  document = GetHandlingAdvicesDocument
}
export const MapPointsSearchDocument = gql`
  query MapPointsSearch($refiner: CommitmentRefinerGraph!, $book: BookType!) {
    mapPoints(refiner: $refiner, book: $book) {
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
export const UpdatePmcHandlingAdviceCommitmentDocument = gql`
  mutation updatePmcHandlingAdviceCommitment(
    $messageId: Guid!
    $conversationId: Guid
    $data: UpdatePmcHandlingAdviceCommitmentGraph!
  ) {
    updatePmcHandlingAdviceCommitment(
      messageId: $messageId
      conversationId: $conversationId
      updatePmcHandlingAdviceCommitment: $data
    ) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdatePmcHandlingAdviceCommitmentGQL extends Apollo.Mutation<
  UpdatePmcHandlingAdviceCommitmentMutation,
  UpdatePmcHandlingAdviceCommitmentMutationVariables
> {
  document = UpdatePmcHandlingAdviceCommitmentDocument
}
export const UpdatePmoHandlingAdviceCommitmentDocument = gql`
  mutation updatePmoHandlingAdviceCommitment(
    $messageId: Guid!
    $conversationId: Guid
    $data: UpdatePmoHandlingAdviceCommitmentGraph!
  ) {
    updatePmoHandlingAdviceCommitment(
      messageId: $messageId
      conversationId: $conversationId
      updatePmoHandlingAdviceCommitment: $data
    ) {
      id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UpdatePmoHandlingAdviceCommitmentGQL extends Apollo.Mutation<
  UpdatePmoHandlingAdviceCommitmentMutation,
  UpdatePmoHandlingAdviceCommitmentMutationVariables
> {
  document = UpdatePmoHandlingAdviceCommitmentDocument
}
