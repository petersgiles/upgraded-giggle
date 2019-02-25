import { map } from 'rxjs/operators'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AllStatistics, AllStatisticsGQL } from '../../generated/graphql'
import { PassthroughService } from '../../services/passthrough.service'
import { UploadElectorateStatisticSpreadsheet } from '@dsuite/programs-manager-messages'
import { MdcSnackbar } from '@angular-mdc/web'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'

@Component({
  selector: 'digital-first-statisticupload',
  templateUrl: './statisticupload.component.html',
  styleUrls: ['./statisticupload.component.scss']
})
export class StatisticuploadComponent implements OnInit, OnDestroy {
  fileToUpload: File
  statistics: AllStatistics.Statistics[]
  statisticReports: AllStatistics.StatisticReports[]
  statisticsSubscription$: Subscription
  notes: string

  statisticForm = this.formBuilder.group({
    statisticId: [undefined, Validators.required],
    statisticReportId: [undefined, Validators.required],
    notes: [''],
    dataDate: ['', Validators.required],
    file: [null, Validators.required],
    filename: ['']
  })

  constructor(
    private allStatistics: AllStatisticsGQL,
    private passthrough: PassthroughService,
    private formBuilder: FormBuilder,
    private snackbar: MdcSnackbar
  ) {}

  get diagnostic() {
    return `status: ${JSON.stringify(
      this.statisticForm.status
    )},  value: ${JSON.stringify(this.statisticForm.value)}`
  }

  onSelectionChange(event: { index: any; value: any }) {
    if (event.index > -1) {
      if (event.index === 0) {
        this.statisticReports = null
      } else {
        this.statisticReports = this.statistics.filter(
          value => value.id === event.value
        )[0].statisticReports
      }
      this.statisticForm.patchValue({ statisticReportId: undefined, notes: '' })
    }
  }

  onReportSelectionChange(event: { index: any; value: any }) {
    let notes = ''
    if (event.index > 0) {
      const latestVersion = this.statistics.filter(
        value => value.statisticReports[0].id === event.value
      )[0].statisticReports[0].latestVersion

      if (latestVersion) {
        notes = latestVersion.notes
      }
      this.statisticForm.patchValue({
        notes: notes
      })
    }
  }

  ngOnInit() {
    this.statisticsSubscription$ = this.allStatistics
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(result => result.data.statistics))
      .subscribe(value => {
        this.statistics = value
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
          this.statisticForm.patchValue({ file: this.fileToUpload })
        }
      }
    }
  }

  onSubmit() {
    const formData = new FormData()

    const message = new UploadElectorateStatisticSpreadsheet()

    message.statisticReportId = this.statisticForm.value['statisticReportId']
    message.dataDate = new Date(this.statisticForm.value['dataDate'])
    message.notes = this.statisticForm.value['notes']
    message.fileName = this.fileToUpload.name
    formData.append('file', this.statisticForm.value['file'], 'default')
    formData.append('message', JSON.stringify(message))

    this.passthrough
      .sendMessageOnToBus(
        message,
        'UploadElectorateStatisticSpreadsheet',
        formData
      )
      .subscribe(() => {
        this.snackbar.open('File sent for processing successfully.', null)
      })
  }

  ngOnDestroy(): void {
    this.statisticsSubscription$.unsubscribe()
  }
}
