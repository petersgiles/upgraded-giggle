import {Component, OnDestroy, OnInit} from '@angular/core'
import {AccessRights, AllGroupsGQL, AssignGroupToReportGQL, Report, ReportGQL} from '../../generated/graphql'
import {ActivatedRoute} from '@angular/router'
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

  constructor(private reportGQL: ReportGQL,
              private route: ActivatedRoute,
              private allGroupsGQL: AllGroupsGQL,
              private assignGroupToReportGQL: AssignGroupToReportGQL,
              public dialog: MdcDialog) {
  }

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id')

    this.reportSubscription$ = this.reportGQL.watch({reportId: this.reportId}, {fetchPolicy: 'network-only'})
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
    this.allGroupsGQL
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
            this.assignGroupToReportGQL
              .mutate(
                {
                  data: {
                    accessControlGroupId: result.id,
                    reportId: this.reportId,
                    accessRights: AccessRights.Read,
                    rowVersion: '' // TODO: what to do here as row version is not available as it is new record
                  }
                },
                {
                  refetchQueries: [
                    {
                      query: this.reportGQL.document,
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

  handleGroupPermissionGroupClicked($event: any) {
    console.log('TODO update')
  }

  handleGroupPermissionChangeClicked($event: any) {
    console.log('TODO')
  }

  handleGroupPermissionDeleteClicked($event: any) {
    console.log('TODO')
  }
}
