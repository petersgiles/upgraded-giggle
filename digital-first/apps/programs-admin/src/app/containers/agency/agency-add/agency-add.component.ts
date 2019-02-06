import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import {
  AllPortfoliosGQL,
  CreateAgencyGQL,
  AllPortfolios
} from '../../../generated/graphql'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs'
import {formConstants} from '../../../form-constants'

@Component({
  selector: 'digital-first-agency-add',
  templateUrl: './agency-add.component.html',
  styleUrls: ['./agency-add.component.scss']
})
export class AgencyAddComponent implements OnInit {
  portfolios$: Observable<AllPortfolios.Portfolios[]>
  addAgencyForm = this.formBuilder.group({
    agencyName: [null, [Validators.required, , Validators.maxLength(formConstants.nameMaxLength)]],
    metadata: [null],
    portfolioId: [null, Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
              private allPortfoliosGQL: AllPortfoliosGQL,
              private createAgencyGQL: CreateAgencyGQL,
              private router: Router
              ) {}
  ngOnInit() {
    this.portfolios$ = this.allPortfoliosGQL
      .fetch({}, { fetchPolicy: 'network-only' })
      .pipe(map(result => result.data.portfolios))

    }

    onSubmit() {
      this.createAgencyGQL.mutate({
        data: {
          title: this.addAgencyForm.value['agencyName'],
          metadata: this.addAgencyForm.value['metadata'],
          portfolioId: this.addAgencyForm.value['portfolioId'],
        }
      }, {}).subscribe(({data}) =>
        this.router.navigate(['agencies', data.createAgency.id]))
    }

}
