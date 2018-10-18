import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'

import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { MdcDialog, MdcDialogRef } from '@angular-mdc/web'
import { map, first } from 'rxjs/operators'
import { DialogAreYouSureComponent, DialogSpinnerOverlayComponent } from '@digital-first/df-dialogs'

import { CommitmentDataService } from '../../services/commitment-data.service'
import { Commitment, Party, Portfolio } from '../../models/commitment-models'

@Component({
  selector: 'digital-first-commitment-edit',
  templateUrl: './commitment-edit.component.html',
  styleUrls: ['./commitment-edit.component.scss']
})
export class CommitmentEditComponent implements OnInit, OnDestroy {

  commitment$: Observable<Commitment>
  currentComments$: Observable<Comment[]>
  selectId$: Subscription
  error$: Observable<any>
  announcementTypes$: Observable<any>
  parties$: Observable<Party[]>
  portfolios$: Observable<Portfolio[]>
  locations$: Observable<Location[]>
  activeComment: any
  timeFormat: string
  loadingSubscription$: Subscription
  loadingDialogRef: MdcDialogRef<DialogSpinnerOverlayComponent, {}>

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MdcDialog, private service: CommitmentDataService) { }

  ngOnInit(): void {
    this.timeFormat = 'timeAgo'

    this.error$ = this.service.CommitmentError
    this.commitment$ = this.service.Commitment

    this.announcementTypes$ = this.service.AnnouncementTypes
    this.parties$ = this.service.Parties
    this.portfolios$ = this.service.Portfolios
    this.locations$ = this.service.Locations

    this.selectId$ = this.route.paramMap
      .pipe(
        map((params: ParamMap) => +params.get('id')),
        map(selectedId => this.service.getCommitment({ id: selectedId }))
      )
      .subscribe()

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

  ngOnDestroy(): void {
    this.selectId$.unsubscribe()
    this.loadingSubscription$.unsubscribe()
  }

  handleUpdateCommitment(commitment) {
    // tslint:disable-next-line:no-console
    console.log(commitment)
    this.service.upsertCommitment(commitment)
  }

  handleCancelled($event) {
    this.router.navigate(['/', 'commitments'])
  }

  handleChanged(commitment: Commitment) {
    // tslint:disable-next-line:no-console
    console.log(commitment)
  }

  handleDeleteComment(comment) {

    const commentId = comment.id

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result && commentId) {
          this.service.deleteComment({ id: commentId, commitment: comment.hostId })
        }
      })
  }

  changeDateFormat(format) {
    this.timeFormat = format
  }

  handleReplyToComment(comment) {
    const oldActive = this.activeComment
    this.activeComment = null
    if (comment) {
      if (oldActive !== comment.id) {
        this.activeComment = comment.id
      }
    }
  }

  handleAddComment(newComment) {

    const parentId = newComment.parent ? newComment.parent.id : null

    this.service.createComment({
      commitment: newComment.hostId,
      parent: parentId,
      comment: newComment.text,
      author: 'Domenica20'
    })
    this.activeComment = null
  }
  handleTabScroll(el) {
    el.scrollIntoView()
    window.scrollBy(0, -128)
  }
}
