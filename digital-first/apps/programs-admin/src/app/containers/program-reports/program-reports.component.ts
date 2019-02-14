import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import {
  ARE_YOU_SURE_ACCEPT,
  DialogAreYouSureComponent
} from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'digital-first-program-reports',
  templateUrl: './program-reports.component.html',
  styleUrls: ['./program-reports.component.scss']
})
export class ProgramReportsComponent implements OnInit {
  @Input() artifactId: string
  @Input() tableData: any

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()
  @Output() onAddItemClicked: EventEmitter<any> = new EventEmitter()
  @Output() onCellClicked: EventEmitter<any> = new EventEmitter()

  expanded: true

  constructor(
    public dialog: MdcDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  handleChangeExpanded(expanded) {}

  handleAddClicked($event) {
    return this.router.navigate(['reports/add'], { relativeTo: this.route })
  }

  handleTableDeleteClicked($event) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.artifactId) {
          this.onDeleteClicked.emit($event)
        }
      })
  }
}
