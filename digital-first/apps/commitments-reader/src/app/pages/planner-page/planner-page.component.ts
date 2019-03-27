import { Component, OnInit } from '@angular/core'
import { PlannerCommitmentsGQL } from '../../generated/graphql'
import { tap, map } from 'rxjs/operators'
import { CommitmentRefinerService } from '../../services/commitment-refiner'
@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit {
  commitmentsData$
  constructor(private dataService: CommitmentRefinerService) {}

  ngOnInit() {
    this.commitmentsData$ = this.dataService.commitments$.pipe(
      map(result => {
        const commitments = []
        result.forEach(c => commitments.push({ id: c.id, name: c.title }))
        return commitments
      })
    )
    this.dataService.getPlannerPage()
  }
}
