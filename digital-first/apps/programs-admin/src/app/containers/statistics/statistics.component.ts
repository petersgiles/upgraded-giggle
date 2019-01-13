import {Component, OnInit} from '@angular/core'
import {AllStatistics, AllStatisticsGQL} from '../../generated/graphql'
import {Router} from '@angular/router'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'

@Component({
  selector: 'digital-first-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  private statistics$: Observable<(AllStatistics.Statistics | null)[]>

  constructor(private allStatisticsGQL: AllStatisticsGQL,
              private router: Router) {
  }

  ngOnInit() {
    this.statistics$ = this.allStatisticsGQL.watch({},
      {fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map(value => value.data.statistics))
  }

  add() {
    return this.router.navigate(['statistics', 'add'])
  }
}
