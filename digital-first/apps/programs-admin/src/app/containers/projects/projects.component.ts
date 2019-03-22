import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core'
import {
  AllProjectsSearchGQL, AllProjectsSearchQuery
} from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'
@Component({
  selector: 'digital-first-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnDestroy {
  projects: AllProjectsSearchQuery['projects']
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(
    private searchProjectsGQL: AllProjectsSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.searchProjectsGQL
      .watch(
        { name: this.searchText },
        {
          fetchPolicy: 'no-cache',
          context: { debounceKey: 'projects', debounceTimeout: 400 }
        }
      )
      .valueChanges.subscribe(value => {
        this.projects = value.data.projects
        this.changeDetector.detectChanges()
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
