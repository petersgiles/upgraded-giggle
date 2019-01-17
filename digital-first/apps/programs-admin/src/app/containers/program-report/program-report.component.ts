import {Component, OnDestroy, OnInit} from '@angular/core'
import {
  AccessRights, AllGroupsGQL, CreateReportAccessControlGQL, DeleteReportAccessControlGQL,
  Report, ReportGQL, UpdateReportAccessControlGQL
} from '../../generated/graphql'
import {ActivatedRoute, Router} from '@angular/router'
import {first, map} from 'rxjs/operators'
import {Subscription} from 'rxjs'
import {DataTableConfig} from '@digital-first/df-components'
import {DialogAssignGroupPermissionComponent} from '../../dialogs/dialog-assign-group-permission.component'
import {MdcDialog} from '@angular-mdc/web'

@Component({
  selector: 'digital-first-program-report',
  templateUrl: './program-report.component.html',
  styleUrls: ['./program-report.component.scss']
})
export class ProgramReportComponent implements OnInit, OnDestroy {

  report: Report.Reports
  permissionTableData: any

  private reportId: string
  private reportSubscription$: Subscription

  constructor(private reportGql: ReportGQL,
              private route: ActivatedRoute,
              private allGroupsGql: AllGroupsGQL,
              private createReportAccessControlGql: CreateReportAccessControlGQL,
              private deleteReportAccessControlGql: DeleteReportAccessControlGQL,
              private updateReportAccessControlGql: UpdateReportAccessControlGQL,
              private router: Router,
              public dialog: MdcDialog) {
  }

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id')

    this.reportSubscription$ = this.reportGql.watch({reportId: this.reportId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.reports[0]))
      .subscribe(report => {
        this.report = report
        this.permissionTableData = this.createProgramPermissionGroupTableData(
          report
        )
      })
  }

  ngOnDestroy(): void {
    this.reportSubscription$.unsubscribe()
  }

  handleOpenAddGroupDialog() {
    this.allGroupsGql
      .watch({}, {fetchPolicy: 'no-cache'})
      .valueChanges.pipe(
      map(value => value.data.groups),
      first()
    )
      .subscribe(groups => {
        const dialogRef = this.dialog.open(
          DialogAssignGroupPermissionComponent,
          {
            escapeToClose: true,
            clickOutsideToClose: true,
            data: {
              groups: groups
            }
          }
        )

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result.id) {
            this.createReportAccessControlGql
              .mutate(
                {
                  data: {
                    accessControlGroupId: result.id,
                    reportId: this.reportId,
                    accessRights: AccessRights.Read
                  }
                },
                {
                  refetchQueries: [
                    {
                      query: this.reportGql.document,
                      variables: {
                        reportId: this.reportId
                      }
                    }
                  ]
                }
              )
              .pipe(first())
              .subscribe(value => {
                console.log('adding ', result)
              })
          }
        })
      })
  }

  handleGroupPermissionGroupClicked($event: any) {
    return this.router.navigate(['groups/', $event.id])
  }

  handleGroupPermissionChangeClicked(row) {
    this.updateReportAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: row.id,
            reportId: this.reportId,
            accessRights: row.cell.value,
            rowVersion: row.row.data.rowVersion
          }
        },
        {}
      )
      .pipe(first())
      .subscribe(value => {
      })
  }

  handleGroupPermissionDeleteClicked($event) {
    this.deleteReportAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: $event.id,
            reportId: this.reportId
          }
        },
        {
          refetchQueries: [
            {
              query: this.reportGql.document,
              variables: {
                reportId: this.reportId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {
        console.log('removing ', $event)
      })
  }

  private createProgramPermissionGroupTableData(report: Report.Reports): DataTableConfig {
    const groups = {}
    report.accessControlList.forEach(acl => {
      acl.accessControlEntries.forEach(ace => {
        groups[ace.accessControlGroup.title] = {
          id: ace.accessControlGroup.id,
          acl: acl.id,
          title: ace.accessControlGroup.title,
          rights: ace.rights,
          rowVersion: ace.rowVersion
        }
      })
    })
    const rows = (Object.keys(groups) || []).map(g => {
      const group = groups[g]
      return {
        id: group.id,
        data: group,
        cells: [
          {
            value: `${group.title}`,
            id: 'GROUPCELL'
          },
          {
            value: group.rights.toUpperCase(),
            type: 'radio',
            id: 'PERMISSIONCELL',
            data: [
              {value: AccessRights.Read, caption: 'Read'},
              {value: AccessRights.Write, caption: 'Read/Write'}
            ]
          }
        ]
      }
    })

    return {
      title: 'permissions',
      hasDeleteItemButton: true,
      headings: [{caption: 'Name'}, {caption: 'Permission'}],
      rows: rows
    }
  }
}
