import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import {
  StatisticReportVersionGQL,
  UpdateStatisticReportVersionGQL
} from '../../../generated/graphql'
import { Subscription } from 'rxjs'
import { first, map } from 'rxjs/operators'

@Component({
  selector: 'digital-first-edit-statistic-report-version',
  templateUrl: './edit-statistic-report-version.component.html',
  styleUrls: ['./edit-statistic-report-version.component.scss']
})
export class EditStatisticReportVersionComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private statisticReportVersionGQL: StatisticReportVersionGQL,
    private updateStatisticReportVersionGQL: UpdateStatisticReportVersionGQL
  ) {}
  reportVersionId: string
  reportId: string
  statisticId: string
  statisticReportVersionSubscription$: Subscription
  rowVersion: string
  statisticReportVersionForm = this.formBuilder.group({
    dataDate: ['', Validators.required],
    notes: ['']
  })

  ngOnInit() {
    this.reportVersionId = this.route.snapshot.paramMap.get('reportVersionId')
    this.reportId = this.route.snapshot.paramMap.get('reportId')
    this.statisticId = this.route.snapshot.paramMap.get('statisticId')

    this.statisticReportVersionSubscription$ = this.statisticReportVersionGQL
      .watch({ reportId: this.reportId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.statisticReport.version))
      .subscribe(reportVersion => {
        this.statisticReportVersionForm.patchValue({
          dataDate: reportVersion.dataDate,
          notes: reportVersion.notes
        })
        this.rowVersion = reportVersion.rowVersion
      })
  }

  ngOnDestroy(): void {
    this.statisticReportVersionSubscription$.unsubscribe()
  }

  cancel() {
    return this.router.navigate([
      `statistics/${this.statisticId}/reports/${this.reportId}`
    ])
  }

  onSubmit() {
    this.updateStatisticReportVersionGQL
      .mutate(
        {
          data: {
            id: this.reportVersionId,
            dataDate: this.statisticReportVersionForm.value['dataDate'],
            notes: this.statisticReportVersionForm.value['notes'],
            rowVersion: this.rowVersion
          }
        },
        {}
      )
      .subscribe(() =>
        this.router.navigate([
          `statistics/${this.statisticId}/reports/${this.reportId}`
        ])
      )
  }
}
