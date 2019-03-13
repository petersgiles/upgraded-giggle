import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { Observable, Subscription } from 'rxjs'
import { MdcDialog } from '@angular-mdc/web'
import { OPERATION_COMMITMENT_PACKAGE } from '../../services/app-data.service'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { CommitmentPackageService } from '../../reducers/commitment-package/commitment-package.service'
import { Package } from '../../models'

@Component({
  selector: 'digital-first-commitment-package',
  templateUrl: './commitment-package.component.html',
  styleUrls: ['./commitment-package.component.scss']
})
export class CommitmentPackageComponent implements OnInit, OnDestroy {
  title = 'Related Package'
  _commitment: number
  userOperation$: Observable<any>
  packageSubscription$: Subscription
  packages: Package[]
  commitmentPackage$: Observable<Package[]>
  expandedSubscription$: Subscription
  expanded: boolean
  commitmentPackagesSubscription$: Subscription
  megaTags$: any;

  constructor(
    public dialog: MdcDialog,
    private service: CommitmentPackageService,
    private lookup: CommitmentLookupService
  ) {}

  @Input()
  set commitment(val: number) {
    this._commitment = val
    if (val) {
      this.service.getPackagesByCommitment(val)
    }
  }

  get commitment() {
    return this._commitment
  }

  getRight(operations: any) {
    return operations[OPERATION_COMMITMENT_PACKAGE]
  }

  handleChangeExpanded(expanded) {


    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }
  }

  ngOnDestroy(): void {
    this.packageSubscription$.unsubscribe()
    this.commitmentPackagesSubscription$.unsubscribe()
    this.expandedSubscription$.unsubscribe()
  }

  ngOnInit(): void {

    this.megaTags$ =  this.service.SelectedMegaTags
    
    this.commitmentPackagesSubscription$ = this.service.CommitmentPackages.subscribe(
      next => {

        this.related = next || []
      }
    )

    this.packageSubscription$ = this.lookup.PackageTypes.subscribe(next => {

      // the function is used to create a closure
      this.packages = (next || [])
    })

    this.expandedSubscription$ = this.service.Expanded.subscribe(
      p => (this.expanded = p)
    )
    this.userOperation$ = this.service.UserOperation
    this.lookup.getAllPackageTypes()
  }

  related = []

  handleToggleSelected(megaTag) {
    if (!megaTag.selected) {
      this.service.removePackageFromCommitment(this.commitment, megaTag.id)
    } else {
      this.service.addPackageToCommitment(this.commitment, megaTag.id)
    }
  }

  addPackage(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      const myPackage: any = event.previousContainer.data[event.previousIndex]
      this.service.addPackageToCommitment(this.commitment, myPackage.id)
    }
  }

  removePackage(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
    const myPackage: any = event.previousContainer.data[event.previousIndex]

    this.service.removePackageFromCommitment(this.commitment, myPackage.id)
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}
