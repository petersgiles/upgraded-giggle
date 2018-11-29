import {Component} from '@angular/core'
import {PassthroughService} from "../../services/passthrough.service";
import {UploadHomeAffairsElectorateReportSpreadsheet} from "@dsuite/programs-manager-messages";
import {MdcSnackbar} from "@angular-mdc/web";

@Component({
  selector: 'digital-first-homeaffairs',
  templateUrl: './homeaffairs.component.html',
  styleUrls: ['./homeaffairs.component.scss']
})
export class HomeaffairsComponent {

  fileToUpload: File;
  model = new FormModel();

  constructor(private passthrough: PassthroughService, private snackbar: MdcSnackbar) {
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

    //TODO: how does DFC framework want to handle errors?
    this.passthrough.sendMessageOnToBus<UploadHomeAffairsElectorateReportSpreadsheet>(message, formData)
      .subscribe(value => {
        this.snackbar.show('File uploaded successfully.', null, {align: 'center'})
      });
  }
}

class FormModel {
  public id: number;
  public dataDate: Date;
  public notes: string;
}
