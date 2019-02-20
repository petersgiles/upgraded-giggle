import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import {
  ARE_YOU_SURE_ACCEPT,
  DialogAreYouSureComponent
} from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'
import { Maybe, Program, Report } from '../../generated/graphql'
import { formConstants } from '../../form-constants'
import Reports = Report.Reports

@Component({
  selector: 'digital-first-program-reports',
  templateUrl: './program-reports.component.html',
  styleUrls: ['./program-reports.component.scss']
})
export class ProgramReportsComponent {
  @Input() reportsTableData: Maybe<Maybe<Program.Reports>[]>

  @Output() onDeleteClicked: EventEmitter<Reports> = new EventEmitter()

  expanded: true

  columns = [
    { prop: 'name', name: 'Report Name' },
    { prop: 'notes', name: 'Notes' }
  ]

  defaultPageLength: number = formConstants.defaultPageLength

  constructor(
    public dialog: MdcDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  handleAddClicked($event) {
    return this.router.navigate(['reports/add'], { relativeTo: this.route })
  }

  handleReportNavigation(report: Reports) {
    return this.router.navigate(['reports/', report.id], {
      relativeTo: this.route
    })
  }

  handleTableDeleteClicked(reportToDelete: Reports) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && reportToDelete.id) {
          this.onDeleteClicked.emit(reportToDelete)
        }
      })
  }
}
