import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { ActivatedRoute, Router } from '@angular/router'
import {
  ARE_YOU_SURE_ACCEPT,
  DialogAreYouSureComponent
} from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { formConstants } from '../../form-constants'
import { Maybe, Statistic } from '../../generated/graphql'

@Component({
  selector: 'digital-first-statistic-reports',
  templateUrl: './statistic-reports.component.html',
  styleUrls: ['./statistic-reports.component.scss']
})
export class StatisticReportsComponent {
  @Input()
  statisticreportsTableData: Maybe<Maybe<Statistic.StatisticReports>[]>

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()

  expanded: true
  columns = [{ prop: 'name', name: 'Name' }, { prop: 'notes', name: 'Notes' }]

  defaultPageLength: number = formConstants.defaultPageLength

  constructor(
    public dialog: MdcDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  handleAddClicked($event) {
    return this.router.navigate(['reports/add'], { relativeTo: this.route })
  }

  handleTableDeleteClicked(statisticReport: Statistic.StatisticReports) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && statisticReport.id) {
          this.onDeleteClicked.emit(statisticReport)
        }
      })
  }

  handleReportNavigation(statisticReport: Statistic.StatisticReports) {
    return this.router.navigate(['reports/', statisticReport.id], {
      relativeTo: this.route
    })
  }
}
