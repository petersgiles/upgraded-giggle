import { Component, OnInit, OnDestroy } from '@angular/core'
import { tap, map } from 'rxjs/operators'
import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, BehaviorSubject } from 'rxjs'
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
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit, OnDestroy {
  commitmentsData$
  constructor(private dataService: CommitmentRefinerService) {}
  rows: CommitmentRow[]
  filterCommitments$: BehaviorSubject<CommitmentRow[]>

  ngOnInit() {
    this.commitmentsData$ = this.dataService.commitments$.pipe(
      map(result => {
        const commitments = []
        result.forEach(c => commitments.push({ id: c.id, name: c.title }))
        return commitments
      })
    )
    this.getCommitments()
    this.dataService.getRefinedCommitments()
  }

  getCommitments() {
    this.dataService.commitments$
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
        console.log(value)
        this.filterCommitments$ = new BehaviorSubject(this.rows)
      })
    this.dataService.getRefinedCommitments()
  }

  ngOnDestroy(): void {
    this.filterCommitments$.unsubscribe()
  }
}
