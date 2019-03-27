import { Component, OnInit } from '@angular/core'
import { PlannerCommitmentsGQL } from '../../generated/graphql'
import { tap, map } from 'rxjs/operators'
@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit {
  commitmentsData$
  constructor(private commitmentsGet: PlannerCommitmentsGQL) {}

  ngOnInit() {
    this.commitmentsData$ = this.commitmentsGet
      .watch({ input: {} })
      .valueChanges.pipe(
        // tslint:disable-next-line:no-console
        tap(result => console.log(result.data.commitments)),
        map(result => {
          const commitments = []
          result.data.commitments.forEach(c =>
            commitments.push({ id: c.id, name: c.title })
          )
          return commitments
        })
      )
  }
}
