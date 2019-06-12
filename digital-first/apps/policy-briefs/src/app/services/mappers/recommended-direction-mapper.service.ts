import { Injectable } from '@angular/core'
import { RecommendedDirection } from '../../models'
import { CoreMapperService } from './core-mapper.service'

@Injectable({
  providedIn: 'root'
})
export class RecommendedDirectionMapperService extends CoreMapperService<
  RecommendedDirection
> {
  constructor() {
    super()
  }

  public mapSingle(item: any): RecommendedDirection {
    const brief = this.idFromLookup(item.Brief)
    const recommendation = this.idFromLookup(item.Recommendation)

    return {
      id: item.ID,
      title: item.Title,
      recommendation: recommendation,
      brief: brief
    }
  }
}
