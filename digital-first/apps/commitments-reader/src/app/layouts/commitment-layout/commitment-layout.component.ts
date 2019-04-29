import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'digital-first-commitment-layout',
  templateUrl: './commitment-layout.component.html',
  styleUrls: ['./commitment-layout.component.scss']
})
export class CommitmentLayoutComponent implements OnInit {

  public links:  [
    { name: 'Commitment', icon: 'folder', route: 'home' },
    { name: 'Packages', icon: 'folder', route: 'packages' },
    { name: 'Location', icon: 'folder', route: 'location' }
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }


  handleCommitmentNavigation(link){
    this.router.navigate(['/', 'components', '1', link.route])
  }
}
