import {
    idFromLookup,
    fromLookup
  } from '@df/sharepoint'

export const mapBrief = (item): any => {
  const editor = fromLookup(item.Editor)
  const subPolicy = fromLookup(item.SubPolicy)
  const policy = fromLookup(item.Policy)
  const briefStatus = fromLookup(item.BriefStatus)
  const briefDivision = fromLookup(item.BriefStatus)

  return {
    id: item.ID,
    fileLeafRef: item.FileLeafRef,
    title: item.Title,
    reference: item.Reference,
    securityClassification: item.SecurityClassification,
    dLM: item.DLM,
    policyDirection: item.PolicyDirection,
    order: item.SortOrder,
    modified: item.Modified,
    dueDate: item.DueDate,
    editor: editor,
    subPolicy: subPolicy,
    policy: policy,
    briefStatus: briefStatus,
    briefDivision: briefDivision
  }
}

export const mapBriefs = (items): any[] => (items || []).map(mapBrief)

export const recommendedDirection = (item): any => {
  const brief = idFromLookup(item.Brief)
  const recommendation = idFromLookup(item.Recommendation)

  return {
    id: item.ID,
    title: item.Title,
    recommendation: recommendation,
    brief: brief
  }
}

export const recommendedDirections = (items): any[] =>
  (items || []).map(recommendedDirection)

export const mapAttachment = (item): any => {
  const brief = idFromLookup(item.Brief)

  return {
    id: item.ID,
    FileLeafRef: item.FileLeafRef,
    notes: item.Notes0,
    title: item.Title,
    briefId: brief,
    order: item.SortOrder
  }
}

export const mapAttachments = (items): any[] => (items || []).map(mapAttachment)

export const mapRecommendation = (item): any => {
  const brief = idFromLookup(item.Brief)
  const subPolicy = idFromLookup(item.SubPolicy)
  const policy = idFromLookup(item.Policy)

  return {
    id: item.ID,
    title: item.Title,
    recommendation: item.Recommendation,
    order: item.SortOrder,
    outcome1: item.Outcome1,
    outcome2: item.Outcome2,
    outcome3: item.Outcome3,
    colour: item.Colour,
    brief: brief,
    subPolicy: subPolicy,
    policy: policy
  }
}

export const mapRecommendations = (items): any[] =>
  (items || []).map(mapRecommendation)

export const mapLookup = (item): any => ({
  id: item.ID,
  title: item.Title,
  order: item.SortOrder
})

export const mapLookups = (items): any[] => (items || []).map(mapLookup)
