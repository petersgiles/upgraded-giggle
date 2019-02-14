import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import {
  AllPortfoliosGQL,
  UpdateAgencyGQL,
  Agency,
  GetAgencyGQL,
  AllPortfolios
} from '../../../generated/graphql'
import { ActivatedRoute, Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs'
import { formConstants } from '../../../form-constants'
@Component({
  selector: 'digital-first-agency-edit',
  templateUrl: './agency-edit.component.html',
  styleUrls: ['./agency-edit.component.scss']
})
export class AgencyEditComponent implements OnInit, OnDestroy {
  rowVersion: string
  agencyId: string
  portfolios$: Observable<AllPortfolios.Portfolios[]>
  agencySubscription$: Subscription
  agency: Agency.Agency
  editAgencyForm = this.formBuilder.group({
    agencyName: [
      null,
      [
        Validators.required,
        Validators.pattern(formConstants.emptyStringPattern),
        Validators.maxLength(formConstants.nameMaxLength)
      ]
    ],
    metadata: [null],
    portfolioId: [null, Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private allPortfoliosGQL: AllPortfoliosGQL,
    private agencyGQL: GetAgencyGQL,
    private updateAgencyGQL: UpdateAgencyGQL,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.agencyId = this.route.snapshot.paramMap.get('id')
    this.portfolios$ = this.allPortfoliosGQL
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(map(result => result.data.portfolios))

    this.agencySubscription$ = this.agencyGQL
      .fetch({ id: this.agencyId }, { fetchPolicy: 'network-only' })
      .pipe(map(value => value.data.agency))
      .subscribe(agency => {
        this.editAgencyForm.patchValue({
          agencyName: agency.title,
          metadata: agency.metadata,
          portfolioId: agency.portfolio.id
        })

        this.rowVersion = agency.rowVersion
      })
  }

  onSubmit() {
    this.updateAgencyGQL
      .mutate(
        {
          data: {
            portfolioId: this.editAgencyForm.value['portfolioId'],
            title: this.editAgencyForm.value['agencyName'],
            metadata: this.editAgencyForm.value['metadata'],
            rowVersion: this.rowVersion,
            id: this.agencyId
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['agencies', data.updateAgency.id])
      )
  }

  cancel() {
    return this.router.navigate(['agencies', this.agencyId])
  }

  ngOnDestroy(): void {
    this.agencySubscription$.unsubscribe()
  }
}
