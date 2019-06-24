import { Injectable } from '@angular/core'
import { Brief } from '../../models'
import { CoreMapperService } from './core-mapper.service'

@Injectable({
  providedIn: 'root'
})
export class BriefMapperService extends CoreMapperService<Brief> {
  constructor() {
    super()
  }

  public mapSingle(item: any): Brief {
    console.log(`BriefMapperService`, item)

    const editor = this.fromLookup(item.Editor)
    const subPolicy = this.fromLookup(item.SubPolicy)
    const policy = this.fromLookup(item.Policy)
    const briefStatus = this.fromLookup(item.BriefStatus)
    const briefDivision = this.fromLookup(item.BriefStatus)

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
}
