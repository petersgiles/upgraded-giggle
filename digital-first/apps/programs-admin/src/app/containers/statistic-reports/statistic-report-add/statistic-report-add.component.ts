import {Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {Location} from '@angular/common'
import {CreateStatisticReportGQL} from '../../../generated/graphql'

@Component({
  selector: 'digital-first-statistic-report-add',
  templateUrl: './statistic-report-add.component.html',
  styleUrls: ['./statistic-report-add.component.scss']
})
export class StatisticReportAddComponent implements OnInit {

  addStatisticReportForm = this.formBuilder.group({
    reportName: [null, Validators.required],
    notes: ['']
  })

  private statisticId: string

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private createStatisticReportGQL: CreateStatisticReportGQL) {
  }

  cancel() {
    return this.location.back()
  }

  ngOnInit(): void {
    this.statisticId = this.route.snapshot.paramMap.get('id')
  }

  onSubmit() {
    this.createStatisticReportGQL.mutate({
      data: {
        statisticId: this.statisticId,
        name: this.addStatisticReportForm.value['reportName'],
        notes: this.addStatisticReportForm.value['notes']
      }
    }, {}).subscribe(() =>
      this.router.navigate(['statistics', this.statisticId]), (error) => {
      console.log('there was an error sending the query', error)
    })
  }
}
