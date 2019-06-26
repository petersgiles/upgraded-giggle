import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { statuslist } from '../mock-data'

@Component({
  selector: 'digital-first-brief-subscription-editor',
  templateUrl: './brief-subscription-editor.component.html',
  styleUrls: ['./brief-subscription-editor.component.scss']
})
export class BriefSubscriptionEditorComponent implements OnInit {
  public background$: BehaviorSubject<string> = new BehaviorSubject('#455a64')
  documentStatusList$: BehaviorSubject<any>

  activities$: BehaviorSubject<any>

  constructor() {}

  ngOnInit() {
    this.documentStatusList$ = new BehaviorSubject(statuslist)
    this.activities$ = new BehaviorSubject([
      { caption: `Decision` },
      { caption: `New Comments` },
      { caption: `New Documents` },
      { caption: `Updates and Changes` }
    ])
  }
}
