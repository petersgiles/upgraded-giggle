import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  CommitmentRefinerService,
  DataTableColumn
} from '../../services/commitment-refiner'
import { Router } from '@angular/router';

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
  filterCommitments$: Observable<CommitmentRow[]>
  rows: CommitmentRow[]
  public columns$: Observable<DataTableColumn[]>
  public count: number

  constructor(private dataService: CommitmentRefinerService,  private router: Router) {}

  ngOnInit() {
    this.columns$ = this.dataService.columns$
    this.dataService.commitments$.subscribe(value => {
      const rows = value.map(row => ({
        id: row.id,
        title: row.title,
        politicalParty: row.politicalParty,
        announcedBy: row.announcedBy,
        announcementType: row.announcementType
          ? row.announcementType.title
          : '',
        criticalDate: row.criticalDate ? row.criticalDate.title : '',
        portfolio: row.portfolioLookup ? row.portfolioLookup.title : ''
      }))
      this.filterCommitments$ = of(rows)
    })
    this.dataService.getRefinedCommitments()
  }

  ngOnDestroy(): void {}

  handleCommitmentsRowClicked(item) {
    this.router.navigate(['/', 'commitment', item.id])
  }
}
