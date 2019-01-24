import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {AllPrograms, AllProgramsGQL} from '../../generated/graphql'
import {PassthroughService} from '../../services/passthrough.service'
import {UploadProjectElectorateReport} from '@dsuite/programs-manager-messages'
import {MdcSnackbar} from '@angular-mdc/web'
import {FormBuilder} from '@angular/forms'
import {Validators} from '@angular/forms'
import {map} from 'rxjs/operators'

@Component({
  selector: 'digital-first-projectupload',
  templateUrl: './projectupload.component.html',
  styleUrls: ['./projectupload.component.scss']
})

export class ProjectuploadComponent implements OnInit, OnDestroy {

  fileToUpload: File
  programs: AllPrograms.Programs[]

  programsSubscription$: Subscription

  projectForm = this.formBuilder.group({
    programId: [undefined, Validators.required],
    file: [null, Validators.required],
    filename: ['']
  })

  constructor(private allPrograms: AllProgramsGQL,
              private passthrough: PassthroughService,
              private formBuilder: FormBuilder,
              private snackbar: MdcSnackbar) {
  }

  get diagnostic() {
    return `status: ${JSON.stringify(this.projectForm.status)},  value: ${JSON.stringify(this.projectForm.value)}`
  }

  ngOnInit() {
    this.programsSubscription$ = this.allPrograms
      .watch({}, {fetchPolicy: 'network-only'}).valueChanges
      .pipe(map(result => result.data.programs)).subscribe(value => {
          this.programs = value
        }
      )
  }

  fileChange(event) {

    const fileList: FileList = event.target.files

    if (fileList.length === 1) {

      this.fileToUpload = fileList[0]

      const reader = new FileReader()

      if (event.target.files && event.target.files.length) {

        reader.readAsDataURL(this.fileToUpload)

        reader.onload = () => {

          this.projectForm.patchValue({filename: this.fileToUpload.name})
          this.projectForm.patchValue({file: this.fileToUpload})
        }
      }
    }
  }

  // send message and attachment onto the bus
  onSubmit() {

    const message = new UploadProjectElectorateReport()

    message.programId = this.projectForm.value['programId']
    message.fileName = this.projectForm.value['filename']

    const formData = new FormData()
    formData.append('file', this.projectForm.value['file'], message.fileName)
    formData.append('message', JSON.stringify(message))

    this.passthrough.sendMessageOnToBus<UploadProjectElectorateReport>(message, formData)
      .subscribe(value => {
          this.snackbar.open('File sent for processing successfully.', null)
        }
      )
  }

  ngOnDestroy(): void {
    this.programsSubscription$.unsubscribe()
  }
}
