import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import {
  AllGroupsGQL,
  UpdateAgencyMappingGQL,
  GetAgencyMappingGQL,
  AllGroups
} from '../../../generated/graphql'
import { Router, ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs'
import {formConstants} from '../../../form-constants'

@Component({
  selector: 'digital-first-agency-mapping-add',
  templateUrl: './agency-mapping-edit.component.html',
  styleUrls: ['./agency-mapping-edit.component.scss']
})
export class AgencyMappingEditComponent implements OnInit {
  groups$: Observable<AllGroups.Groups[]>
  agencyId: any
  agencyMappingId: any
  agencyMappingSubscription$: Subscription
  rowVersion: any
  editAgencyMappingForm = this.formBuilder.group({
    emailDomain: [null, Validators.required],
    groupId: [null, Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
              private allGroupsGQL: AllGroupsGQL,
              private updateAgencyMappingGQL: UpdateAgencyMappingGQL,
              private agencyMappingGQL: GetAgencyMappingGQL,
              private router: Router,
              private route: ActivatedRoute
              ) {}
  ngOnInit() {

    this.agencyMappingId = this.route.snapshot.paramMap.get('agencyMappingId')
    this.groups$ = this.allGroupsGQL
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(map(result => result.data.groups))

      this.agencyMappingSubscription$ = this.agencyMappingGQL
      .fetch({ id: this.agencyMappingId }, { fetchPolicy: 'network-only' })
      .pipe(map(value => value.data.agencyMapping))
      .subscribe(agencyMapping => {
        this.editAgencyMappingForm.patchValue({
          emailDomain: agencyMapping.emailDomain,
          groupId: agencyMapping.accessControlGroup.id
        })
        this.agencyId = agencyMapping.agency.id
        this.rowVersion = agencyMapping.rowVersion
      })

           }

    onSubmit(): void  {
      this.updateAgencyMappingGQL.mutate({
        data: {
          id: this.agencyMappingId,
          rowVersion: this.rowVersion,
          emailDomain: this.editAgencyMappingForm.value['emailDomain'],
          accessControlGroupId: this.editAgencyMappingForm.value['groupId'],
          agencyId: this.agencyId
        }
      }, {}).subscribe(() =>
                      this.router.navigate(['agencies', this.agencyId])
                      )
    }

    cancel(): void {
      this.router.navigate(['agencies', this.agencyId])
    }

}
