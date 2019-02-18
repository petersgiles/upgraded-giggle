import { Component, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent} from '@digital-first/df-dialogs'
import {map, first } from 'rxjs/operators'
import {Subscription} from 'rxjs'
import { AgencyGQL, Agency, DeleteAgencyGQL, DeleteAgencyMappingGQL } from '../../generated/graphql'
import {MdcDialog} from '@angular-mdc/web'

@Component({
  selector: 'digital-first-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit, OnDestroy {

  agencyId: any
  agency: Agency.Agency
  agencySubscription$: Subscription
  agencyMappingTableData: any

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()
  @Output() onCellClicked: EventEmitter<any> = new EventEmitter()

  constructor(private route: ActivatedRoute,
              private agencyGQL: AgencyGQL,
              private deleteAgencyGQL: DeleteAgencyGQL,
              private deleteAgencyMappingGQL: DeleteAgencyMappingGQL,
              public dialog: MdcDialog,
              private router: Router,
              private cd: ChangeDetectorRef) { }

 ngOnInit() {
    this.agencyId = this.route.snapshot.paramMap.get('id')
    this.loadAgency()
  }

private loadAgency(): void {
  this.agencySubscription$ = this.agencyGQL
  .watch({id: this.agencyId}, {fetchPolicy: 'network-only'})
  .valueChanges.pipe(map(value => value.data.agency))
  .subscribe(agency => {
    this.agency = agency
    this.agencyMappingTableData = this.createAgencyMappingTableData(agency)
  })
}

private createAgencyMappingTableData(agency: Agency.Agency) {
  const agencyMapped = agency.agencyMapping.map(data => ({
    id: data.id,
    emailDomain: data.emailDomain,
    group: data.accessControlGroup.title
  }))

  const rows = (agencyMapped || []).map(d => ({
    id: d.id,
    data: d,
    cells: [
      {
        value: `${d.emailDomain}`
      },
      {
        value: d.group
      }
    ]
  }))

  return {
    title: 'Group Mapping',
    headings: [{ caption: 'Email Domain' }, { caption: 'Group' }],
    rows: rows,
    noDataMessage:
      'No groups assigned to agency.'
  }
}
  private handleEditAgency(agency: Agency.Agency) {
    return this.router.navigate(['agencies/edit', agency.id])
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
            .subscribe(value => this.router.navigate(['agencies']))
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
