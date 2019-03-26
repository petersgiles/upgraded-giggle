import { Component, OnInit } from '@angular/core'
import { tap, map } from 'rxjs/operators'
import {
  CommitmentsSearchGQL,
  CommitmentPartsFragment
} from '../../generated/graphql'
import { Observable } from 'rxjs'
import { CommitmentRefinerService } from '../../services/commitment-refiner.service'

@Component({
  selector: 'digital-first-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {
  public commitmentsTableData$: Observable<CommitmentPartsFragment[]>
  public columns: { prop: string; name: string }[]
  public count: number
  
  constructor(private dataService:  CommitmentRefinerService) {

  }

  ngOnInit() {
    this.commitmentsTableData$ = this.dataService.commitments$
  }

  handleCommitmentsRowClicked($event) {}
}
