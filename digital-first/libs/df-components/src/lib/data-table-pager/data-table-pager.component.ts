import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

export interface PageEvent {
  length: number
  pageIndex: number
  pageSize: number
  previousPageIndex: number
}

@Component({
  selector: 'digital-first-data-table-pager',
  templateUrl: './data-table-pager.component.html',
  styleUrls: ['./data-table-pager.component.scss']
})
export class DataTablePagerComponent implements OnInit {
  @Input() disabled: boolean

  @Input() hidePageSize: boolean

  @Input() length: number

  @Input() pageIndex: number

  @Input() pageSize = 1

  @Input() pageSizeOptions: number[]

  @Input() showFirstLastButtons: boolean

  @Output() page: EventEmitter<PageEvent> = new EventEmitter()

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`
    }

    length = Math.max(length, 0)
    const startIndex = page * pageSize
    const endIndex = startIndex < length
    ? Math.min(startIndex + pageSize, length)
    : startIndex + pageSize
    return `${startIndex + 1} - ${endIndex} of ${length}`
  }

  firstPageLabel: string

  itemsPerPageLabel: string

  lastPageLabel: string

  nextPageLabel: string

  previousPageLabel: string

  constructor() {}

  ngOnInit() {}

  firstPage() {
    this.page.emit({
      pageIndex: 0,
      previousPageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    })
  }

  lastPage() {
    this.page.emit({
      pageIndex: this.length / this.pageSize,
      previousPageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    })
  }

  nextPage() {
    this.page.emit({
      pageIndex: this.pageIndex++,
      previousPageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    })
  }

  previousPage() {
    this.page.emit({
      pageIndex: this.pageIndex--,
      previousPageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    })
  }

  getNumberOfPages(): number {
    return 0
  }

  hasNextPage(): boolean {
    return true
  }

  hasPreviousPage(): boolean {
    return true
  }
}
