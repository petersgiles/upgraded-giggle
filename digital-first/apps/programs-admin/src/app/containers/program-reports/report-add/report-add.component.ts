import {Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {Location} from '@angular/common'
import {CreateReportGQL} from '../../../generated/graphql'
import {formConstants} from '../../../form-constants'

@Component({
  selector: 'digital-first-report-add',
  templateUrl: './report-add.component.html',
  styleUrls: ['./report-add.component.scss']
})
export class ReportAddComponent implements OnInit {

  addReportForm = this.formBuilder.group({
    reportName: [null, [Validators.required, Validators.maxLength(formConstants.nameMaxLength)]],
    notes: ['']
  })

  private programId: string

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private addReportGQL: CreateReportGQL) {
  }

  onSubmit() {
    this.addReportGQL.mutate({
      data: {
        programId: this.programId,
        name: this.addReportForm.value['reportName'],
        notes: this.addReportForm.value['notes']
      }
    }, {}).subscribe(() =>
      this.router.navigate(['programs', this.programId]))
  }

  cancel() {
    return this.location.back()
  }

  ngOnInit(): void {
    this.programId = this.route.snapshot.paramMap.get('id')
  }
}
