import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output
} from '@angular/core'
import {
  GetPortfolioDetailGQL,
  GetPortfolioDetail,
  DeletePortfolioGQL
} from '../../generated/graphql'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { map, first } from 'rxjs/operators'
import { MdcDialog } from '@angular-mdc/web'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'
import { formConstants } from '../../form-constants'
@Component({
  selector: 'digital-first-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  portfolio: GetPortfolioDetail.Portfolio
  portfolioId: string
  portfolioSubscription$: Subscription
  agencyLinkedToPortfolio: any
  defaultPageLength: number = formConstants.defaultPageLength
  columns = [{ prop: 'title', name: 'Agency Title' }]
  emptyTableMessage = {
    emptyMessage: 'No agencies linked to portfolio.',
    totalMessage: 'total'
  }

  @Output() onCellClicked: EventEmitter<any> = new EventEmitter()
  constructor(
    private getPortfolioDetailGQL: GetPortfolioDetailGQL,
    private deletePortfolio: DeletePortfolioGQL,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.portfolioId = this.route.snapshot.paramMap.get('id')

    this.portfolioSubscription$ = this.getPortfolioDetailGQL
      .watch({ id: this.portfolioId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.portfolio))
      .subscribe(portfolio => {
        this.portfolio = portfolio
        this.agencyLinkedToPortfolio = portfolio.agencies.map(data => ({
          id: data.id,
          title: data.title
        }))
      })
  }

  handleEditPortfolio(portfolio: GetPortfolioDetail.Portfolio) {
    return this.router.navigate(['portfolios/edit', portfolio.id], {
      skipLocationChange: true
    })
  }
  agencyDetail($event) {
    return this.router.navigate(['agencies/', $event.id])
  }

  handleDeletePortfolio(portfolio: GetPortfolioDetail.Portfolio) {
    if (
      this.agencyLinkedToPortfolio &&
      this.agencyLinkedToPortfolio.length === 0
    ) {
      const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
        escapeToClose: true,
        clickOutsideToClose: true
      })

      dialogRef
        .afterClosed()
        .pipe(first())
        .subscribe(result => {
          if (result === ARE_YOU_SURE_ACCEPT && this.portfolio) {
            this.deletePortfolio
              .mutate(
                {
                  data: {
                    id: portfolio.id
                  }
                },
                {}
              )
              .subscribe(value => this.router.navigate(['portfolios']))
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.portfolioSubscription$.unsubscribe()
  }
}
