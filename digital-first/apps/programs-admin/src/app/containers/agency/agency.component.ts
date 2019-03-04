import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { first, map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import {
  Agency,
  AgencyGQL,
  DeleteAgencyGQL,
  DeleteAgencyMappingGQL
} from '../../generated/graphql'
import { MdcDialog } from '@angular-mdc/web'
import { formConstants } from '../../form-constants'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'

@Component({
  selector: 'digital-first-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit, OnDestroy {
  agencyId: string
  agency: Agency.Agency
  agencySubscription$: Subscription

  emptyTableMessage = {
    emptyMessage: 'No groups assigned to agency.',
    totalMessage: 'total'
  }

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()
  @Output() onCellClicked: EventEmitter<any> = new EventEmitter()

  defaultPageLength: number = formConstants.defaultPageLength
  columns = [
    { prop: 'emailDomain', name: 'Email Domain' },
    { prop: 'group', name: 'Group' }
  ]
  private agencyAndGroupMappings: any

  constructor(
    private route: ActivatedRoute,
    private agencyGQL: AgencyGQL,
    private deleteAgencyGQL: DeleteAgencyGQL,
    private deleteAgencyMappingGQL: DeleteAgencyMappingGQL,
    public dialog: MdcDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.agencyId = this.route.snapshot.paramMap.get('id')
    this.loadAgency()
  }

  private loadAgency(): void {
    this.agencySubscription$ = this.agencyGQL
      .watch({ id: this.agencyId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.agency))
      .subscribe(agency => {
        this.agency = agency

        this.agencyAndGroupMappings = agency.agencyMapping.map(data => ({
          id: data.id,
          emailDomain: data.emailDomain,
          group: data.accessControlGroup.title
        }))
      })
  }

  private handleEditAgency(agency: Agency.Agency) {
    return this.router.navigate(['agencies/edit', agency.id], {
      skipLocationChange: true
    })
  }

  private handleDeleteAgency(agency: Agency.Agency) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.agency) {
          this.deleteAgencyGQL
            .mutate(
              {
                data: {
                  id: agency.id
                }
              },
              {}
            )
            .subscribe(() => this.router.navigate(['agencies']))
        }
      })
  }

  private handleEditAgencyMapping($event) {
    return this.router.navigate(['agencymapping/edit/', $event.id])
  }

  private handleDeleteAgencyMapping($event) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.agency) {
          this.deleteAgencyMappingGQL
            .mutate(
              {
                data: {
                  id: $event.id
                }
              },
              {}
            )
            .subscribe(() => {
              this.agencySubscription$.unsubscribe()
              this.loadAgency()
            })
        }
      })
  }

  private handleAddAgencyMapping(agency: Agency.Agency) {
    return this.router.navigate(['agencymapping/add/', agency.id])
  }

  ngOnDestroy(): void {
    this.agencySubscription$.unsubscribe()
  }
}
