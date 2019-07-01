import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { LookupDataService } from '../lookup-data.service'
import { LookupMapperService } from '../../../services/mappers/lookup-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class LookupDataLocalService implements LookupDataService {
  fakeLookupBackend: Subject<any[]> = new Subject()
  fakeLookupBackendSubscription$: Subscription
 
  constructor() {}
}
