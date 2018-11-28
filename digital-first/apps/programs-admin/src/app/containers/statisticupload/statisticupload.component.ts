import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AllStatistics, AllStatisticsGQL} from "../../generated/graphql";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {PassthroughService} from "../../services/passthrough.service";

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

  constructor(private allStatistics: AllStatisticsGQL, private http: HttpClient, private passthrough: PassthroughService) {
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

    formData.append('message', `{Notes: "${this.model.notes}", DataDate:"${this.model.dataDate}",FileName:"${this.fileToUpload.name}", StatisticReportId:"${this.model.statisticReportId}"}`);

    this.passthrough.sendMessageOnToBus(formData, 'UploadElectorateStatisticSpreadsheet').subscribe(value => console.log('TODO: handle error.'));
  }
}

export class StatisticUploadFormModel {
  public id: number;
  public dataDate: Date;
  public notes: string;
  public statisticReportId: string;
}
