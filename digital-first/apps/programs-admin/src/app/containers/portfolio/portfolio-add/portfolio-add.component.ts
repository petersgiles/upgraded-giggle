import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { formConstants } from '../../../form-constants'
import { Router } from '@angular/router'
import { CreatePortfolioGQL } from '../../../generated/graphql'

@Component({
  selector: 'digital-first',
  templateUrl: './portfolio-add.component.html',
  styleUrls: ['./portfolio-add.component.scss']
})
export class PortfolioAddComponent implements OnInit {
  addPortfolioForm = this.formBuilder.group({
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
    private router: Router,
    private createPortfolioGQL: CreatePortfolioGQL
  ) {}
  onSubmit() {
    this.createPortfolioGQL
      .mutate(
        {
          data: {
            title: this.addPortfolioForm.value['portfolioTitle'],
            metadata: this.addPortfolioForm.value['metadata']
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['portfolios', data.createPortfolio.id])
      )
  }
  cancel() {
    return this.router.navigate(['portfolios'])
  }
  ngOnInit() {}
}
