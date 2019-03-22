import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { ActivatedRoute, Router } from '@angular/router'
import { first } from 'rxjs/operators'
import { formConstants } from '../../form-constants'
import {StatisticQuery} from '../../generated/graphql'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'

type StatisticReports = StatisticQuery['statistic']['statisticReports']

type StatisticReport = StatisticReports[0]

@Component({
  selector: 'digital-first-statistic-reports',
  templateUrl: './statistic-reports.component.html',
  styleUrls: ['./statistic-reports.component.scss']
})
export class StatisticReportsComponent implements OnInit {
  @Input()
  statisticreportsTableData: StatisticReports

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()

  expanded: true
  columns = [{ prop: 'name', name: 'Name' }, { prop: 'notes', name: 'Notes' }]

  defaultPageLength: number = formConstants.defaultPageLength

  emptyTableMessage: { emptyMessage: string; totalMessage: string }

  constructor(
    public dialog: MdcDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  handleAddClicked($event) {
    return this.router.navigate(['reports/add'], { relativeTo: this.route })
  }

  handleTableDeleteClicked(statisticReport: StatisticReport) {
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

  handleReportNavigation(statisticReport: StatisticReport) {
    return this.router.navigate(['reports/', statisticReport.id], {
      relativeTo: this.route
    })
  }

  ngOnInit(): void {
    this.emptyTableMessage = {
      emptyMessage: 'No reports have been added to this statistic',
      totalMessage: 'total'
    }
  }
}
