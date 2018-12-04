import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AllPrograms, AllProgramsGQL} from "../../generated/graphql";
import {map} from "rxjs/operators";
import {PassthroughService} from "../../services/passthrough.service";
import {UploadProjectElectorateReport} from "@dsuite/programs-manager-messages";
import {MdcSnackbar} from '@angular-mdc/web'
import {FormBuilder} from '@angular/forms'
import {Validators} from '@angular/forms';

@Component({
  selector: 'digital-first-projectupload',
  templateUrl: './projectupload.component.html',
  styleUrls: ['./projectupload.component.scss']
})

export class ProjectuploadComponent implements OnInit, OnDestroy {

  fileToUpload: File;
  programs: AllPrograms.Programs[];

  programsSubscription: Subscription;

  projectForm = this.formBuilder.group({
    programId: [undefined, Validators.required],
    file: [null, Validators.required],
    filename: ['']
  });

  constructor(private allPrograms: AllProgramsGQL,
              private passthrough: PassthroughService,
              private formBuilder: FormBuilder,
              private snackbar: MdcSnackbar) {
  }

  get diagnostic() {
    return JSON.stringify(this.projectForm.status) + JSON.stringify(this.projectForm.value);
  }

  ngOnInit() {
    this.programsSubscription = this.allPrograms.watch().valueChanges
      .pipe(map(result => result.data.programs)).subscribe(value => {

          this.programs = value.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
      );
  }

  fileChange(event) {

    let fileList: FileList = event.target.files;

    if (fileList.length == 1) {

      this.fileToUpload = fileList[0];

      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {

          this.projectForm.patchValue(
            {filename: this.fileToUpload.name});
          this.projectForm.patchValue({
            file: reader.result,
          });
        };
      }
    }
  }

  //send message and attachment onto the bus
  onSubmit() {

    const formData = new FormData();

    const message = new UploadProjectElectorateReport();

    message.programId = this.projectForm.value['programId'];
    message.fileName = this.projectForm.value['filename'];

    formData.append('file', this.projectForm.value['file'], message.fileName);
    formData.append('message', JSON.stringify(message));

    this.passthrough
      .sendMessageOnToBus<UploadProjectElectorateReport>(message, formData)
      .subscribe(value => {
          this.snackbar.show('File sent for processing successfully.', null, {align: 'center'});
        }
        , error => {
          this.snackbar.show(`File uploaded failed. ${error}`, null, {align: 'center'});
        });
  }

  ngOnDestroy(): void {

    this.programsSubscription.unsubscribe();
  }
}
