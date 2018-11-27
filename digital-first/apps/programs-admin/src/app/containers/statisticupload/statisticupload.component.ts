import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AllStatistics, AllStatisticsGQL} from "../../generated/graphql";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UUID} from "@digital-first/df-utils";
import {map} from "rxjs/operators";

@Component({
  selector: 'digital-first-statisticupload',
  templateUrl: './statisticupload.component.html',
  styleUrls: ['./statisticupload.component.scss']
})

export class StatisticuploadComponent implements OnInit {

  fileToUpload: File;
  model = new StatisticUploadFormModel();

  statistics: Observable<AllStatistics.Statistics[]>;

  statisticReports: Observable<AllStatistics.StatisticReports[]>;

  constructor(private allStatistics: AllStatisticsGQL, private http: HttpClient) {
  }

  static onSelect(statisticId) {

    console.log(`selected id from dropdown => ${statisticId}`);

    //TODO:  Filter the statistics observable and return it statistic reports as an observable?
  }

  ngOnInit() {

    //grab the list of statistics with their statistic report children
    this.statistics = this.allStatistics.watch().valueChanges.pipe(map(result => result.data.statistics));

    this.statistics.subscribe(value => console.log(value));
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {

      this.fileToUpload = fileList[0];

    }
  }

  onSubmit() {

    const httpOptions = {
      headers: new HttpHeaders({
        'MessageType': 'UploadElectorateStatisticSpreadsheet',
        'MessageNamespace': 'ProgramsManager.Messages',
        'MessageId': UUID.UUID()
      })
    };

    //set a unique name for the file as there is a unique constraint on the filename in the attachments table
    const fileExtension = this.fileToUpload.name.substr(this.fileToUpload.name.lastIndexOf('.') + 1);
    let fileName = `${UUID.UUID()}.${fileExtension}`;

    const formData = new FormData();
    formData.append('file', this.fileToUpload, fileName);

    formData.append('message', `{Notes: "${this.model.notes}", DataDate:"${this.model.dataDate}",FileName:"${fileName}"}`);

    this.http.post('https://localhost:52629/api/sendmessage', formData, httpOptions).subscribe(value => console.log('TODO: handle error.'));
  }
}

export class StatisticUploadFormModel {
  public id: number;
  public dataDate: Date;
  public notes: string;
  public statisticReportId: string;
}
