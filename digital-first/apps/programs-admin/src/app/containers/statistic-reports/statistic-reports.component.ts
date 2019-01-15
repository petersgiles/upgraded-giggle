import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {MdcDialog} from '@angular-mdc/web'
import {ActivatedRoute, Router} from '@angular/router'
import {ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent} from '@digital-first/df-dialogs'
import {first} from 'rxjs/operators'

@Component({
  selector: 'digital-first-statistic-reports',
  templateUrl: './statistic-reports.component.html',
  styleUrls: ['./statistic-reports.component.scss']
})
export class StatisticReportsComponent implements OnInit {

  @Input() artifactId: string
  @Input() tableData: any

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()
  @Output() onAddItemClicked: EventEmitter<any> = new EventEmitter()
  @Output() onCellClicked: EventEmitter<any> = new EventEmitter()

  expanded: true

  constructor(public dialog: MdcDialog,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  handleChangeExpanded(expanded) {
  }

  handleAddClicked($event) {
    return this.router.navigate(['reports/add'], {relativeTo: this.route})
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
