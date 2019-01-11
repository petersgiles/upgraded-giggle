import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Statistic, StatisticGQL} from '../../generated/graphql'
import {MdcDialog} from '@angular-mdc/web'
import {map} from 'rxjs/operators'
import {Subscription} from 'rxjs'

@Component({
  selector: 'digital-first-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  statisticId: string
  statisticSubscription$: Subscription
  private statistic: Statistic.Statistics

  constructor(private route: ActivatedRoute,
              private statisticGQL: StatisticGQL,
              private router: Router,
              public dialog: MdcDialog) {
  }

  ngOnInit() {

    this.statisticId = this.route.snapshot.paramMap.get('id')

    this.statisticSubscription$ = this.statisticGQL
      .watch({statisticId: this.statisticId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.statistics[0]))
      .subscribe(statistic => {
        this.statistic = statistic
      })
  }

  handleEditStatistic(statistic: Statistic.Statistics) {
    return this.router.navigate(['statistics/edit', statistic.id])
  }

  handleDeleteStatistic(statistic: Statistic.Statistics) {
    alert('TODO: handle delete statistic')
  }
}
