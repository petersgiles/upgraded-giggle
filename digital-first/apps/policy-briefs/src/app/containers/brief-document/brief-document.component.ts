import { Component, OnInit, Input } from '@angular/core'
import { BehaviorSubject, EMPTY } from 'rxjs'
import { first, tap, map, catchError } from 'rxjs/operators'
import { BriefDataService } from '../../reducers/brief/brief-data.service'

@Component({
  selector: 'digital-first-brief-document',
  templateUrl: './brief-document.component.html',
  styleUrls: ['./brief-document.component.scss']
})
export class BriefDocumentComponent implements OnInit {
  public briefHtml$: BehaviorSubject<string> = new BehaviorSubject(null)
  private _brief
  @Input()
  set brief(value) {
    this._brief = value
    // tslint:disable-next-line: no-console
    console.log(`🦑 brief`, value)
    if (this._brief && this._brief.FileLeafRef) {
      // clear extension

      const fileLeafRef = this._brief.FileLeafRef
        .split('.')
        .slice(0, -1)
        .join('.')

      this.service.getBriefHtml(fileLeafRef).pipe(
        first(),
        // tslint:disable-next-line: no-console
        tap(result => console.log(`🦑 result`, result)),
        // tslint:disable-next-line: no-unnecessary-callback-wrapper
        catchError((err: any) => {
          // tslint:disable-next-line: no-console
          console.error(`🦑 `, err)
          return EMPTY
        })
      )
      .subscribe(result => this.briefHtml$.next(result.data))
    }
  }

  get brief() {
    return this._brief
  }

  constructor(private service: BriefDataService) {}

  ngOnInit() {}
}
