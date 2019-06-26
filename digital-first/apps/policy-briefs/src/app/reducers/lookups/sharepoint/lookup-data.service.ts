import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { LookupDataService } from '../lookup-data.service'
import { LookupMapperService } from '../../../services/mappers/lookup-mapper.service';
import { SharepointJsomService } from '@df/sharepoint';

@Injectable({
  providedIn: 'root'
})
export class LookupDataSharepointService implements LookupDataService {
  fakeLookupBackend: Subject<any[]> = new Subject()
  fakeLookupBackendSubscription$: Subscription
 
  constructor(private harepointJsomService: SharepointJsomService) {}
}
