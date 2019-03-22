import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import {
  AllGroupsGQL, AllGroupsQuery,
  CreateAgencyMappingGQL
} from '../../../generated/graphql'
import { Router, ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

export const domainRegex =
  '\\b((?=[a-z0-9-]{1,63}\\.)[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,63}\\b'

@Component({
  selector: 'digital-first-agency-mapping-add',
  templateUrl: './agency-mapping-add.component.html',
  styleUrls: ['./agency-mapping-add.component.scss']
})
export class AgencyMappingAddComponent implements OnInit {
  groups$: Observable<AllGroupsQuery['groups']>
  agencyId: any

  addAgencyMappingForm = this.formBuilder.group({
    emailDomain: [
      null,
      [
        Validators.required,
        Validators.pattern(domainRegex),
        Validators.maxLength(255)
      ]
    ],
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

  cancel() {
    return this.router.navigate(['agencies', this.agencyId])
  }
}
