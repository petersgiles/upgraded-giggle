import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { AppConfig } from '../models'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: AppConfig

  constructor(private sharepoint: SharepointJsomService) {}

  init() {
    console.log('init app-config')
    return this.sharepoint.getFromWeb('AppConfig/commitments-reader.txt').pipe(
      map(data => {
        console.log('config loaded')
        this.config = JSON.parse(data)
      })
    )
  }

  getBookType = () => {
    console.log('getting booktype', this.config.bookType)
    return this.config && this.config.bookType
  }
}
