import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from "../../../../environments/environment";

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse) {

    //TODO:  do we inject a notification service in here like a toaster or something
    const router = this.injector.get(Router);
    const ngZone = this.injector.get(NgZone);

    if(environment.production){
      if (error instanceof HttpErrorResponse) {

        //TODO: check with angular for if this zone issue has been fixed.  couldn't call router.navigate without wrapping
        //in ngZone.run

        //TODO: do we notify via a service or just redirect like this?

        //This may loop if the token expires?  may have to do a different redirect here?

        ngZone.run(() => router.navigate(['/error'], {queryParams: {error: error.message}})).then();
      } else {

        //TODO: can we log to SEQ here so that we know about client errors?

        // Client Error Happened
        ngZone.run(() => router.navigate(['/error'], {queryParams: {error: error.message}})).then();
      }
    }
    // Log the error
    console.error(error);
  }
}
