import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { map } from 'rxjs/operators'
import {
  AllAgenciesGQL, AllAgenciesQuery,
  StatisticGQL, StatisticQuery,
  UpdateStatisticGQL
} from '../../../generated/graphql'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-statistic-edit',
  templateUrl: './statistic-edit.component.html',
  styleUrls: ['./statistic-edit.component.scss']
})
export class StatisticEditComponent implements OnInit, OnDestroy {
  statisticSubscription$: Subscription

  rowVersion: string

  editStatisticForm = this.formBuilder.group({
    agencyId: [undefined, Validators.required],
    statisticName: [
      null,
      [Validators.required, Validators.maxLength(formConstants.nameMaxLength)]
    ],
    externalId: [''],
    notes: ['']
  })

  statisticId: string

  statistics$: Observable<StatisticQuery['statistic']>
  agencies$: Observable<AllAgenciesQuery['agencies']>

  constructor(
    private formBuilder: FormBuilder,
    private allAgencies: AllAgenciesGQL,
    private statisticGQL: StatisticGQL,
    private router: Router,
    private route: ActivatedRoute,
    private updateStatisticGQL: UpdateStatisticGQL
  ) {}

  ngOnInit() {
    this.agencies$ = this.allAgencies
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(map(result => result.data.agencies))

    this.statisticId = this.route.snapshot.paramMap.get('id')

    this.statistics$ = this.statisticGQL
      .fetch({ statisticId: this.statisticId }, { fetchPolicy: 'network-only' })
      .pipe(map(value => value.data.statistic))

    this.statisticSubscription$ = this.statistics$.subscribe(value => {
      this.rowVersion = value.rowVersion
      this.editStatisticForm.patchValue({
        statisticName: value.name,
        externalId: value.externalId,
        agencyId: value.agency.id
      })
    })
  }

  onSubmit() {
    this.updateStatisticGQL
      .mutate(
        {
          data: {
            agencyId: this.editStatisticForm.value['agencyId'],
            name: this.editStatisticForm.value['statisticName'],
            externalId: this.editStatisticForm.value['externalId'],
            rowVersion: this.rowVersion,
            id: this.statisticId
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['statistics', data.updateStatistic.id])
      )
  }

  cancel() {
    return this.router.navigate(['statistics', this.statisticId])
  }

  ngOnDestroy(): void {
    this.statisticSubscription$.unsubscribe()
  }
}
