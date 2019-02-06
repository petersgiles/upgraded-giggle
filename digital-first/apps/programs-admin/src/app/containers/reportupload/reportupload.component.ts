import { map } from 'rxjs/operators'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import {
  AllProgramReportsGQL,
  AllProgramReports
} from '../../generated/graphql'
import { UploadElectorateReportSpreadsheet } from '@dsuite/programs-manager-messages'
import { PassthroughService } from '../../services/passthrough.service'
import { MdcSnackbar } from '@angular-mdc/web'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'

@Component({
  selector: 'digital-first-reportupload',
  templateUrl: './reportupload.component.html',
  styleUrls: ['./reportupload.component.scss']
})
export class ReportuploadComponent implements OnInit, OnDestroy {
  fileToUpload: File
  programs: AllProgramReports.Programs[]
  reports: AllProgramReports.Reports[]
  reportsSubscription$: Subscription

  reportForm = this.formBuilder.group({
    programId: [undefined, Validators.required],
    reportId: [undefined, Validators.required],
    notes: [''],
    dataDate: ['', Validators.required],
    file: [null, Validators.required]
  })

  constructor(
    private allProgramReports: AllProgramReportsGQL,
    private passthrough: PassthroughService,
    private formBuilder: FormBuilder,
    private snackbar: MdcSnackbar
  ) {}

  get diagnostic() {
    return `status: ${JSON.stringify(
      this.reportForm.status
    )},  value: ${JSON.stringify(this.reportForm.value)}`
  }

  onSelectionChange(event: { index: any; value: any }) {
    if (event.index > -1) {
      if (event.index === 0) {
        this.reports = null
      } else {
        this.reports = this.programs.filter(
          value => value.id === event.value
        )[0].reports
      }
      this.reportForm.patchValue({ reportId: undefined })
    }
  }

  ngOnInit() {
    this.reportsSubscription$ = this.allProgramReports
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(result => result.data.programs))
      .subscribe(value => {
        this.programs = value
      })
  }

  fileChange(event) {
    const fileList: FileList = event.target.files

    if (fileList.length === 1) {
      this.fileToUpload = fileList[0]
      const reader = new FileReader()

      if (event.target.files && event.target.files.length) {
        reader.readAsDataURL(this.fileToUpload)

        reader.onload = () => {
          // TODO: swap commented out code when attachment library is patched to handle 'default' correctly
          this.reportForm.patchValue({ file: this.fileToUpload })
          // this.reportForm.patchValue({ file: reader.result })
        }
      }
    }
  }

  onSubmit() {
    const formData = new FormData()

    const message = new UploadElectorateReportSpreadsheet()

    message.reportId = this.reportForm.value['reportId']
    message.dataDate = new Date(this.reportForm.value['dataDate'])
    message.notes = this.reportForm.value['notes']
    message.fileName = this.fileToUpload.name

    formData.append('file', this.reportForm.value['file'])
    formData.append('message', JSON.stringify(message))

    this.passthrough
      .sendMessageOnToBus(
        message,
        'UploadElectorateReportSpreadsheet',
        formData
      )
      .subscribe(() => {
        this.snackbar.open('File sent for processing successfully.', null)
      })
  }

  ngOnDestroy(): void {
    this.reportsSubscription$.unsubscribe()
  }
}
