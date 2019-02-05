import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {Subscription} from 'rxjs'
import {Report, ReportGQL, UpdateReportGQL, UpdateStatisticReportGQL} from '../../../generated/graphql'
import {map} from 'rxjs/operators'

@Component({
  selector: 'digital-first-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss']
})
export class ReportEditComponent implements OnInit, OnDestroy {

  reportSubscription$: Subscription
  private reportId: string

  editReportForm = this.formBuilder.group({
    reportName: [null, [Validators.required, Validators.maxLength(450)]],
    notes: ['']
  })
  private report: Report.Reports

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private reportGQL: ReportGQL,
              private updateReportGQL: UpdateReportGQL) {
                }

  ngOnInit() {

    this.reportId = this.route.snapshot.paramMap.get('id')

    this.reportSubscription$ = this.reportGQL.watch({reportId: this.reportId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.reports[0]))
      .subscribe(report => {
        this.report = report
        this.editReportForm.patchValue({
          reportName: report.name,
          notes: report.notes
        })
      })

  }

  onSubmit() {
    this.updateReportGQL.mutate({
      data: {
        name: this.editReportForm.value['reportName'],
        notes: this.editReportForm.value['notes'],
        rowVersion: this.report.rowVersion,
        id: this.report.id,
        programId: this.report.programId
      }
    }, {}).subscribe(({data}) =>
      this.router.navigate(['../../', this.reportId], {relativeTo: this.route}))
  }

  ngOnDestroy(): void {
    this.reportSubscription$.unsubscribe()
  }

  cancel() {
    return this.router.navigate(['../../', this.reportId], {relativeTo: this.route})
  }
}
