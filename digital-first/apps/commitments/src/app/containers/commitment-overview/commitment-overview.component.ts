import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { MdcDialog, MdcDialogRef } from '@angular-mdc/web'

import { DialogSpinnerOverlayComponent } from '@digital-first/df-dialogs'
import { Commitment } from '../../reducers/commitment/commitment.model'

@Component({
  selector: 'digital-first-commitment-overview',
  templateUrl: './commitment-overview.component.html',
  styleUrls: ['./commitment-overview.component.scss']
})
export class CommitmentOverviewComponent implements OnInit, OnDestroy {

  commitments$: Observable<Commitment[]>
  error$: Observable<any>
  loadingSubscription$: Subscription
  loadingDialogRef: MdcDialogRef<DialogSpinnerOverlayComponent, {}>
  pageFormat: 'card' | 'list' = 'list'
  refinerGroups$: Observable<any>

  constructor(public dialog: MdcDialog, private router: Router, private service: CommitmentDataService) { }

  ngOnInit() {
    this.commitments$ = this.service.Commitments
    this.refinerGroups$ = this.service.RefinerGroups
    this.error$ = this.service.CommitmentError

    this.service.getAllWhoAnnouncedTypes()
    this.service.getAllAnnouncementTypes()
    this.service.getAllCommitmentTypes()
    this.service.getAllLocations()
    this.service.getAllPartys()
    this.service.getAllPortfolios()

    this.service.getAllCommitments()

    // this is to avoid component validation check errors
    setTimeout(() => {
      this.loadingSubscription$ = this.service.CommitmentLoading.subscribe((loading) => {
        if (loading) {
          this.loadingDialogRef = this.dialog.open(DialogSpinnerOverlayComponent, {})
        } else if (this.loadingDialogRef) {
          this.loadingDialogRef.close()
        }
      })
    })
  }

  ngOnDestroy() {
    this.loadingSubscription$.unsubscribe()
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

  handleRefinerGroupSelected(refiner) {
    if (refiner.expanded) {
      this.service.collapseRefinerGroup(refiner)
    } else {
      this.service.expandRefinerGroup(refiner)
    }
  }

  handleRefinerSelected(refiner) {
    if (refiner.selected) {
      this.service.removeRefiner(refiner)
    } else {
      this.service.addRefiner(refiner)
    }
  }

  changePageFormat(format) {
    this.pageFormat = format
  }
}