import { Component, OnInit, Input } from '@angular/core'
import { BehaviorSubject, EMPTY } from 'rxjs'
import { first, tap, map, catchError } from 'rxjs/operators'
import { BriefDataService } from '../../../reducers/brief/brief-data.service'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { select, Store } from '@ngrx/store'

@Component({
  selector: 'digital-first-brief-document',
  templateUrl: './brief-document.component.html',
  styleUrls: ['./brief-document.component.scss']
})
export class BriefDocumentComponent implements OnInit {
  public briefHtml$: BehaviorSubject<string> = new BehaviorSubject(null)
  public error$: BehaviorSubject<any> = new BehaviorSubject(null)
  briefSubscription$: any
   constructor(
    private service: BriefDataService,
    private store: Store<fromRoot.State>
  ) {}
  ngOnInit() {
    this.briefSubscription$ = this.store
      .pipe(select(fromBrief.selectBriefState))
      .subscribe(brief => {
        if (brief && brief.fileLeafRef) {
          // clear extension

          const fileLeafRef = brief.fileLeafRef
            .split('.')
            .slice(0, -1)
            .join('.')

          this.service
            .getBriefHtml(fileLeafRef)
            .pipe(first())
            .subscribe(result => {
              if (!result.error) {
                this.error$.next(null)
                this.briefHtml$.next(result.data)
              } else {
                this.error$.next(result.error)
                this.briefHtml$.next(null)
              }
            })
        }
      })
  }

  ngOnDestroy() {
    this.briefSubscription$.unsubscribe()
  }
}
