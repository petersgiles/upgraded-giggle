import { Component, OnInit, OnDestroy } from '@angular/core'
import { GetCommitmentDetailGQL } from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'

interface ICommitment {
  id: number
  title: string
  description: string
  bookType: string
  cost: string
  date: string
  politicalParty: string
  announcedBy: string
  announcementType?: string
  criticalDate?: string
  portfolio?: string
}
@Component({
  selector: 'digital-first-commitment-detail',
  templateUrl: './commitment-detail.component.html',
  styleUrls: ['./commitment-detail.component.scss']
})
export class CommitmentDetailComponent implements OnInit, OnDestroy {
  commitmentSubscription$: Subscription
  public commitment: ICommitment
  constructor(
    private getCommitmentDetailGQL: GetCommitmentDetailGQL,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let id: string = this.route.snapshot.paramMap.get('id')
    // override for setup
    id = '15'
    this.loadCommitment(id)
  }

  loadCommitment(id: string) {
    this.commitmentSubscription$ = this.getCommitmentDetailGQL
      .watch({ id: id }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.commitments))
      .subscribe(dbItem => {
        const commitment: ICommitment = {
          id: dbItem[0].id,
          title: dbItem[0].title,
          description: dbItem[0].description,
          bookType: dbItem[0].bookType,
          cost: dbItem[0].cost,
          date: dbItem[0].date,
          politicalParty: dbItem[0].politicalParty,
          announcedBy: dbItem[0].announcedBy,
          announcementType: dbItem[0].announcementType
            ? dbItem[0].announcementType.title
            : '',
          criticalDate: dbItem[0].criticalDate
            ? dbItem[0].criticalDate.title
            : '',
          portfolio: dbItem[0].portfolioLookup
            ? dbItem[0].portfolioLookup.title
            : ''
        }
      })
  }

  ngOnDestroy(): void {
    this.commitmentSubscription$.unsubscribe()
  }
}
