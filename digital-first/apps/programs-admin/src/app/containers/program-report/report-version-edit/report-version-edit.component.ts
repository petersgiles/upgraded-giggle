import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import {
  ReportVersionEditGQL,
  UpdateReportVersionGQL
} from '../../../generated/graphql'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { DateTimeFormat } from '../../../date-time-format'
@Component({
  selector: 'digital-first-report-version-edit',
  templateUrl: './report-version-edit.component.html',
  styleUrls: ['./report-version-edit.component.scss']
})
export class ReportVersionEditComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private reportVersionGQL: ReportVersionEditGQL,
    private updateReportVersionGQL: UpdateReportVersionGQL,
    private dateTimeFormat: DateTimeFormat
  ) {}
  reportVersionId: string
  reportId: string
  programId: string
  callingPage: string
  reportVersionSubscription$: Subscription
  rowVersion: string
  reportVersionForm = this.formBuilder.group({
    dataDate: ['', Validators.required],
    notes: ['']
  })

  ngOnInit() {
    this.reportVersionId = this.route.snapshot.paramMap.get('reportVersionId')
    this.reportId = this.route.snapshot.paramMap.get('reportId')
    this.programId = this.route.snapshot.paramMap.get('programId')
    this.callingPage = `programs/${this.programId}/reports/${this.reportId}`
    this.reportVersionSubscription$ = this.reportVersionGQL
      .watch({ id: this.reportVersionId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.reportVersion))
      .subscribe(reportVersion => {
        this.reportVersionForm.patchValue({
          dataDate: this.dateTimeFormat.formatDateForTextField(
            reportVersion.dataDate
          ),
          notes: reportVersion.notes
        })
        this.rowVersion = reportVersion.rowVersion
      })
  }

  ngOnDestroy(): void {
    this.reportVersionSubscription$.unsubscribe()
  }

  cancel() {
    return this.router.navigate([this.callingPage])
  }

  onSubmit() {
    this.updateReportVersionGQL
      .mutate(
        {
          data: {
            id: this.reportVersionId,
            dataDate: this.reportVersionForm.value['dataDate'],
            notes: this.reportVersionForm.value['notes'],
            rowVersion: this.rowVersion
          }
        },
        {}
      )
      .subscribe(() => this.router.navigate([this.callingPage]))
  }
}
