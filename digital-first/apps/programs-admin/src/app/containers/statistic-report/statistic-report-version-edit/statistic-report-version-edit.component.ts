import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import {
  StatisticReportVersionEditGQL,
  UpdateStatisticReportVersionGQL
} from '../../../generated/graphql'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { DateTimeFormat } from '../../../date-time-format'
@Component({
  selector: 'digital-first-statistic-report-version-edit',
  templateUrl: './statistic-report-version-edit.component.html',
  styleUrls: ['./statistic-report-version-edit.component.scss']
})
export class StatisticReportVersionEditComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private statisticReportVersionGQL: StatisticReportVersionEditGQL,
    private updateStatisticReportVersionGQL: UpdateStatisticReportVersionGQL,
    private dateTimeFormat: DateTimeFormat
  ) {}
  reportVersionId: string
  reportId: string
  statisticId: string
  callingPage: string
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
    this.callingPage = `statistics/${this.statisticId}/reports/${this.reportId}`
    this.statisticReportVersionSubscription$ = this.statisticReportVersionGQL
      .watch({ id: this.reportVersionId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.statisticReportVersion))
      .subscribe(reportVersion => {
        this.statisticReportVersionForm.patchValue({
          dataDate: this.dateTimeFormat.formatDate(reportVersion.dataDate),
          notes: reportVersion.notes
        })
        this.rowVersion = reportVersion.rowVersion
      })
  }

  ngOnDestroy(): void {
    this.statisticReportVersionSubscription$.unsubscribe()
  }

  cancel() {
    return this.router.navigate([this.callingPage])
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
      .subscribe(() => this.router.navigate([this.callingPage]))
  }
}
