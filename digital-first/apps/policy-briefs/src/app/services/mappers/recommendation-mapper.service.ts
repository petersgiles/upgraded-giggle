import { Injectable } from '@angular/core'
import { Recommendation, RecommendationResponse } from '../../models'
import { CoreMapperService } from './core-mapper.service'
import { RecommendationResponseMapperService } from './recommendation-response-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationMapperService extends CoreMapperService<
  Recommendation
> {
  constructor() {
    super()
  }

  public mapSingle(item: any): Recommendation {
    const b = super.idFromLookup(item.Brief)
    const s = super.idFromLookup(item.SubPolicy)
    const p = super.idFromLookup(item.Policy)

    const recommendationMapperService = new RecommendationResponseMapperService()
    const response = recommendationMapperService.mapSingle(item.Response) 

    const mapped = {
      id: item.ID,
      title: item.Title,
      recommendation: item.Recommendation,
      order: item.SortOrder,
      outcome1: item.Outcome1,
      outcome2: item.Outcome2,
      outcome3: item.Outcome3,
      colour: item.Colour,
      brief: b,
      subPolicy: s,
      policy: p,
      response: response
    }

console.log(`🐧`, item, mapped, b, s, p)

    return mapped
  }
}
