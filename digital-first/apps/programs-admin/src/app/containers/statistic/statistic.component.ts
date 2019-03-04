import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MdcDialog } from '@angular-mdc/web'
import { first, map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { DialogAssignGroupPermissionComponent } from '../../dialogs/dialog-assign-group-permission.component'
import {
  AccessRights,
  AllGroupsGQL,
  CreateStatisticAccessControlGQL,
  DeleteAccessControlGQL,
  DeleteStatisticGQL,
  DeleteStatisticReportGQL,
  Maybe,
  Statistic,
  StatisticGQL,
  UpdateStatisticAccessControlGQL
} from '../../generated/graphql'
import {
  PermissionChangedEvent,
  PermissionRow
} from '../permission/permission.component'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'

@Component({
  selector: 'digital-first-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  statisticId: string
  statisticSubscription$: Subscription
  statisticReportTableData: Maybe<Maybe<Statistic.StatisticReports>[]>
  statistic: Statistic.Statistic

  noDataMessage =
    'This report inherits permissions from the statistic. Adding groups here will break inheritance.'
  permissionRows: PermissionRow[]

  constructor(
    private route: ActivatedRoute,
    private statisticGql: StatisticGQL,
    private deleteStatisticGql: DeleteStatisticGQL,
    private deleteStatisticReportGql: DeleteStatisticReportGQL,
    private createStatisticAccessControlGql: CreateStatisticAccessControlGQL,
    private updateStatisticAccessControlGql: UpdateStatisticAccessControlGQL,
    private deleteAccessControlGql: DeleteAccessControlGQL,
    private allGroupsGql: AllGroupsGQL,
    private router: Router,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.statisticId = this.route.snapshot.paramMap.get('id')

    this.statisticSubscription$ = this.statisticGql
      .watch({ statisticId: this.statisticId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.statistic))
      .subscribe(statistic => {
        this.statistic = statistic

        if (this.statistic.accessControlList.length === 1) {
          this.permissionRows = this.statistic.accessControlList[0].accessControlEntries.map(
            value => ({
              id: value.accessControlGroup.id,
              acl: this.statistic.accessControlList[0].id,
              title: value.accessControlGroup.title,
              rights: value.rights,
              rowVersion: value.rowVersion
            })
          )
        } else {
          this.permissionRows = []
        }

        this.statisticReportTableData = statistic.statisticReports
      })
  }

  handleEditStatistic(statistic: Statistic.Statistic) {
    return this.router.navigate(['statistics/edit', statistic.id])
  }

  handleDeleteStatistic(statistic: Statistic.Statistic) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.statistic) {
          this.deleteStatisticGql
            .mutate(
              {
                data: {
                  id: statistic.id
                }
              },
              {}
            )
            .subscribe(value => this.router.navigate(['statistics']))
        }
      })
  }

  handleOpenAddGroupDialog() {
    this.allGroupsGql
      .watch({}, { fetchPolicy: 'no-cache' })
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
              groups: groups.filter(group => {
                if (
                  this.statistic.accessControlList &&
                  this.statistic.accessControlList[0]
                ) {
                  return !this.statistic.accessControlList[0].accessControlEntries
                    .map(value => value.accessControlGroup.id)
                    .includes(group.id)
                } else {
                  return group
                }
              })
            }
          }
        )

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result.id) {
            this.createStatisticAccessControlGql
              .mutate(
                {
                  data: {
                    accessControlGroupId: result.id,
                    statisticId: this.statisticId,
                    accessRights: AccessRights.Read
                  }
                },
                {
                  refetchQueries: [
                    {
                      query: this.statisticGql.document,
                      variables: {
                        statisticId: this.statisticId
                      }
                    }
                  ]
                }
              )
              .pipe(first())
              .subscribe(value => {})
          }
        })
      })
  }

  handleGroupPermissionChangeClicked(
    permissionChanged: PermissionChangedEvent
  ) {
    this.updateStatisticAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: permissionChanged.row.id,
            statisticId: this.statisticId,
            accessRights: permissionChanged.event.value.toUpperCase(),
            rowVersion: permissionChanged.row.rowVersion
          }
        },
        {}
      )
      .pipe(first())
      .subscribe(value => {})
  }

  handleGroupPermissionDeleteClicked($event) {
    this.deleteAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: $event.id,
            accessControlListId: $event.acl
          }
        },
        {
          refetchQueries: [
            {
              query: this.statisticGql.document,
              variables: {
                statisticId: this.statisticId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {})
  }

  handleGroupPermissionGroupClicked($event: any) {
    return this.router.navigate(['groups/', $event.id])
  }

  handleStatisticReportDeleteItemClicked($event) {
    this.deleteStatisticReportGql
      .mutate(
        {
          data: {
            id: $event.id
          }
        },
        {
          refetchQueries: [
            {
              query: this.statisticGql.document,
              variables: {
                statisticId: this.statisticId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {})
  }
}
