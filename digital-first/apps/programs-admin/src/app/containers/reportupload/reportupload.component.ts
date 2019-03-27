import { map } from 'rxjs/operators'
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import { Subscription } from 'rxjs'
import {
  AllProgramReportsGQL,
  AllProgramReportsQuery
} from '../../generated/graphql'
import {
  UploadElectorateReportSpreadsheet
} from '@dsuite/programs-manager-messages'
import { PassthroughService } from '../../services/passthrough.service'
import { MdcSnackbar } from '@angular-mdc/web'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'

type Reports = AllProgramReportsQuery['programs'][0]['reports']

@Component({
  selector: 'digital-first-reportupload',
  templateUrl: './reportupload.component.html',
  styleUrls: ['./reportupload.component.scss']
})
export class ReportuploadComponent implements OnInit, OnDestroy {
  fileToUpload: File
  programs: AllProgramReportsQuery['programs']
  reports: Reports
  reportsSubscription$: Subscription

  @ViewChild('inputElement')
  inputElement: ElementRef

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
      this.reportForm.patchValue({ reportId: undefined, notes: '' })
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

  onReportSelectionChange(event: { index: any; value: any }) {
    if (event.index > 0) {
      this.getReportVersionNotes(event.value)
    }
  }

  getReportVersionNotes(reportId: string) {
    let report: any
    this.programs.filter(progs =>
      progs.reports
        .filter(pReports => pReports.id === reportId)
        .map(pReport => (report = pReport))
    )

    if (report.latestVersion) {
      this.reportForm.patchValue({
        notes: report.latestVersion.notes
      })
    }
  }

  fileChange(event) {
    const fileList: FileList = event.target.files

    if (fileList.length === 1) {
      this.fileToUpload = fileList[0]
      const reader = new FileReader()

      if (event.target.files && event.target.files.length) {
        reader.readAsDataURL(this.fileToUpload)

        reader.onload = () => {
          this.reportForm.patchValue({ file: this.fileToUpload })
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

    formData.append('file', this.reportForm.value['file'], 'default')
    formData.append('message', JSON.stringify(message))

    this.passthrough
      .sendMessageOnToBus(
        message,
        'UploadElectorateReportSpreadsheet',
        formData
      )
      .subscribe(() => {
        this.snackbar.open('File sent for processing successfully.', null)
        this.fileToUpload = null

        this.reportForm.reset()
        this.inputElement.nativeElement.value = ''
        this.reportForm.get('programId').setValue(' ')
        this.reportForm.get('reportId').setValue(' ')
        this.reportForm.get('dataDate').setValue(' ')
      })
  }

  ngOnDestroy(): void {
    this.reportsSubscription$.unsubscribe()
  }
}
