import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from "ngx-file-drop";

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
    this.files = event.files;
    for (const droppedFile of event.files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {


          console.log(droppedFile.relativePath, file);


          //NB.  specifying multipart/form-data as content type resulted in boundary errors?  not setting it works.
          const httpOptions = {
            headers: new HttpHeaders({
              'MessageType': 'UploadHomeAffairsElectorateReportSpreadsheet',
              'MessageNamespace': 'ProgramsManager.Messages',
              'Referer': 'https://www.pmc.gov.au',
              'MessageId': 'C12E0B3E-D1A3-4E60-87E7-2495E714B0DF'
            })
          };

          const formData = new FormData();
          let fileName = Date.now() + '.xlsx';
          formData.append('file', file, fileName);

          formData.append('message', `{Notes: "wtf", DataDate:"1/1/2018",FileName:"${fileName}"}`);

          return this.http.post('https://localhost:52629/api/sendmessage', formData, httpOptions).subscribe(value => console.log(value));

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
}
