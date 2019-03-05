import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { formConstants } from '../../../form-constants'
import {
  GetPortfolioGQL,
  GetPortfolio,
  UpdatePortfolioGQL
} from '../../../generated/graphql'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
@Component({
  selector: 'digital-first-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.scss']
})
export class PortfolioEditComponent implements OnInit {
  rowVersion: string
  portfolioId: string
  portfolioSubscription$: Subscription
  portfolio: GetPortfolio.Portfolio
  editPortfolioForm = this.formBuilder.group({
    portfolioTitle: [
      null,
      [
        Validators.required,
        Validators.pattern(formConstants.emptyStringPattern),
        Validators.maxLength(formConstants.nameMaxLength)
      ]
    ],
    metadata: [null]
  })
  constructor(
    private formBuilder: FormBuilder,
    private portfolioGQL: GetPortfolioGQL,
    private route: ActivatedRoute,
    private updatePortfolioGQL: UpdatePortfolioGQL,
    private router: Router
  ) {}

  ngOnInit() {
    this.portfolioId = this.route.snapshot.paramMap.get('id')

    this.portfolioSubscription$ = this.portfolioGQL
      .fetch({ id: this.portfolioId }, { fetchPolicy: 'network-only' })
      .pipe(map(value => value.data.portfolio))
      .subscribe(portfolio => {
        this.editPortfolioForm.patchValue({
          portfolioTitle: portfolio.title,
          metadata: portfolio.metadata,
          portfolioId: portfolio.id
        })

        this.rowVersion = portfolio.rowVersion
      })
  }

  onSubmit() {
    this.updatePortfolioGQL
      .mutate(
        {
          data: {
            id: this.portfolioId,
            title: this.editPortfolioForm.value['portfolioTitle'],
            metadata: this.editPortfolioForm.value['metadata'],
            rowVersion: this.rowVersion
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['portfolios', this.portfolioId])
      )
  }

  cancel() {
    this.router.navigate(['portfolios', this.portfolioId])
  }
}
