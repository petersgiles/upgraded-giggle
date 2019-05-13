import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store'
import { Back, Go } from '../../reducers/router.actions'
import { Commitment } from '../../models'
import { CommitmentDetailsState } from '../../reducers/commitment-detail/commitment-detail.reducer'
//import { CommitmentDetail } from '../../reducers/commitment-detail'
import { getCommitment } from '../../reducers/commitment-detail'

@Component({
  selector: 'digital-first-commitment-layout',
  templateUrl: './commitment-layout.component.html',
  styleUrls: ['./commitment-layout.component.scss']
})
export class CommitmentLayoutComponent implements OnInit {

   links=  [
    { name: 'Commitment', icon: 'folder', route: 'detail' },
    { name: 'Packages', icon: 'folder', route: 'packages' },
    { name: 'Location', icon: 'folder', route: 'location' }
  ]
 commitment: Commitment
  constructor(private router: Router, private activateRoute: ActivatedRoute, private store: Store<CommitmentDetailsState>) { }

  ngOnInit() {
     this.store.pipe(select(getCommitment))
    .subscribe((commitment) => {
      this.commitment = commitment
    })
  }

  getTitle(commitment) {
    return 'Commitment'
  }

  handleGoBack($event) {
    this.store.dispatch(new Back())
  }

  handleCommitmentNavigation(link){
   /*  this.store.dispatch(new Go({
      path: ['commitment', this.commitment.id, link.route]
    }));  */

      this.router.navigate(['commitment', this.commitment.id, link.route], { relativeTo: this.activateRoute })
    
  }
}
