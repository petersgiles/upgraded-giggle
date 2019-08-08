import { Injectable } from '@angular/core'
import { Recommendation } from '../../models'
import { CoreMapperService } from './core-mapper.service'

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
    const brief = super.idFromLookup(item.Brief)
    const subPolicy = super.idFromLookup(item.SubPolicy)
    const policy = super.idFromLookup(item.Policy)

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
}
