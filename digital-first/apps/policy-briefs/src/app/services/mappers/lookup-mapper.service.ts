import { Injectable } from '@angular/core'
import { Lookup } from '../../models'
import { CoreMapperService } from './core-mapper.service'

@Injectable({
  providedIn: 'root'
})
export class LookupMapperService extends CoreMapperService<Lookup> {
  constructor() {
    super()
  }

  public mapSingle(item: any): Lookup {
    return { id: item.ID, title: item.Title, order: item.SortOrder, caption: item.Title, icon: item.Icon }
  }
}
