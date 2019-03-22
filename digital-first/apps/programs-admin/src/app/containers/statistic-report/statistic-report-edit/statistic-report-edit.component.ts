import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms'
import { map } from 'rxjs/operators'
import {
  StatisticReportEditGQL, StatisticReportEditQuery,
  UpdateStatisticReportGQL
} from '../../../generated/graphql'
import { Subscription } from 'rxjs'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-statistic-report-edit',
  templateUrl: './statistic-report-edit.component.html',
  styleUrls: ['./statistic-report-edit.component.scss']
})
export class StatisticReportEditComponent implements OnInit, OnDestroy {
  editStatisticReportForm = this.formBuilder.group({
    reportName: [
      null,
      [Validators.required, Validators.maxLength(formConstants.nameMaxLength)]
    ],
    notes: ['']
  })

  report: StatisticReportEditQuery['statisticReport']
  reportSubscription$: Subscription
  private statisticReportId: string

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private statisticReportGql: StatisticReportEditGQL,
    private updateStatisticReportGQL: UpdateStatisticReportGQL
  ) {}

  ngOnInit() {
    this.statisticReportId = this.route.snapshot.paramMap.get('id')

    this.reportSubscription$ = this.statisticReportGql
      .watch(
        { reportId: this.statisticReportId },
        { fetchPolicy: 'network-only' }
      )
      .valueChanges.pipe(map(value => value.data.statisticReport))
      .subscribe(report => {
        this.report = report
        this.editStatisticReportForm.patchValue({
          reportName: report.name,
          notes: report.notes
        })
      })
  }

  onSubmit() {
    this.updateStatisticReportGQL
      .mutate(
        {
          data: {
            name: this.editStatisticReportForm.value['reportName'],
            notes: this.editStatisticReportForm.value['notes'],
            rowVersion: this.report.rowVersion,
            id: this.report.id,
            statisticId: this.report.statisticId
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['../../', this.statisticReportId], {
          relativeTo: this.route
        })
      )
  }

  cancel() {
    return this.router.navigate(['../../', this.statisticReportId], {
      relativeTo: this.route
    })
  }

  ngOnDestroy(): void {
    this.reportSubscription$.unsubscribe()
  }
}
