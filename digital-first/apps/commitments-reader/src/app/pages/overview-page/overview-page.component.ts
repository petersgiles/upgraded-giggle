import { Component, OnInit } from '@angular/core'
import {
  CommitmentPartsFragment
} from '../../generated/graphql'
import { Observable } from 'rxjs'
import { CommitmentRefinerService, DataTableColumn } from '../../services/commitment-refiner'

@Component({
  selector: 'digital-first-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {
  public commitmentsTableData$: Observable<CommitmentPartsFragment[]>
  public columns$: Observable<DataTableColumn[]>
  public count: number

  constructor(private dataService:  CommitmentRefinerService) {

  }

  ngOnInit() {
    this.columns$ = this.dataService.columns$
    this.commitmentsTableData$ = this.dataService.commitments$
  }

  handleCommitmentsRowClicked($event) {}
}
