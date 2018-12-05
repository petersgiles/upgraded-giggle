import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AllStatistics, AllStatisticsGQL} from "../../generated/graphql";
import {map} from "rxjs/operators";
import {PassthroughService} from "../../services/passthrough.service";
import {UploadElectorateStatisticSpreadsheet} from "@dsuite/programs-manager-messages";
import {MdcSnackbar} from '@angular-mdc/web'
import {FormBuilder} from '@angular/forms'
import {Validators} from '@angular/forms';

@Component({
  selector: 'digital-first-statisticupload',
  templateUrl: './statisticupload.component.html',
  styleUrls: ['./statisticupload.component.scss']
})

export class StatisticuploadComponent implements OnInit, OnDestroy {

  fileToUpload: File;
  statistics: AllStatistics.Statistics[];
  statisticReports: AllStatistics.StatisticReports[];
  statisticsSub$: Subscription;

  statisticForm = this.formBuilder.group({
    statisticId: [undefined, Validators.required],
    statisticReportId: [undefined, Validators.required],
    notes: [''],
    dataDate: ['', Validators.required],
    filename: [''],
    file: [null, Validators.required],
  });

  constructor(private allStatistics: AllStatisticsGQL,
              private passthrough: PassthroughService,
              private formBuilder: FormBuilder,
              private snackbar: MdcSnackbar) {
  }

  get diagnostic() {
    return `status: ${JSON.stringify(this.statisticForm.status)},  value: ${JSON.stringify(this.statisticForm.value)}`;
  }

  onSelectionChange(event: { index: any, value: any }) {

    if (event.index > -1) {

      if (event.index == 0) {
        this.statisticReports = null;
      }
      else {
        this.statisticReports = this.statistics.filter(value => value.id == event.value)[0].statisticReports;
      }
      this.statisticForm.patchValue({'statisticReportId': undefined});
    }
  }

  ngOnInit() {
    this.statisticsSub$ = this.allStatistics.watch().valueChanges
      .pipe(map(result => result.data.statistics)).subscribe(value => {
          this.statistics = value.sort((a, b) => {
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

      //TODO: revisit this to tidy it up
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {

        reader.readAsDataURL(this.fileToUpload);

        reader.onload = () => {

          this.statisticForm.patchValue(
            {filename: this.fileToUpload.name});
          this.statisticForm.patchValue({
            file: this.fileToUpload
          });
        };
      }
    }
  }

  //send message and attachment onto the bus
  onSubmit() {

    const formData = new FormData();

    const message = new UploadElectorateStatisticSpreadsheet();

    message.statisticReportId = this.statisticForm.value['statisticReportId'];
    message.fileName = this.statisticForm.value['filename'];
    message.dataDate = new Date(this.statisticForm.value['dataDate']);
    message.notes = this.statisticForm.value['notes'];

    formData.append('file', this.statisticForm.value['file'], message.fileName);
    formData.append('message', JSON.stringify(message));

    this.passthrough
      .sendMessageOnToBus<UploadElectorateStatisticSpreadsheet>(message, formData)
      .subscribe(value => {
          this.snackbar.show('File sent for processing successfully.', null, {align: 'center'});
        }
        , error => {
          this.snackbar.show(`File uploaded failed. ${error}`, null, {align: 'center'});
        });
  }

  ngOnDestroy(): void {

    this.statisticsSub$.unsubscribe();
  }
}
