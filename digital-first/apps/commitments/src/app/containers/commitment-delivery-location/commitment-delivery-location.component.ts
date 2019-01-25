import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { OPERATION_LOCATION } from '../../services/app-data.service'
import { Subscription, Observable } from 'rxjs'
import { Router } from '@angular/router'
import { MdcDialog } from '@angular-mdc/web'

import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { DeliveryLocationService } from '../../reducers/commitment-delivery-location/commitment-delivery-location.service'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { Electorate } from '../../models/location.model'
import { MapPoint } from '@digital-first/df-components'
@Component({
  selector: 'digital-first-commitment-delivery-location',
  templateUrl: './commitment-delivery-location.component.html',
  styles: [``]
})
export class CommitmentDeliveryLocationComponent implements OnInit, OnDestroy {

  _commitment: number
  expanded: boolean
  expandedSubscription$: Subscription
  userOperation$: Observable<any>
  tableData$: any
  electorates$: Observable<Electorate[]>
  selectedElectorateIds: number[] = []
  mapPoint$: Observable<MapPoint[]>
  selectedElectoratesSubscription$: Subscription
  selectedElectorateNames: string[] = [];

  constructor(private router: Router, public dialog: MdcDialog, private service: DeliveryLocationService, private lookup: CommitmentLookupService) {
    this.electorates$ = this.lookup.Locations
   }

  @Input()
  set commitment(val: number) {
    this._commitment = val
  }

  get commitment() {
    return this._commitment
  }

  handleRemoveElectorateFromCommitment(electorate) {
    this.service.removeElectorateFromCommitment(this.commitment, electorate.value.id)
  }

  handleAddElectorateToCommitment(electorate) {
    this.service.addElectorateToCommitment(this.commitment, electorate.id)
  }

  handleAddMapPoint(mapPoint) {
    this.service.addMapPointToCommitment(this.commitment, mapPoint)
  }

  handleDeleteMapPoint(mapPoint) {

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT) {
          this.service.removeMapPointFromCommitment(this.commitment, mapPoint.id)
        }
      })
  }

  handleChangeExpanded(expanded) {
    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }

  }

  ngOnInit(): void {
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)
    this.mapPoint$ = this.service.MapPoints
    this.selectedElectoratesSubscription$ = this.service.Electorates.subscribe((p: any[]) => {
      this.selectedElectorateIds = p ? p.map(e => e.id) : []
      this.selectedElectorateNames = p ? p.map(e => e.title) : []
    })
    this.userOperation$ = this.service.UserOperation
  }

  getRight(operations: any) {
    return operations[OPERATION_LOCATION]
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
    this.selectedElectoratesSubscription$.unsubscribe()
  }

}
