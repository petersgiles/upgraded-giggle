import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'
import { Back } from '../../reducers/router.actions'

@Component({
  selector: 'digital-first-commitment-layout',
  templateUrl: './commitment-layout.component.html',
  styleUrls: ['./commitment-layout.component.scss']
})
export class CommitmentLayoutComponent implements OnInit {

   links=  [
    { name: 'Commitment', icon: 'folder', route: 'home' },
    { name: 'Packages', icon: 'folder', route: 'packages' },
    { name: 'Location', icon: 'folder', route: 'location' }
  ]

  constructor(private router: Router, private store: Store<any>) { }

  ngOnInit() {
  }

  getTitle(commitment) {
    return 'Commitment'
  }

  handleGoBack($event) {
    this.store.dispatch(new Back());
  }

  handleCommitmentNavigation(link){
   // this.router.navigate(['commitment', 'commitmentDetail', '1', link.route])
   if(link.name === 'Packages')
   this.router.navigate(['commitment',106, 'packages'])
 // else
    //this.router.navigate(['commitment', 'commitmentDetail'])
  }
}
