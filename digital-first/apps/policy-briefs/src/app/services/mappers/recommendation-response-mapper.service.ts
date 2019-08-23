import { Injectable } from '@angular/core'
import { CoreMapperService } from './core-mapper.service'
import { RecommendationResponse } from '../../models'

@Injectable({
  providedIn: 'root'
})
export class RecommendationResponseMapperService extends CoreMapperService<
  RecommendationResponse
> {
  constructor() {
    super()
  }

  public mapSingle(item: any): RecommendationResponse {

    const mapped = item
      ? {
          id: super.idFromLookup(item),
          value: item.Title
        }
      : null

    console.log(`🐗`, item, mapped)

    return mapped
  }
}
