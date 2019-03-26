import { Component, OnInit } from '@angular/core'
import { tap, map } from 'rxjs/operators'
import {
  CommitmentsSearchGQL,
  CommitmentPartsFragment
} from '../../generated/graphql'
import { Observable } from 'rxjs'

@Component({
  selector: 'digital-first-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {
  public commitmentsTableData$: Observable<CommitmentPartsFragment[]>
  public columns: { prop: string; name: string }[]
  public count: number

  constructor(private commitmentsSearchGQL: CommitmentsSearchGQL) {
    this.columns = [
      { prop: 'id', name: 'Id' },
      { prop: 'title', name: 'Title' },
      // { prop: 'party', name: 'Party' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'type', name: 'Type of Commitment' },
      { prop: 'criticalDate', name: 'Critical Date' }
    ]
  }

  ngOnInit() {
    this.commitmentsTableData$ = this.commitmentsSearchGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        // tslint:disable-next-line:no-console
        tap(result => console.log(result)),
        map(result => result.data.commitments)
      )
  }

  handleCommitmentsRowClicked($event) {}
}
