import { Injectable } from '@angular/core'
import { Brief } from '../../models'
import { CoreMapperService } from './core-mapper.service'
import { RecommendationMapperService } from './recommendation-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class BriefMapperService extends CoreMapperService<Brief> {
  constructor( ) {
    super()
  }

  public mapSingle(item: any): Brief {

    const editor = super.fromLookup(item.Editor)
    const subPolicy = super.fromLookup(item.SubPolicy)
    const policy = super.fromLookup(item.Policy)
    const briefStatus = super.fromLookup(item.BriefStatus)
    const briefDivision = super.fromLookup(item.BriefStatus)
    const recommendationMapperService = new RecommendationMapperService()
    const recommendations = recommendationMapperService.mapMany(item.Recommendations) 

    console.log('recommendations', recommendations)

    const brief =  {
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
      briefDivision: briefDivision,
      recommendedDirection: item.RecommendedDirection,
      recommendations: recommendations
    }

    console.log(`🦊`, item, brief)

    return brief
  }
}
