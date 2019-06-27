import { Component, OnInit } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { select, Store } from '@ngrx/store'
import {
  switchMap,
} from 'rxjs/operators'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import {
  SetActiveBrief
} from '../../../reducers/brief/brief.actions'
import { SetActiveBriefPath } from '../../../reducers/navigation/navigation.actions'
import { EMPTY, BehaviorSubject } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import { statuslist } from '../mock-data'
import { MdcDialog } from '@angular-mdc/web';

@Component({
  selector: 'digital-first-brief-subscription-editor',
  templateUrl: './brief-subscription-editor.component.html',
  styleUrls: ['./brief-subscription-editor.component.scss']
})
export class BriefSubscriptionEditorComponent implements OnInit {
  public background$: BehaviorSubject<string> = new BehaviorSubject('#455a64')
  documentStatusList$: BehaviorSubject<any>
  brief$: any
  selectId$: any

  activities$: BehaviorSubject<any>
  activeBriefId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder, 
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))
    this.documentStatusList$ = new BehaviorSubject(statuslist)
    this.activities$ = new BehaviorSubject([
      { caption: `Decision` },
      { caption: `New Comments` },
      { caption: `New Documents` },
      { caption: `Updates and Changes` }
    ])

    this.selectId$ = this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => {
        this.activeBriefId = params.get('id')

        console.log(`🍏`, this.activeBriefId)

        this.store.dispatch(
          new SetActiveBrief({ activeBriefId: this.activeBriefId })
        )
        this.store.dispatch(
          new SetActiveBriefPath({ activeBriefId: this.activeBriefId })
        )

        return EMPTY
      })
    )
    .subscribe()
  }

  handleView($event) {
    this.router.navigate(['/brief', this.activeBriefId])
  }
}
