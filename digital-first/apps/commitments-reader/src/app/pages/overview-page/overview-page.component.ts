import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, of } from 'rxjs'
import { withLatestFrom, map, filter } from 'rxjs/operators'
import {
  CommitmentRefinerService,
  DataTableColumn
} from '../../services/commitment-refiner'
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store'
//import * as fromRefiner from '../../reducers/refiner'
import * as fromRefiner from '../../reducers/refiner/refiner.reducer'

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

  constructor(private dataService: CommitmentRefinerService,  private router: Router, private store: Store<any>) {
   
  }

  ngOnInit() {
    this.columns$ = this.dataService.columns$

    this.store.pipe(
      select(fromRefiner.selectRefinerCommitmentItems)).subscribe(
        ([data, cols]) => {
          if(data && data.length){
            this.handleCommitments(data, cols)
          }
        })
  }

  handleCommitments(data, cols) {
      this.columns$ = of(cols)
      const rows = data.map(row => ({
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
  }


  ngOnDestroy(): void {}

  handleCommitmentsRowClicked(item) {
    this.router.navigate(['/', 'commitment', item.id])
  }
}
