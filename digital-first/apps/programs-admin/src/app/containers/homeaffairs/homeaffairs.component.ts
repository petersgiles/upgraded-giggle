import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FileSystemFileEntry, UploadEvent, UploadFile} from "ngx-file-drop";
import {UUID} from "@digital-first/df-utils";

@Component({
  selector: 'digital-first-homeaffairs',
  templateUrl: './homeaffairs.component.html',
  styleUrls: ['./homeaffairs.component.css']
})
export class HomeaffairsComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    //TODO: blow up if more than one file is uploaded?

    this.files = event.files;

    for (const droppedFile of event.files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          console.log(droppedFile.relativePath, file);

          const httpOptions = {
            headers: new HttpHeaders({
              'MessageType': 'UploadHomeAffairsElectorateReportSpreadsheet',
              'MessageNamespace': 'ProgramsManager.Messages',
              'MessageId': UUID.UUID()
            })
          };

          const fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1);

          const formData = new FormData();
          let fileName = `${UUID.UUID()}.${fileExtension}`;

          //TODO: currently a 50 character limit on the name in nservicebus attachments
          // let fileName = `${file.name}-${UUID.UUID()}.${fileExtension}`;

          formData.append('file', file, fileName);

          formData.append('message', `{Notes: "wtf", DataDate:"1/1/2018",FileName:"${fileName}"}`);

          return this.http.post('https://localhost:52629/api/sendmessage', formData, httpOptions).subscribe(value => console.log(value));

        });
      } else {
        // It was a directory
        //TODO: blow up here because we don't want directories upload?
      }
    }
  }
}
