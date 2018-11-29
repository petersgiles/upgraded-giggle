import {Component, OnInit} from '@angular/core'
import {PassthroughService} from "../../services/passthrough.service";
import {UploadHomeAffairsElectorateReportSpreadsheet} from "@dsuite/programs-manager-messages";

@Component({
  selector: 'digital-first-homeaffairs',
  templateUrl: './homeaffairs.component.html',
  styleUrls: ['./homeaffairs.component.scss']
})
export class HomeaffairsComponent implements OnInit {

  fileToUpload: File;
  model = new FormModel();

  constructor(private passthrough: PassthroughService) {
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

    const formData = new FormData();

    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    const message = new UploadHomeAffairsElectorateReportSpreadsheet();
    message.dataDate = new Date(this.model.dataDate);
    message.fileName = this.fileToUpload.name;
    message.notes = this.model.notes;

    formData.append('message', JSON.stringify(message));

    this.passthrough.sendMessageOnToBus<UploadHomeAffairsElectorateReportSpreadsheet>(message, formData)
      .subscribe(value => console.log('TODO: handle error.'));
  }
}

export class FormModel {
  public id: number;
  public dataDate: Date;
  public notes: string;
}
