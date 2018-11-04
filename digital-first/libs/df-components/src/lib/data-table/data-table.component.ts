import { Component, OnInit, Input } from '@angular/core'
import { DataTableConfig } from './data-table-model'

@Component({
  selector: 'digital-first-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  tableData: DataTableConfig

}
