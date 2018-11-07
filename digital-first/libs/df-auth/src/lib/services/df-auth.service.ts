import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class DfAuthService {

  abstract ApiPath: string
  abstract redirectMagic: Observable<{
      loggedIn,
      url
  }>

}

