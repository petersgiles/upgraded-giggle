import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import * as fromRoot from '../../reducers/index'
import { Store, select } from '@ngrx/store';
import { selectAppBackgroundColour } from '@digital-first/df-app-core'

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public background$: Observable<string>
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.background$ = this.store.pipe(select(selectAppBackgroundColour))
  }

  handleEvent($event) {}
}
