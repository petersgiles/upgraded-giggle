import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AllStatistics, AllStatisticsGQL} from "../../generated/graphql";
import {map} from "rxjs/operators";
import {PassthroughService} from "../../services/passthrough.service";
import {UploadElectorateStatisticSpreadsheet} from "@dsuite/programs-manager-messages";
import {MdcSnackbar} from '@angular-mdc/web'

@Component({
  selector: 'digital-first-statisticupload',
  templateUrl: './statisticupload.component.html',
  styleUrls: ['./statisticupload.component.scss']
})

export class StatisticuploadComponent implements OnInit, OnDestroy {

  fileToUpload: File;
  model: StatisticUploadFormModel;
  statistics: AllStatistics.Statistics[];
  statisticReports: AllStatistics.StatisticReports[];
  statisticsSub: Subscription;

  constructor(private allStatistics: AllStatisticsGQL,
              private passthrough: PassthroughService,
              private snackbar: MdcSnackbar) {
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  onSelectionChange(event: { index: any, value: any }) {

    if (event.index > -1) {
      // this.model.statisticId = event.value;

      this.model.statisticReportId = null;

      this.statisticReports = this.statistics.filter(value => value.id == event.value)[0].statisticReports;

    }
    else {
      // this.model.statisticId = null;
    }

  }

  ngOnInit() {

    this.model = new StatisticUploadFormModel();

    this.statisticsSub = this.allStatistics.watch().valueChanges
      .pipe(map(result => result.data.statistics)).subscribe(value => {
        this.statistics = value;
      });

  }

  fileChange(event) {

    let fileList: FileList = event.target.files;

    if (fileList.length == 1) {

      this.fileToUpload = fileList[0];
    }
  }

  //send message and attachment onto the bus
  onSubmit() {

    const formData = new FormData();

    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    const message = new UploadElectorateStatisticSpreadsheet();

    message.statisticReportId = this.model.statisticReportId;
    message.dataDate = new Date(this.model.dataDate);
    message.fileName = this.fileToUpload.name;
    message.notes = this.model.notes;

    formData.append('message', JSON.stringify(message));

    this.passthrough
      .sendMessageOnToBus<UploadElectorateStatisticSpreadsheet>(message, formData)
      .subscribe(value => {
          this.snackbar.show('File uploaded successfully.', null, {align: 'center'});
        }
        , error => {
          this.snackbar.show(`File uploaded failed. ${error}`, null, {align: 'center'});
        });
  }

  ngOnDestroy(): void {

    this.statisticsSub.unsubscribe();
  }
}

class StatisticUploadFormModel {
  public id: number;
  public dataDate: Date;
  public notes: string;
  public statisticReportId: string;
  public statisticId: string;
}
