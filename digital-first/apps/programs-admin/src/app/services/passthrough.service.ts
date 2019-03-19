import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { UUID } from '@df/utils'

@Injectable({
  providedIn: 'root'
})
export class PassthroughService {
  constructor(private http: HttpClient) {}

  sendMessageOnToBus(
    message,
    messageTypeName: string,
    formData: FormData
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // Notes: couldn't use message.constructor.name because of the AOT build, had to pass the name as a sting
        MessageType: messageTypeName,
        MessageNamespace: 'ProgramsManager.Messages',
        MessageId: UUID.UUID()
      })
    }

    return this.http.post(
      environment.datasource.passthroughUrl,
      formData,
      httpOptions
    )
  }
}
