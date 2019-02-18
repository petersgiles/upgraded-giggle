import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import {
  AllGroupsGQL,
  CreateAgencyMappingGQL,
  AllGroups
} from '../../../generated/graphql'
import { Router, ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-agency-mapping-add',
  templateUrl: './agency-mapping-add.component.html',
  styleUrls: ['./agency-mapping-add.component.scss']
})
export class AgencyMappingAddComponent implements OnInit {
  groups$: Observable<AllGroups.Groups[]>
  agencyId: any

  addAgencyMappingForm = this.formBuilder.group({
    emailDomain: [null, Validators.required],
    groupId: [null, Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private allGroupsGQL: AllGroupsGQL,
    private createAgencyMappingGQL: CreateAgencyMappingGQL,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.agencyId = this.route.snapshot.paramMap.get('agencyId')
    this.groups$ = this.allGroupsGQL
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(map(result => result.data.groups))
  }

  onSubmit() {
    this.createAgencyMappingGQL
      .mutate(
        {
          data: {
            emailDomain: this.addAgencyMappingForm.value['emailDomain'],
            accessControlGroupId: this.addAgencyMappingForm.value['groupId'],
            agencyId: this.agencyId
          }
        },
        {}
      )
      .subscribe(() => this.router.navigate(['agencies', this.agencyId]))
  }

  cancel(): void {
    this.router.navigate(['agencies'])
  }
}
