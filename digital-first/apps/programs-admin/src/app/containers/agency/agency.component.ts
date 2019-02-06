import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent} from '@digital-first/df-dialogs'
import {map, first } from 'rxjs/operators'
import {Subscription} from 'rxjs'
import { AgencyGQL, Agency, DeleteAgencyGQL } from '../../generated/graphql'
import {MdcDialog} from '@angular-mdc/web'

@Component({
  selector: 'digital-first-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit, OnDestroy {

  agencyId: any
  agency: Agency.Agency
  agencySubscription$: Subscription

  constructor(private route: ActivatedRoute, private agencyGQL: AgencyGQL,  private deleteAgencyGQL: DeleteAgencyGQL, public dialog: MdcDialog, private router: Router) { }

 ngOnInit() {
    this.agencyId = this.route.snapshot.paramMap.get('id')
    this.agencySubscription$ = this.agencyGQL
    .watch({id: this.agencyId}, {fetchPolicy: 'network-only'})
    .valueChanges.pipe(map(value => value.data.agency))
    .subscribe(agency => {
      this.agency = agency
    })
  }

  handleEditAgency(agency: Agency.Agency) {
    return this.router.navigate(['agencies/edit', agency.id])
  }

  handleDeleteAgency(agency: Agency.Agency) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.agency) {
          this.deleteAgencyGQL
            .mutate(
              {
                data: {
                  id: agency.id
                }
              },
              {}
            )
            .subscribe(value => this.router.navigate(['agencies']))
        }
      })
  }

  ngOnDestroy(): void {
    this.agencySubscription$.unsubscribe()
  }
}
