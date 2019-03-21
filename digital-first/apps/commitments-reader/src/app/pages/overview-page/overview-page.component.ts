import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'digital-first-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  commitmentsTableData$
  columns
  count

  constructor() {
    this.columns = [
      { prop: 'commitmentId', name: 'Id' },
      { prop: 'title', name: 'Title' },
      { prop: 'party', name: 'Party' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'commitmentType', name: 'Type of Commitment' },
      { prop: 'criticalDate', name: 'Critical Date' }
    ]

  }

  ngOnInit() {}

  handleCommitmentsRowClicked($event) {}
}
