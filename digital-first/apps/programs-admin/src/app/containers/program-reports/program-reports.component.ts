import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { first } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'
import { formConstants } from '../../form-constants'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'
import {ProgramQuery} from '../../generated/graphql'

type Reports = ProgramQuery['program']['reports']
type Report = Reports[0]

@Component({
  selector: 'digital-first-program-reports',
  templateUrl: './program-reports.component.html',
  styleUrls: ['./program-reports.component.scss']
})
export class ProgramReportsComponent implements OnInit {
  @Input() reportsTableData: Reports

  @Output() onDeleteClicked: EventEmitter<Report> = new EventEmitter()

  emptyTableMessage: { emptyMessage: string; totalMessage: string }

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

  handleReportNavigation(report: Report) {
    return this.router.navigate(['reports/', report.id], {
      relativeTo: this.route
    })
  }

  handleTableDeleteClicked(reportToDelete: Report) {
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

  ngOnInit(): void {
    this.emptyTableMessage = {
      emptyMessage: 'No reports have been added to this program',
      totalMessage: 'total'
    }
  }
}
