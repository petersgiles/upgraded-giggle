import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { environment } from '../environments/environment'
import { CommitmentDataService } from './services/commitment-data.service'
import { Subscription } from 'rxjs'
import { MdcDialog, MdcDialogRef } from '@angular-mdc/web';
import { DialogSpinnerOverlayComponent } from '@digital-first/df-dialogs';

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService implements OnInit, OnDestroy {

  get version(): string {
    return environment.version
  }

  get title(): string {
    return 'Election Commitments'
  }

  constructor(private service: CommitmentDataService, public dialog: MdcDialog) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }

}