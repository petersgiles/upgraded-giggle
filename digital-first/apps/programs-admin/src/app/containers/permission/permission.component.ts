import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild
} from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import {
  ARE_YOU_SURE_ACCEPT,
  DialogAreYouSureComponent
} from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { formConstants } from '../../form-constants'

@Component({
  selector: 'digital-first-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  defaultPageLength: number = formConstants.defaultPageLength

  @Input() artifactId: string

  @Input() noDataMessage: string

  @Input() tableData: any

  @Input() rows: any

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()

  @Output() onPermissionClicked: EventEmitter<any> = new EventEmitter()

  @Output() onGroupClicked: EventEmitter<any> = new EventEmitter()

  @Output() onAddGroup: EventEmitter<any> = new EventEmitter()

  @ViewChild('permissionsTemplate') permissionsTemplate: TemplateRef<any>

  emptyTableMessage: { emptyMessage: string }

  constructor(public dialog: MdcDialog) {}

  columns = []

  groups = []

  ngOnInit() {
    this.columns = [
      { prop: 'title', name: 'Name' },
      {
        name: 'Permissions',
        cellTemplate: this.permissionsTemplate,
        prop: 'rights'
      }
    ]

    this.emptyTableMessage = { emptyMessage: this.noDataMessage }
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

  handlePermissionChanged($event: any, row: any) {
    this.onPermissionClicked.emit({ event: $event, row: row })
  }

  handleReportNavigation($event: any) {
    this.onGroupClicked.emit($event)
  }
}
