import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import {AllProgramsGQL, AllProgramsQuery} from '../../generated/graphql'
import { PassthroughService } from '../../services/passthrough.service'
import { UploadProjectElectorateReport } from '@dsuite/programs-manager-messages'
import { MdcSnackbar } from '@angular-mdc/web'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { map } from 'rxjs/operators'
import { ViewChild } from '@angular/core'

@Component({
  selector: 'digital-first-projectupload',
  templateUrl: './projectupload.component.html',
  styleUrls: ['./projectupload.component.scss']
})
export class ProjectuploadComponent implements OnInit, OnDestroy {
  fileToUpload: File
  programs: AllProgramsQuery['programs']

  programsSubscription$: Subscription

  @ViewChild('inputElement')
  inputElement: ElementRef

  projectForm = this.formBuilder.group({
    programId: [undefined, Validators.required],
    file: [null, Validators.required]
  })

  constructor(
    private allPrograms: AllProgramsGQL,
    private passthrough: PassthroughService,
    private formBuilder: FormBuilder,
    private snackbar: MdcSnackbar
  ) {}

  get diagnostic() {
    return `status: ${JSON.stringify(
      this.projectForm.status
    )},  value: ${JSON.stringify(this.projectForm.value)}`
  }

  ngOnInit() {
    this.programsSubscription$ = this.allPrograms
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
          this.projectForm.patchValue({ file: this.fileToUpload })
        }
      }
    }
  }

  // send message and attachment onto the bus
  onSubmit() {
    const message = new UploadProjectElectorateReport()

    message.programId = this.projectForm.value['programId']
    message.fileName = this.fileToUpload.name

    const formData = new FormData()
    formData.append('file', this.projectForm.value['file'], 'default')

    formData.append('message', JSON.stringify(message))

    this.passthrough
      .sendMessageOnToBus(message, 'UploadProjectElectorateReport', formData)
      .subscribe(value => {
        this.snackbar.open('File sent for processing successfully.', null)

        this.fileToUpload = null

        this.projectForm.reset()
        this.inputElement.nativeElement.value = ''
        this.projectForm.get('programId').setValue(' ')
      })
  }

  ngOnDestroy(): void {
    this.programsSubscription$.unsubscribe()
  }
}
