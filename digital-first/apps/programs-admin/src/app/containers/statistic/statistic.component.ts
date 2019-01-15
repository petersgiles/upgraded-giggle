import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {AccessRights, DeleteStatisticGQL, Program, Statistic, StatisticGQL} from '../../generated/graphql'
import {MdcDialog} from '@angular-mdc/web'
import {first, map} from 'rxjs/operators'
import {Subscription} from 'rxjs'
import {ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent} from '@digital-first/df-dialogs'
import {DataTableConfig} from '@digital-first/df-components'

@Component({
  selector: 'digital-first-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  statisticId: string
  statisticSubscription$: Subscription
  permissionTableData: any
  statisticReportTableData: any
  statistic: Statistic.Statistics

  constructor(private route: ActivatedRoute,
              private statisticGQL: StatisticGQL,
              private deleteStatisticGQL: DeleteStatisticGQL,
              private router: Router,
              public dialog: MdcDialog) {
  }

  ngOnInit() {

    this.statisticId = this.route.snapshot.paramMap.get('id')

    this.statisticSubscription$ = this.statisticGQL
      .watch({statisticId: this.statisticId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.statistics[0]))
      .subscribe(statistic => {
        this.statistic = statistic

        this.permissionTableData = this.createStatisticPermissionGroupTableData(
          statistic
        )

        this.statisticReportTableData = this.createStatisticReportTableData(
          statistic
        )
      })
  }

  private createStatisticPermissionGroupTableData(statistic: Statistic.Statistics): DataTableConfig {
    const groups = {}
    statistic.accessControlList.forEach(acl => {
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

  handleEditStatistic(statistic: Statistic.Statistics) {
    return this.router.navigate(['statistics/edit', statistic.id])
  }

  handleDeleteStatistic(statistic: Statistic.Statistics) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.statistic) {
          this.deleteStatisticGQL
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

  handleOpenAddGroupDialog($event: any) {
    alert('TODO')
  }

  handleGroupPermissionChangeClicked($event: any) {
    alert('TODO')
  }

  handleGroupPermissionDeleteClicked($event: any) {
    alert('TODO')
  }

  handleGroupPermissionGroupClicked($event: any) {
    alert('TODO')
  }

  handleReportNavigation($event) {
    return this.router.navigate(['reports/', $event.id], {relativeTo: this.route})
  }

  handleStatisticReportDeleteItemClicked($event) {

  }

  private createStatisticReportTableData(statistic: Statistic.Statistics) {
    const reports = statistic.statisticReports.map(report => ({
      id: report.id,
      name: report.name,
      notes: report.notes
    }))

    const rows = (reports || []).map(r => ({
      id: r.id,
      data: r,
      cells: [
        {
          value: `${r.name}`
        },
        {
          value: r.notes
        }
      ]
    }))

    return {
      title: 'reports',
      hasDeleteItemButton: true,
      headings: [{caption: 'Name'}, {caption: 'Notes'}],
      rows: rows
    }
  }

}
