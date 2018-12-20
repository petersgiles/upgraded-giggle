import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdcDialog } from '@angular-mdc/web';
import {
  ARE_YOU_SURE_ACCEPT,
  DialogAreYouSureComponent
} from '@digital-first/df-dialogs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'digital-first-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  @Input() artifactId: string;
  @Input() tableData: any;

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter();

  @Output() onPermissionClicked: EventEmitter<any> = new EventEmitter();

  @Output() onGroupClicked: EventEmitter<any> = new EventEmitter();

  @Output() onAddGroup: EventEmitter<any> = new EventEmitter();

  expanded: true;

  constructor(public dialog: MdcDialog) {}

  ngOnInit() {}

  handleChangeExpanded(expanded) {}

  handleTableDeleteClicked($event) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.artifactId) {
          this.onDeleteClicked.emit($event);
        }
      });
  }

  handleCellClicked($event) {
    switch ($event.cell.id) {
      case 'PERMISSIONCELL':
        this.onPermissionClicked.emit($event);
        break;
      default:
        this.onGroupClicked.emit($event);
        break;
    }
  }
}
