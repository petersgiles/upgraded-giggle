import { Component, OnInit } from '@angular/core'
import { CommitmentsGetGQL } from '../../generated/graphql'
import { tap, map } from 'rxjs/operators';
@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit {
  commitmentsData$
  constructor(private commitmentsGet: CommitmentsGetGQL) {}

  ngOnInit() {
    this.commitmentsData$=  this.commitmentsGet
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        tap(result => console.log(result.data.commitments)),
        map(result =>{
              let commitments = [];
              result.data.commitments.forEach(c=>commitments.push({id:c.id,name:c.title}));
              return commitments;
        })
      )
  }
}
