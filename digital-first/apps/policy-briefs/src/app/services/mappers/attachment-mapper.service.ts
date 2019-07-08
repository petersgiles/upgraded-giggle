import { Injectable } from '@angular/core'
import { CoreMapperService } from './core-mapper.service'
import { Attachment } from '../../models'

@Injectable({
  providedIn: 'root'
})
export class AttachmentMapperService extends CoreMapperService<Attachment> {
  constructor() {
    super()
  }

  public mapSingle(item: any): Attachment {
    const brief = super.idFromLookup(item.Brief)

    return {
      id: item.ID,
      fileLeafRef: item.FileLeafRef,
      notes: item.Notes0,
      title: item.Title,
      briefId: brief,
      order: item.SortOrder
    }
  }
}
