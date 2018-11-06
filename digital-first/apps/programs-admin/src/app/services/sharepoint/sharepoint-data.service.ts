import { Injectable } from '@angular/core'

import { SharepointJsomService, fromLookup } from '@digital-first/df-sharepoint'
import { AppDataService } from '../app-data.service'

@Injectable({
  providedIn: 'root'
})
export class SharepointDataService implements AppDataService {

  constructor(private sharepoint: SharepointJsomService) { }
}
