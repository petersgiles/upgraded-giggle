import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {UUID} from "@digital-first/df-utils";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PassthroughService {

  constructor(private http: HttpClient) {
  }

  sendMessageOnToBus<T>(message: T, formData: FormData): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'MessageType': message.constructor.name,
        'MessageNamespace': 'ProgramsManager.Messages',
        'MessageId': UUID.UUID()
      })
    };

    return this.http.post(environment.datasource.passthroughUrl, formData, httpOptions).pipe(catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse) {

    let errorMessage: string = "Unable to perform the action.";

    if (error.error instanceof ErrorEvent) {

      errorMessage = `${errorMessage} Error:'${error.error.message}'`;

      console.error(errorMessage);

    } else {

      errorMessage = `${errorMessage} Error:'${error.status}: ${error.message}'.`;

      console.log(errorMessage)

    }

    return throwError(errorMessage);
  };
}
