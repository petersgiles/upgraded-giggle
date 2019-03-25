import { Component, OnInit } from '@angular/core'
import { tap, map } from 'rxjs/operators'
import { CommitmentsSearchGQL } from '../../generated/graphql';

@Component({
  selector: 'digital-first-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {
  commitmentsTableData$
  columns
  count

  constructor(private commitmentsSearchGQL: CommitmentsSearchGQL) {
    this.columns = [
      { prop: 'id', name: 'Id' },
      { prop: 'title', name: 'Title' },
      { prop: 'party', name: 'Party' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'commitmentType', name: 'Type of Commitment' },
      { prop: 'criticalDate', name: 'Critical Date' }
    ]
  }

  ngOnInit() {
    this.commitmentsTableData$ = this.commitmentsSearchGQL
      .fetch(
        { input: {} },
        { fetchPolicy: 'network-only' }
        )
      .pipe(
        tap(result => console.log(result)),
        map(result => result.data.commitments)
        )
  }

  handleCommitmentsRowClicked($event) {}
}
