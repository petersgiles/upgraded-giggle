import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UUID} from "@digital-first/df-utils";
import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'digital-first-homeaffairs',
  templateUrl: './homeaffairs.component.html',
  styleUrls: ['./homeaffairs.component.scss']
})
export class HomeaffairsComponent implements OnInit {

  fileToUpload: File;
  model = new FormModel();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length == 1) {

      this.fileToUpload = fileList[0];

    }
  }

  onSubmit() {

    const httpOptions = {
      headers: new HttpHeaders({
        'MessageType': 'UploadHomeAffairsElectorateReportSpreadsheet',
        'MessageNamespace': 'ProgramsManager.Messages',
        'MessageId': UUID.UUID()
      })
    };

    const formData = new FormData();
    //set a unique name for the file as there is a unique constraint on the filename in the attachments table
    const fileExtension = this.fileToUpload.name.substr(this.fileToUpload.name.lastIndexOf('.') + 1);
    let fileName = `${UUID.UUID()}.${fileExtension}`;

    //TODO: currently a 50 character limit on the name in nservicebus attachments so can't really suffix filename with a GUID to make it neat.  Check with Simon
    //to see if he will extend the character limit in the passthrough table.
    // let fileName = `${file.name}-${UUID.UUID()}.${fileExtension}`;

    formData.append('file', this.fileToUpload, fileName);

    //TODO:  pull in the npm package for the typescript version of the DFC message library and use strong typing
    formData.append('message', `{Notes: "${this.model.notes}", DataDate:"${this.model.dataDate}",FileName:"${fileName}"}`);

    //TODO:  hand error here also need to decide what to do after submit?  toast?  navigate home? clear form?  do we try and subscribe to bus events to notify user of outcome?

    //TODO:  set this url in the settings and make a passthrough service and inject it instead of the httpclient
    this.http.post('https://localhost:52629/api/sendmessage', formData, httpOptions).subscribe(value => console.log('TODO: handle error.'));
  }
}

export class FormModel {
  public id: number;
  public dataDate: Date;
  public notes: string;
  public statisticId: string;
}
