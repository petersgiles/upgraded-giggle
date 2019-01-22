import {Component, OnDestroy, OnInit} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {
  AllAgencies, AllAgenciesGQL, Statistic, StatisticGQL, UpdateStatisticGQL
} from '../../../generated/graphql'
import {FormBuilder, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {map} from 'rxjs/operators'

@Component({
  selector: 'digital-first-statistic-edit',
  templateUrl: './statistic-edit.component.html',
  styleUrls: ['./statistic-edit.component.scss']
})
export class StatisticEditComponent implements OnInit, OnDestroy {

  agenciesSubscription$: Subscription
  statisticSubscription$: Subscription
  agencies: AllAgencies.Agencies[]

  rowVersion: string

  editStatisticForm = this.formBuilder.group({
    agencyId: [undefined, Validators.required],
    statisticName: [null, Validators.required],
    externalId: [null],
    notes: ['']
  })

  statisticId: string
  private statistics$: Observable<Statistic.Statistics | null>

  constructor(private formBuilder: FormBuilder,
              private allAgencies: AllAgenciesGQL,
              private statisticGQL: StatisticGQL,
              private router: Router,
              private route: ActivatedRoute,
              private updateStatisticGQL: UpdateStatisticGQL) {
  }

  ngOnInit() {
    this.agenciesSubscription$ = this.allAgencies.watch(
      {},
      {fetchPolicy: 'cache-first'}).valueChanges
      .pipe(map(result => result.data.agencies))
      .subscribe(value => {
          this.agencies = value
        }
      )

    this.statisticId = this.route.snapshot.paramMap.get('id')

    this.statistics$ = this.statisticGQL.watch(
      {statisticId: this.statisticId},
      {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.statistics[0]))

    this.statisticSubscription$ = this.statistics$.subscribe(
      value => {
        this.rowVersion = value.rowVersion
        this.editStatisticForm.patchValue({
          statisticName: value.name,
          externalId: value.externalId,
          agencyId: value.agency.id
        })

        console.log('statistic', value)
      })
  }

  onSubmit() {

    this.updateStatisticGQL.mutate({
      data: {
        agencyId: this.editStatisticForm.value['agencyId'],
        name: this.editStatisticForm.value['statisticName'],
        externalId: this.editStatisticForm.value['externalId'],
        rowVersion: this.rowVersion,
        id: this.statisticId
      }
    }, {}).subscribe(({data}) =>
      this.router.navigate(['statistics', data.updateStatistic.id]))
  }

  cancel() {
    return this.router.navigate(['statistics', this.statisticId])
  }

  ngOnDestroy(): void {
    this.agenciesSubscription$.unsubscribe()
    this.statisticSubscription$.unsubscribe()
  }
}
