import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UUID} from "@digital-first/df-utils";

@Injectable({
  providedIn: 'root'
})
export class PassthroughService {

  constructor(private http: HttpClient) {
  }

  sendMessageOnToBus(formData: FormData, messageType: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'MessageType': messageType,
        'MessageNamespace': 'ProgramsManager.Messages',
        'MessageId': UUID.UUID()
      })
    };

    return this.http.post(environment.datasource.passthroughUrl, formData, httpOptions);
  }
}
