import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'
import { CreateStatisticReportGQL } from '../../../generated/graphql'
import { formConstants } from '../../../form-constants'
import { trimStringOrReturnNull } from '../../../core/graphqlhelper'

@Component({
  selector: 'digital-first-statistic-report-add',
  templateUrl: './statistic-report-add.component.html',
  styleUrls: ['./statistic-report-add.component.scss']
})
export class StatisticReportAddComponent implements OnInit {
  addStatisticReportForm = this.formBuilder.group({
    reportName: [
      null,
      [Validators.required, Validators.maxLength(formConstants.nameMaxLength)]
    ],
    notes: ['']
  })

  private statisticId: string

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private createStatisticReportGQL: CreateStatisticReportGQL
  ) {}

  cancel() {
    return this.location.back()
  }

  ngOnInit(): void {
    this.statisticId = this.route.snapshot.paramMap.get('id')
  }

  onSubmit() {
    this.createStatisticReportGQL
      .mutate(
        {
          data: {
            statisticId: this.statisticId,
            name: this.addStatisticReportForm.value['reportName'],
            notes: trimStringOrReturnNull(
              this.addStatisticReportForm.value['notes']
            )
          }
        },
        {}
      )
      .subscribe(() => this.router.navigate(['statistics', this.statisticId]))
  }
}
