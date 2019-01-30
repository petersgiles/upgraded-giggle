import {Component, OnDestroy} from '@angular/core'
import {AllProjectsSearch, AllProjectsSearchGQL} from '../../generated/graphql'
import {Subscription} from 'rxjs'
import {Router} from '@angular/router'
@Component({
  selector: 'digital-first-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnDestroy {

  projects:  AllProjectsSearch.Projects[]
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(private searchProjectsGQL: AllProjectsSearchGQL,
              private router: Router) {
  }

  add() {
    return this.router.navigate(['Projects', 'add'])
  }

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.searchProjectsGQL
      .watch({name: this.searchText}, {fetchPolicy: 'no-cache'})
      .valueChanges.subscribe(value => {
        this.projects = value.data.projects
      })

    this.subscriptions$ = [...this.subscriptions$, searchSubscription$]
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe()
      }
    }
  }
}
