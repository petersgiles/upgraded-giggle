import { Component, OnInit, Input } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { first, tap } from 'rxjs/operators'

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

    if (this._brief && this._brief.fileLeafRef) {
      // clear extension
      const fileLeafRef = this._brief.fileLeafRef
        .split('.')
        .slice(0, -1)
        .join('.')
      this.getBriefHtml(fileLeafRef)
    }
  }

  get brief() {
    return this._brief
  }

  public getBriefHtml(fileLeafRef) {
    const relativeUrl = `http://vm-dev-lbs13/sites/redigb/BriefHTML/${fileLeafRef}.aspx`

    return this.http
      .get(relativeUrl, { responseType: 'text' })
      .pipe(
        first()
      )
      .subscribe((html: string) => {
        this.briefHtml$.next(html)
      })
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {}
}
