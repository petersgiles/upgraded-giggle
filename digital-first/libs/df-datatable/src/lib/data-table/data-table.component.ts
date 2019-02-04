import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DataTableConfig } from './data-table-model'

@Component({
  selector: 'digital-first-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  @Input()
  tableData: DataTableConfig

  @Input() tableRows: any[]

  @Input() hasDeleteItemButton = false

  @Output() onDeleteItem: EventEmitter<any> = new EventEmitter()

  @Output() onCellHeadingClicked: EventEmitter<any> = new EventEmitter()

  @Output() onCellClicked: EventEmitter<any> = new EventEmitter()

  @Output() onRowClicked: EventEmitter<any> = new EventEmitter()

  get rows(): any[] {
    return this.tableRows ? this.tableRows : this.tableData.rows
  }

  handleCellHeadingClicked(heading) {
    // tslint:disable-next-line:no-console
    console.log(heading)
    this.onCellHeadingClicked.emit({ ...heading })
  }

  handleCellClicked(row, cell) {
    // tslint:disable-next-line:no-console
    console.log(row, cell)
    this.onCellClicked.emit({ id: row.id, row, cell })
  }
}
