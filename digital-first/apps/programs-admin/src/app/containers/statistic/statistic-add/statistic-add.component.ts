import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import {
  AllAgencies,
  AllAgenciesGQL,
  CreateStatisticGQL
} from '../../../generated/graphql'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-statistic-add',
  templateUrl: './statistic-add.component.html',
  styleUrls: ['./statistic-add.component.scss']
})
export class StatisticAddComponent implements OnInit {
  agenciesSubscription$: Subscription
  agencies: AllAgencies.Agencies[]

  addStatisticForm = this.formBuilder.group({
    agencyId: [undefined, Validators.required],
    statisticName: [
      null,
      [Validators.required, Validators.maxLength(formConstants.nameMaxLength)]
    ],
    externalId: [null],
    notes: ['']
  })

  constructor(
    private formBuilder: FormBuilder,
    private allAgencies: AllAgenciesGQL,
    private router: Router,
    private createStatisticGQL: CreateStatisticGQL
  ) {}

  ngOnInit() {
    this.agenciesSubscription$ = this.allAgencies
      .watch({}, { fetchPolicy: 'cache-first' })
      .valueChanges.pipe(map(result => result.data.agencies))
      .subscribe(value => {
        this.agencies = value
      })
  }

  onSubmit() {
    this.createStatisticGQL
      .mutate(
        {
          data: {
            agencyId: this.addStatisticForm.value['agencyId'],
            name: this.addStatisticForm.value['statisticName'],
            externalId: this.addStatisticForm.value['externalId']
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['statistics', data.createStatistic.id])
      )
  }

  cancel() {
    return this.router.navigate(['statistics'])
  }
}
