import { Component, OnInit, OnDestroy } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { switchMap, first, tap } from 'rxjs/operators'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import { SetActiveBrief } from '../../../reducers/brief/brief.actions'
import { MdcDialog } from '@angular-mdc/web'

import {
  SetActiveBriefPath,
} from '../../../reducers/navigation/navigation.actions'

import { EMPTY, BehaviorSubject } from 'rxjs'

import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'


import { DiscussionType } from '../../../models'

@Component({
  selector: 'digital-first-brief-reader',
  templateUrl: './brief-reader.component.html',
  styleUrls: ['./brief-reader.component.scss']
})
export class BriefReaderComponent implements OnInit {

  brief$: any
  selectId$: any
  activeBriefId: string

  public background$: BehaviorSubject<string> = new BehaviorSubject('#455a64')

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {

    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))

    this.selectId$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.activeBriefId = params.get('id')

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

  ngOnDestroy() {}


  handleEdit($event) {
    // tslint:disable-next-line:no-console
    console.log('🐛 - handleEdit', $event)

    this.router.navigate(['/brief', this.activeBriefId, 'edit'])
  }
  
  handleSubscribe($event) {
    // tslint:disable-next-line:no-console
    console.log('🐛 - handleEdit', $event)

    this.router.navigate(['/brief', this.activeBriefId, 'subscribe'])
  }
  
  handleOpenDocument($event) {
    // tslint:disable-next-line:no-console
    console.log('🐛 - handleOpenDocument', $event)

    this.router.navigate(['/brief', this.activeBriefId, 'edit'])
  }
  
}
