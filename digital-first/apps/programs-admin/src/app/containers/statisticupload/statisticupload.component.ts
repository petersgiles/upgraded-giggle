import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
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

export class StatisticuploadComponent implements OnInit {

  fileToUpload: File;
  model = new StatisticUploadFormModel();

  statistics: Observable<AllStatistics.Statistics[]>;

  statisticReports: AllStatistics.StatisticReports[];

  constructor(private allStatistics: AllStatisticsGQL, private passthrough: PassthroughService, private snackbar: MdcSnackbar) {
  }

  onSelect(statisticId) {

    this.statistics
      .subscribe(statistics => {
        this.statisticReports = statistics.filter(statistic => statistic.id == statisticId)[0].statisticReports;
      });
  }

  ngOnInit() {

    this.statistics = this.allStatistics.watch().valueChanges.pipe(map(result => result.data.statistics));
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length == 1) {

      this.fileToUpload = fileList[0];
    }
  }

  onSubmit() {

    const formData = new FormData();

    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    const message = new UploadElectorateStatisticSpreadsheet();

    message.statisticReportId = this.model.statisticReportId;
    message.dataDate = new Date(this.model.dataDate);
    message.fileName = this.fileToUpload.name;
    message.notes = this.model.notes;

    formData.append('message', JSON.stringify(message));

    //TODO: how does DFC framework want to handle errors?
    this.passthrough.sendMessageOnToBus<UploadElectorateStatisticSpreadsheet>(message, formData)
      .subscribe(value => {

          this.snackbar.show('File uploaded successfully.', null, {align: 'center'});
        }
      );
  }
}

class StatisticUploadFormModel {
  public id: number;
  public dataDate: Date;
  public notes: string;
  public statisticReportId: string;
}
