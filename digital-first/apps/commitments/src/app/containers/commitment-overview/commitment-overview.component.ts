import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { MdcDialog } from '@angular-mdc/web'
import { Commitment } from '../../models/commitment-models'

@Component({
  selector: 'digital-first-commitment-overview',
  templateUrl: './commitment-overview.component.html',
  styleUrls: ['./commitment-overview.component.scss']
})
export class CommitmentOverviewComponent implements OnInit, OnDestroy {
  commitments$: Observable<Commitment[]>
  loading$: Observable<boolean>
  error$: Observable<any>

  constructor(public dialog: MdcDialog, private router: Router, private service: CommitmentDataService) { }

  ngOnInit() {
    this.commitments$ = this.service.Commitments
    this.loading$ = this.service.CommitmentLoading
    this.error$ = this.service.CommitmentError

    this.service.filterCommitments()

  }

  ngOnDestroy() {

  }

  handleEdit(commitment?: Commitment) {
    this.router.navigate(['/', 'commitment', commitment.id])
  }

  handleCreate() {
    this.router.navigate(['/', 'commitment'])
  }

  handleShare(commitment?: Commitment) {
    this.router.navigate(['/', 'commitment', commitment.id])
  }
}