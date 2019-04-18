import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommitmentPartsFragment } from '../../generated/graphql'
import { Observable, BehaviorSubject } from 'rxjs'
import {
  CommitmentRefinerService,
  DataTableColumn
} from '../../services/commitment-refiner'
import { tap } from 'rxjs/operators'
interface CommitmentRow {
  id: number
  title: string
  politicalParty: string
  announcedBy: string
  announcementType?: string
  criticalDate?: string
  portfolio?: string
}
@Component({
  selector: 'digital-first-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy {
  public commitmentsTableData$: Observable<CommitmentPartsFragment[]>
  filterCommitments$: BehaviorSubject<CommitmentRow[]>
  rows: CommitmentRow[]
  public columns$: Observable<DataTableColumn[]>
  public count: number

  constructor(private dataService: CommitmentRefinerService) {}

  ngOnInit() {
    this.columns$ = this.dataService.columns$
    this.commitmentsTableData$ = this.dataService.commitments$

    this.commitmentsTableData$
      .pipe(tap((result: any) => result))
      .subscribe(value => {
        this.rows = value.map(row => ({
          id: row.id,
          title: row.title,
          politicalParty: row.politicalParty,
          announcedBy: row.announcedBy,
          announcementType: (row.announcementType || {}).title,
          criticalDate: (row.criticalDate || {}).title,
          portfolio: (row.portfolioLookup || {}).title
        }))
        this.filterCommitments$ = new BehaviorSubject(this.rows)
      })
    this.dataService.getOverviewPage()
  }

  ngOnDestroy(): void {
    this.filterCommitments$.unsubscribe()
  }

  handleCommitmentsRowClicked($event) {}
}
